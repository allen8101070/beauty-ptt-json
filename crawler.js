const request = require('request');
const cheerio = require('cheerio');

//  用來保存資料的陣列
const alljson = [];

// 爬蟲：取得目前表特版第一頁的連結
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

            // 查找表特版首頁的css選擇器 找到.r-ent內的.title內的a
            const titles = $('.r-ent .title a');
    
            // 取得5筆表特頁連結
            for (let i = 0; i < 7; i++) {
                let pttobj = {}
                pttobj.href = 'https://www.ptt.cc' + titles[i].attribs.href

                // 呼叫取得表特頁內的圖片函式 並傳入表特頁連結當參數
                getBeautyImg(pttobj.href)
            }
        }
    
    )
}


// 爬蟲：取得該表特頁內連結的圖片連結
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

        // 只要裡頭有imgur圖床的連結就抓
        let images = body.match(/imgur.com\/[0-9a-zA-Z]{7}/g);

        // ...運算子直接把images連結灑進陣列 太好用啦！！！
        images = [...new Set(images)]

        //把目前陣列處理成完整的json
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