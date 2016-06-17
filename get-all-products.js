var express = require("express");
var app = express();
var fs = require("fs");
var productsInf = "information.json";

app.get("/products", function (req, res) {
    fs.readFile(productsInf, "utf8", function (err, data) {
        if (err) {
            res.status(500).send(err);

            return;
        }
        var jsData = JSON.parse(data);
        
        res.status(200).json(jsData);
    });
});

module.exports = app;

