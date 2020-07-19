module.exports = (app, passport) => {
    app.get('/', (req, res) => {
        if (req.session.token) {
            res.cookie('token', req.session.token);
            res.render("index", 
            {
                user: req.session.user
            });
        } else {
            res.redirect("/login")
        }
    });
    app.get('/form', (req, res) => {
        if (req.session.token) {
            res.cookie('token', req.session.token);
            res.render("formulario")
        } else {
            res.redirect("/login")
        }
    });
    app.get("/login", (req,res)=>
    {
        req.session = null;
        res.render("login")
    });
}