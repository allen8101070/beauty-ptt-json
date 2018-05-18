const request = require('request');
const cheerio = require('cheerio');
//  之後會用來保存資料的陣列
const alljson = [];


var getBeautyhref = () => {
    request({
        uri: 'https://www.ptt.cc/bbs/Beauty/index.html',
        method: 'GET'
        }, function (error, response, body) {
            if (error) {
                return
            }
            const $ = cheerio.load(body);
            const results = [];
            const titles = $('.r-ent .title a');
    
            for (let i = 0; i < 5; i++) {
                let pttobj = {}
                pttobj.href = 'https://www.ptt.cc' + titles[i].attribs.href
                console.log(pttobj.href)
                getBeautyImg(pttobj.href)
            }
        }
    
    )
}



var getBeautyImg = url => {
    request({
        uri: url,
        method: 'GET'
    }, function (error, response, body) {
        if (error) {
            return
        }
        const $ = cheerio.load(body);
        const results = [];
        let images = body.match(/imgur.com\/[0-9a-zA-Z]{7}/g);
        images = [...new Set(images)]

        for (let i = 0; i < images.length; i++) {
            let item = {}
            item.src = 'http://' + images[i] + '.jpg';
            alljson.push(item)
        }
        console.log(alljson)
    }

    )
}

// 匯出模組給index.js
module.exports = {
    getBeautyhref,
    getBeautyImg,
    alljson:alljson
}