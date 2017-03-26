'use strict';

var TwitterStrategy = require('passport-twitter').Strategy;
var User = require('../models/users');
var configAuth = require('./config');

module.exports = function (passport) {
	passport.serializeUser(function (user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function (id, done) {
		User.findById(id, function (err, user) {
			done(err, user);
		});
	});

	passport.use('twitter', new TwitterStrategy({
			consumerKey: configAuth.twitterAuth.consumerKey,
			consumerSecret: configAuth.twitterAuth.consumerSecret,
			callbackURL: configAuth.twitterAuth.callbackURL
		},
		function(token, tokenSecret, profile, done) {
			User.findOne({ 'twitter.id': profile.id }, function (err, user) {
				if (err) { return done(err); }

				if (user) {
					return done(null, user);
				} else {
					var newUser = new User();

					newUser.twitter.id = profile.id;
					newUser.twitter.username = profile.username;
					newUser.twitter.name = profile.displayName;

					newUser.save(function (err) {
						if (err) { return done(err); }

						return done(null, newUser);
					});
				}
			});
		}
	));
};
