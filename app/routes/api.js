var request = require('request');
var OAuth = require('oauth-1.0a');
var crypto = require('crypto');
var config = require('../config/config');
var checkins = require('../models/checkins')
var apiRoutes = function(app) {
    app.get('/api/bars', function(req, res) {
        //if user is authenticated, save the searchterm
        if (req.isAuthenticated() && req.query.location) {
            req.user.lastSearch = req.query.location;
            req.user.save();
        }

        searchPlaces(req, function(error, data) {
            res.json({
                error: error,
                data: data
            });
        });
    });


    app.get('/api/users/login-info', function(req, res) {
        if (req.isAuthenticated()) {
            res.json(req.user);
        } else {
            res.status(401).send('No user logged in');
        }
    });

    function isLoggedIn(req,res, next)
    {
        if(req.isAuthenticated())
        {
            next();
        }
        else
        {
            res.status(401).send();
        }
    }

    app.route('/api/check-in/:businessId')
           .get(isLoggedIn,function(req,res){

        console.log(req.params.businessId);

    });

    function searchPlaces(req, callback) {
        var location=req.query.location;
        var oauth = OAuth({
            consumer: {
                key: config.yelp.consumerKey,
                secret: config.yelp.consumerSecret
            },
            signature_method: 'HMAC-SHA1',
            hash_function: function(base_string, key) {
                return crypto.createHmac('sha1', key).update(base_string).digest('base64');
            }
        });

        var token = {
            key: config.yelp.tokenKey,
            secret: config.yelp.tokenSecret
        };

        var request_data = {
            url: 'https://api.yelp.com/v2/search/?term=nightlife&location=' + location || '',
            method: 'GET'
        };
        
        request({
            url: request_data.url,
            method: request_data.method,
            headers: oauth.toHeader(oauth.authorize(request_data, token))
        }, function(error, response, body) {

            if (!error) {
                var yelpResponse = JSON.parse(body);
                if (yelpResponse.businesses) {
                    var businesses = [];

                    yelpResponse.businesses.forEach(function(business, idx) {

                        businesses.push({
                            id: business.id,
                            name: business.name,
                            url: business.url,
                            description: business.snippet_text,
                            image_url: business.image_url,
                            checkin_count: 0,
                            is_user_checkedin: false
                        });
                        checkins.count({
                            businessId: business.id
                        }, function(err,count) {

                            businesses[idx].checkin_count = count || 0;
                        });
                        if (req.isAuthenticated()) {
                            checkins.findOne({
                                businessId: business.id,
                                userID: req.user._id
                            }, function(err, u) {
                                if (!err && u) {
                                    businesses[idx].is_user_checkedin = true;

                                }
                            });
                        }

                    });



                    callback(null, businesses);

                } else if (yelpResponse.error) {

                    if (yelpResponse.error.id == 'UNAVAILABLE_FOR_LOCATION') {
                        callback("No information available for this location", null);
                    } else {
                        callback("Something Went Wrong", null);
                    }
                }
            } else {
                callback("Something Went Wrong", null);
            }
        });
    }
}

module.exports = apiRoutes;