// 云函数入口文件
const cloud = require('wx-server-sdk')
const request = require('request');
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  console.log('event',event);
  console.log('context', context);
  return new Promise((res,rej)=>{
    try{
      request('http://www.baidu.com',(err,resp,body)=>{
        if(err){
          return rej(err)
        }
        return res(body)
      })
    }catch(e){
      return rej(e)
    }
  })



  return event.a + event.b;
}