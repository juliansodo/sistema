module.exports = (app, passport) => {
    app.get('/', (req, res) => {
        if (req.session.token) {
            res.cookie('token', req.session.token);
            res.render("index")
        } else {
            res.redirect("/auth/google");
        }
    });
}