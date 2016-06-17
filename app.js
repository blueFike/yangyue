var express = require("express");
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');
var products = require('./create-product-jsonfile.js');

app.use(bodyParser.json());

app.use('/', require('./add-product'));
app.use('/', require('./get-all-products'));
app.use('/', require('./get-one-product'));
app.use('/', require('./delete-product'));
app.use('/', require('./update-product'));

app.listen(3000);