module.exports = (app, passport) => {
    app.get('/new', (req, res) => {
        if (req.session.token) {
            res.cookie('token', req.session.token);
            res.render("formulario")
        } else {
            res.redirect("/login")
        }
    });


}
