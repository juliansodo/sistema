
module.exports = (app, passport) => {
    const rutasIn = require("./in");
    rutasIn(app,passport);
    const http  = require("http")
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['https://www.googleapis.com/auth/userinfo.profile']
    }));
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            failureRedirect: '/login'
        }),
        (req, res) => {
            console.log(req.user.profile);
            req.session.token = req.user.token;
            req.session.user = req.user.profile;
            res.redirect('/');
        }
    );
    app.get('/logout', (req, res) => {
        app.post('https://accounts.google.com/o/oauth2/revoke?token='+req.session.token)
       // res.redirect('https://accounts.google.com/o/oauth2/revoke?token='+req.session.token)
        req.logout();
        req.session = null;
        res.redirect("/login");
        
    });
}
/*
passport.use(new GoogleStrategy({
    clientID: "94142523664-f14lp2nc4f8tcnkco6lpa7fp1jf4crho.apps.googleusercontent.com",
    clientSecret: "WGMrCjQxGcv9GdEfvvvpxm_r",
    callbackURL: "http://localhost:3000/auth/google/callback"
    /*callbackURL: "https://apilaboral.herokuapp.com/api/out/auth/google/callback"
},
     function (accessToken, refreshToken, profile, done) {

   console.log("refresh_TOKEN::::::   " + refreshToken)
        var existeUsuario =  User.findOne({
            where: {
                googleId: profile.id
            }
        })
        if (existeUsuario != null) {
             return User.update({ token: accessToken }, {
                where: {
                    googleId: profile.id
                }
            })
        }
        else {
            return User.create({googleId: profile.id, givenName: profile.name.givenName, familyName: profile.name.familyName, picture:profile.photos[0].value, token:accessToken });
        }
        
    }
));


*/

