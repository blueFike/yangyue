var express = require("express");
var app = express();
var fs = require("fs");
var productsInf = "information.json";

app.get("/products", function (req, res, next) {
    fs.readFile(productsInf, "utf8", function (err, data) {
        if (err) return next(err);
        var jsData = JSON.parse(data);

        res.status(200).json(jsData);
    });
});

module.exports = app;

