const express = require('express');
const engines = require('consolidate');
const app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

var publicDir = require('path').join(__dirname, '/public');
app.use(express.static(publicDir));

//npm i handlebars consolidate --save
app.engine('hbs', engines.handlebars);
app.set('views', './views');
app.set('view engine', 'hbs');

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb+srv://hoaison2204:Son22042000@cluster0.cnlb1.mongodb.net/test';

app.get('/all', async function (req, res) {
    let client = await MongoClient.connect(url);
    let dbo = client.db("GCH0719");
    let result = await dbo.collection("Product").find({}).toArray();
    res.render('allSanPham', { SanPham: result });

})

const PORT = process.env.PORT || 5000
var server = app.listen(PORT, function () {
    console.log("Server is running at " + PORT);
});