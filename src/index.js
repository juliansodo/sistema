const express = require('express'),
    app = express(),
    passport = require('passport'),
    auth = require('./rutas/auth'),
    rutas = require("./rutas/main"),
    cookieParser = require('cookie-parser'),
    cookieSession = require('cookie-session');
    bd = require("./configBd");
    const path = require("path")
    


//auth config
auth(passport);
app.use(passport.initialize());


//middlewares
app.use(cookieSession({
    name: 'session',
    keys: ['af4af4wfaf21t14tasaxasdasfrwf3211']
}));
app.use(cookieParser());

//public config
app.set('views', path.join(__dirname, 'views'));
app.set('public', path.join(__dirname, 'public'));
app.set("view engine", "ejs");

//rutas 
rutas(app,passport);



//server config
app.set("puerto", 3000 || process.env.PORT);

app.listen(app.get("puerto"), ()=>
{
    console.log("Se dio de alta el servidor con el puerto: " + app.get("puerto"));
});

module.exports = app;