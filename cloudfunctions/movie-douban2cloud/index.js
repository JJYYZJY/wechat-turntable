// 云函数入口文件
const cloud = require('wx-server-sdk')
const request = require('request');
cloud.init();
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  var url = event.url;
  console.log('url', url);

  var imageResult = null;
  try {
    imageResult = await db.collection('movie-images').where({
      url:url
    }).get();
  } catch (e) {
    console.error(e);
  }

  console.log(imageResult);

  if (imageResult != null && imageResult.data != null && imageResult.data.length != 0){
    return imageResult.data[0].fileID;
  }
  
  var imageType = event.imageType;
  var dirName = null;
  if(imageType == 'image'){
    dirName = 'movie/images/';
  } else if (imageType == 'cast'){
    dirName = 'movie/images/casts/';
  } else if (imageType == 'director'){
    dirName = 'movie/images/directors/';
  }else{
    return 'error no imageType';
  }
  var last = url.lastIndexOf('/')
  var name = url.substr(last + 1)
  console.log('name', name);
  var resfile = request(url);
  var imageId = await cloud.uploadFile({
    cloudPath: dirName + name,
    fileContent: resfile
  })

  console.log(imageId);

  try {
    var addres = await db.collection('movie-images').add({
      data: {
        url:url,
        imageType:imageType,
        fileID:imageId.fileID
      }
    })
  } catch (e) {
    console.error('db add err',e);
  }

  return imageId.fileID;


}