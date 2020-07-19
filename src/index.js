const bodyParser = require('body-parser');

const express = require('express'),
    app = express(),
    passport = require('passport'),
    auth = require('./rutas/auth'),
    rutas = require("./rutas/main"),
    indice = require("./rutas/index"),
    cookieParser = require('cookie-parser'),
    cookieSession = require('cookie-session');
    bd = require("./configBd");
    path = require("path");
    const bodyparser = require("body-parser");



//auth config
auth(passport);
app.use(passport.initialize());


//middlewares
app.use(cookieSession({
    name: 'session',
    keys: ['af4af4wfaf21t14tasaxasdasfrwf3211']
}));
app.use(cookieParser());
app.use(bodyparser.urlencoded({
    extended: true
  }));
//public config
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine", "ejs");

//rutas 
rutas(app,passport);
indice(app, passport);


//server config
app.set("puerto", 3000 || process.env.PORT);

app.listen(app.get("puerto"), ()=>
{
    console.log("Se dio de alta el servidor con el puerto: " + app.get("puerto"));
});

module.exports = app;