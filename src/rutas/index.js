module.exports = (app, passport) => {
    app.get('/', (req, res) => {
        if (req.session.token) {
            res.cookie('token', req.session.token);
            res.json({
                status: 'session cookie set'
            });
            res.render("index")
        } else {
            res.redirect("/auth/google");
        }
    });
}