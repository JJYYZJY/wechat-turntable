// 云函数入口文件
const cloud = require('wx-server-sdk')
const request = require('request');
const fs = require('fs')
const path = require('path')
cloud.init()

function downloadUrl(url) {
    const last = url.lastIndexOf('/')
    if (last > 0) {
      const name = url.substr(last + 1)
      const dstpath = './' + name
      if (name.length) {
          console.log(dstpath)
          request(url).pipe(fs.createWriteStream(dstpath))
      }
    }
}

function getMovieList(start,count){
  return new Promise((res, rej) => {
    try {
      request('http://api.douban.com/v2/movie/top250?start='+start+'&count='+count, (err, resp, body) => {
        if (err) {
          return rej(err)
        }
        var obj = JSON.parse(body);
        var subjects = obj.subjects;
        // console.log('subjects',subjects);
        return res(subjects)
      })
    } catch (e) {
      return rej(e)
    }
  })
}

var url2ImageId = function (url) {
  console.log('url', url);
  var last = url.lastIndexOf('/')
  var name = url.substr(last + 1)
  console.log('name', name);
  var resfile = request(url)
  return cloud.uploadFile({
    cloudPath: 'movie/images/' + name,
    fileContent: resfile
  })
}

// 云函数入口函数
exports.main = async (event, context) => {

  return getMovieList(event.start,event.count);
  
  // var movies = await getMovieList(event.start,event.count);
  // // console.log('movies', movies);
  // var subject;
  // for(var i = 0 ; i < movies.length ; i++){
  //   subject = movies[i];
  //   var url = subject.images.large;
  //   var imageId = await url2ImageId(url);
  //   console.log(imageId);
  //   subject.cloudImageId = imageId.fileID;


  //   var casts = subject.casts;
  //   for (var j = 0; j < casts.length; j++) {
  //     var cast = casts[j];
  //     if (cast.avatars != null){
  //       url = cast.avatars.large;
  //       imageId = await url2ImageId(url);
  //       console.log(imageId);
  //       cast.cloudImageId = imageId.fileID;
  //     }
  //   }


  //   var directors = subject.directors;
  //   for (var j = 0; j < directors.length; j++) {
  //     var director = directors[j];
  //     if (director.avatars != null) {
  //       url = director.avatars.large;
  //       var imageId = await url2ImageId(url);
  //       console.log(imageId);
  //       director.cloudImageId = imageId.fileID;
  //     }
  //   }

  //   const db = cloud.database();
  //   try{
  //       await db.collection('movies').add({
  //         data: subject
  //       })
  //   }catch(e){
  //     console.error(e);
  //   }


  // }
  // return 'ok';
    
}