// 云函数入口文件
const cloud = require('wx-server-sdk')
const request = require('request');
cloud.init()
const db = cloud.database();

var getRandom = function (min, max) {
  const range = max - min;
  const rand = Math.random();
  return (min + Math.round(rand * range));
}

var getMoviesFOrDouBan = function (start, count) {
  return new Promise((res, rej) => {
    try {
      request('http://api.douban.com/v2/movie/top250?start=' + start + '&count=' + count, (err, resp, body) => {
        if (err) {
          return rej(err)
        }
        var obj = JSON.parse(body);
        var subjects = obj.subjects;
        return res(subjects)
      })
    } catch (e) {
      return rej(e)
    }
  })
}

// 云函数入口函数
exports.main = async (event, context) => {

  var count = event.count;
  var start = getRandom(0, 250 - 1 - count);
  var res = db.collection('movie-top250').skip(start).limit(count).get();
  console.log(res);
  return res;

// return getMoviesFOrDouBan(start,count);
}