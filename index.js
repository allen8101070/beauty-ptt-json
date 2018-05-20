const fs = require('fs');
const express = require('express');
const cors = require('cors');
const crawler = require('./crawler.js');
const app = express();


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


