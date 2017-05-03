
var appRoutes = function(app,passport) {
    // app.get('/', function(req, res) {
    //     res.send("app is up");
    // });
    var path = require("path");


    app.route('/auth/twitter')
        .get(passport.authenticate('twitter'));
    app.route('/auth/twitter/callback')
        .get(passport.authenticate('twitter', {
            successRedirect: '/',
            failureRedirect: '/'
        }));
    app.route('/auth/logout')
		.get(function(req, res) {
			req.logout();
			res.redirect('/');
		});
    //redirect everything to angular client app
    app.get('*', function(req, res) {
        // res.sendFile('./public/views/index.html'); 
        res.sendFile(path.resolve('./public/views', 'index.html')); // load our public/index.html file

    });
}

module.exports = appRoutes;