var express = require('express');
var app = express();
var fs = require('fs');
var productsInf = "information.json";

app.get('/products/:id', function (req, res, next) {
    fs.readFile(productsInf, "utf8", function (err, data) {
        var flag = 0;
        if (err) return next(err);
        flag = getOneItem(req, res, data);

        if (flag === 0) {
            res.status(404).send("");
        }
    });
});

function getOneItem(req, res, data) {
    var jsData = JSON.parse(data);
    var flag = 0;

    jsData.forEach(function (item) {
        if (item.id === parseInt(req.params.id)) {
            res.status(200).json(item);

            flag = 1;
        }
    });

    return flag;
}

module.exports = app;