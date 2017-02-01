var appRoutes = function(app) {
    app.get('/', function(req, res) {
        res.send("app is up");
    });
}

module.exports = appRoutes;