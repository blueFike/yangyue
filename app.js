var express = require("express");
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');
app.use(bodyParser.json());

var products = require('./create-product-jsonfile.js');
app.use('/', require('./add-product'));
app.use('/', require('./get-all-products'));
app.use('/', require('./get-one-product'));
app.use('/', require('./delete-product'));
app.use('/', require('./update-product'));

var server = app.listen(3000, function () {
    var port = server.address().port;
    console.log("listen on " + port);
});

