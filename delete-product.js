var express = require("express");
var app = express();
var fs = require("fs");
var productsInf = "information.json";

app.delete('/products/:id', function (req, res) {
    fs.readFile(productsInf, "utf8", function (err, data) {
        var flag = 0;

        if (err) {
            res.status(500).send(err);

            return;
        }

        deleteItem(req, res, data);
    });
});

function deleteItem(req, res, data) {
    var jsData = JSON.parse(data);
    var i = 0;
    var flag = 0;

    for (i; i < jsData.length; i++) {
        if (jsData[i].id === parseInt(req.params.id)) {
            jsData.splice(i, 1);
            flag = 1;
            res.status(204).send("");
            writeAllFiles(jsData);
            break;
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