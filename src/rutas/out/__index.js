var express = require('express');
var router = express.Router();
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require("../../modelos/User")

passport.use(new GoogleStrategy({
    clientID: "94142523664-f14lp2nc4f8tcnkco6lpa7fp1jf4crho.apps.googleusercontent.com",
    clientSecret: "WGMrCjQxGcv9GdEfvvvpxm_r",
    callbackURL: "http://localhost:3000/api/out/auth/google/callback"
    /*callbackURL: "https://apilaboral.herokuapp.com/api/out/auth/google/callback"*/
},
     function (accessToken, refreshToken, profile, done) {
    /*   console.log("TOKEN::::::   " + accessToken)
        console.log(profile)
    */
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

router.get('/login', function (req, res) {
    res.send("<a href='/api/out/auth/google/callback'>Click para loguear</a>")
});

const estaLogueado = function(req,res,next)
{
   /* console.log("pepito")
    if(req.user)
    {
        next();
    }else
    {
        res.sendStatus("401");
    }*/
    if (req.isAuthenticated())
    return next();

// if they aren't redirect them to the home page
res.redirect('/');
}

router.get("/bien", estaLogueado, (req, res)=>
{
    res.send("Bienvenido");
})


router.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));


/*router.get( '/auth/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/api/out/auth/google/success',
        failureRedirect: '/api/out/auth/google/failure'
}));
*/
router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });
module.exports = router;