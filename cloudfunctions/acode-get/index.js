// 云函数入口文件
const cloud = require('wx-server-sdk')
const request = require('request');

cloud.init()

var getAccessToken = function (APPID, APPSECRET) {
  return new Promise((res, rej) => {
    try {
      request('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='+APPID+'&secret='+APPSECRET, (err, resp, body) => {
        if (err) {
          return rej(err)
        }
        return res(JSON.parse(body))
      })
    } catch (e) {
      return rej(e)
    }
  })
}

// 云函数入口函数
exports.main = async (event, context) => {

  return getAccessToken('wx667dd2b1a0af881a','eb759f9691c387e57a36bae7cd66b320').then(res => {
    console.log('getAccessToken',res);
    var access_token = res.access_token;
    console.log('access_token', access_token);
    return new Promise((res, rej) => {
      request({
        url: "https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=" + access_token,
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          scene:'test',
          page:'pages/compass-list/index'
        })
      }, function (err, resp, body) {
        if (err) {
          console.error(err)
          return rej(err)
        }
        console.error(body)
        return res(body)
      })
    })
  })

  
  
}