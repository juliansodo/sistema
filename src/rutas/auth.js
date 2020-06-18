var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require("../modelos/User")



module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
    passport.use(new GoogleStrategy({
        clientID: "94142523664-f14lp2nc4f8tcnkco6lpa7fp1jf4crho.apps.googleusercontent.com",
        clientSecret: "WGMrCjQxGcv9GdEfvvvpxm_r",
        callbackURL: "http://localhost:3000/auth/google/callback"
        },
        (accessToken, refreshToken, profile, done) => {

            var existeUsuario =  User.findOne({
                where: {
                    googleId: profile.id
                }
            }).then((usuario)=>
            {
                if (usuario) {
                    console.log("existe")
                    usuario.update({
                        token: accessToken
                    })
                  }
                  else {
                    console.log("NO existe")
                    User.create({googleId: profile.id, givenName: profile.name.givenName, familyName: profile.name.familyName, picture:profile.photos[0].value, token:accessToken });
                  }
                  return done(null, {
                    profile: profile,
                    token: accessToken
                });
            });
        }));
};