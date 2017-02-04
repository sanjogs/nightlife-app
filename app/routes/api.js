var https = require("https");

var apiRoutes = function(app) {
    app.get('/api/bars', function(req, res) {

        var options = {
            host: 'api.yelp.com',
            path: '/v2/search/?location=08053',
            headers: {
                'Authorization': 'OAuth oauth_consumer_key="ihrGPprYnFdOMwENKkZJyQ",oauth_token="dhxtiOv_-eVIpYfns6SCZ99Ghy4a0U9Z",oauth_signature_method="HMAC-SHA1",oauth_timestamp="1486169888",oauth_nonce="sNlpKKZarK2",oauth_version="1.0",oauth_signature="uM32PwvhPK9jLHJxU0NVj9FmiAc%3D"'
            }
        };

        var req = https.request(options, function(response) {
            var str = [];
            response.on('data', function(chunk) {
                str.push(chunk);
        });

            response.on('end', function() {
                res.json(str);
            });
        });
        req.end();
    });
}

module.exports = apiRoutes;