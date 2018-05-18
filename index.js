const fs = require('fs');
var express = require('express');
var cors = require('cors');
var crawler = require('./crawler.js');

var app = express();


//使用此跨域模組 預設是＊無限制
app.use(cors())
crawler.getBeautyhref()
app.get('/', function (req, res) {

    res.json(
        crawler.alljson
    );
    
})

app.use(function (req, res, next) {
    res.status(404).send('<html><head></head><body><h1>404找不到！</h1></body></html>')
})


//監聽port
var port = process.env.PORT || 3000;
app.listen(port)


