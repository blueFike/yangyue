var express = require("express");
var app = express();
var fs = require("fs");
var productsInf = "information.json";

app.put('/products/:id', function (req, res, next) {
    fs.readFile(productsInf, "utf8", function (err, data) {
        var item = req.body;

        if (err) return next(err);
        if (isRightKey(item) && isRightType(item)) {
            updateItem(res, req, data, item);
        }
        else {
            res.status(400).send("");
        }
    });
});


function isRightKey(item) {

    return item.hasOwnProperty("barcode") &&
        item.hasOwnProperty("name") &&
        item.hasOwnProperty("unit") &&
        item.hasOwnProperty("price");
}

function isRightType(item) {

    return typeof (item.barcode) === "string" &&
        typeof (item.name) === "string" &&
        typeof (item.unit) === "string" &&
        typeof (item.price) === "number"
}

function updateItem(res, req, data, item) {
    var jsData = JSON.parse(data);
    var i = 0;
    var flag = 0;

    for (i; i < jsData.length; i++) {
        if (jsData[i].id === parseInt(req.params.id)) {
            var oneItem = {
                "id": jsData[i].id,
                "barcode": item.barcode,
                "name": item.name,
                "unit": item.unit,
                "price": item.price
            };
            flag = 1;
            jsData.splice(i, 1, oneItem);
            res.status(200).send("");
            writeAllFiles(jsData);
        }
    }
    if (flag === 0) {
        res.status(404).send("");
    }
}

function writeAllFiles(jsData) {
    fs.writeFile(productsInf, JSON.stringify(jsData), function (err) {
        if (err) {
            console.error(err);
            res.send(err);
        }
    });
}

module.exports = app;