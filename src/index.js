const express = require("express");
const app = express();
const path = require("path")

app.set("puerto", 3000 || process.env.PORT);

app.set('views', path.join(__dirname, 'views'));
app.set('public', path.join(__dirname, 'public'));

app.set("view engine", "ejs");

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/formulario', function(req, res) {
    res.render('formulario');
});



app.listen(app.get("puerto"), ()=>
{
    console.log("Se dio de alta el servidor con el puerto: " + app.get("puerto"));
});