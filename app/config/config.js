'use strict';

module.exports = {
        'yelp': {
            'consumerKey': process.env.YELP_CONSUMER_KEY,
            'consumerSecret': process.env.YELP_CONSUMER_SECRET,
            'tokenKey': process.env.YELP_TOKEN_KEY,
            'tokenSecret': process.env.YELP_TOKEN_SECRET
        },
        'twitterAuth':{
            'consumerKey':process.env.TWITTER_API_KEY,
            'consumerSecret':process.env.TWITTER_API_SECRET,
            'callbackURL':process.env.APP_URL + 'auth/twitter/callback'
        },
        'dbPath': process.env.DB_URL,
        'port': process.env.PORT
};