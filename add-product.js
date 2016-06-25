var express = require("express");
var app = express();
var fs = require("fs");
var productsInf = "information.json";
var incId = "increase-id.js";

app.post("/products", function (req, res, next) {
    fs.readFile(productsInf, "utf8", function (err, data) {
        var item = req.body;

        if (err) return next(err);
        if (isRightKey(item) && isRightType(item)) {
            addItem(res, data, item);
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


function addItem(res, data, item,next) {
    fs.readFile(incId, "utf8", function (err, increaseId) {
        if (err) return next(err);
        var jsData = JSON.parse(data);
        var oneItem = {
            "id": parseInt(increaseId),
            "barcode": item.barcode,
            "name": item.name,
            "unit": item.unit,
            "price": item.price
        };
        increaseId++;

        jsData.push(oneItem);
        res.status(200).json(oneItem);
        writeAllFiles(jsData, increaseId);
    });
}

function writeAllFiles(jsData, increaseId) {
    fs.writeFile(productsInf, JSON.stringify(jsData), function (err) {
        if (err) {
            console.error(err);
            res.send(err);
        }
    });

    fs.writeFile(incId, increaseId, function (err) {
        if (err) {
            console.error(err);
            res.send(err);
        }
    });
}

module.exports = app;