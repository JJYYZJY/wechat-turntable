//index.js
const app = getApp()
var dbSubjects = null;
const db = wx.cloud.database();

Page({
  data: {
    avatarUrl: '../../image/user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: ''
  },

  postDB: function() {
    console.log(dbSubjects);
  },

  postMoive: function (subject){
    db.collection('movie-top250').add({
      data: subject
    }).then(res => {
      console.log('add success', res);
    }).catch(err => {
      console.log('add err', err);
    })
  },

  downMovie: function(that,start) {

    wx.cloud.callFunction({
      name: 'test',
      data: {
        start: start,
        count: 1
      }
    }).then(res => {
      console.log('success', res);
      const subjects = res.result;
      dbSubjects = subjects;
      const subject = subjects[0];
      const cc = subject.casts == null ? 0 : subject.casts.length;
      const dd = subject.directors == null ? 0 : subject.directors.length;
      var a = 1 + cc + dd;
      console.log('a',a);
      var b = 0;
      var url = subject.images.large;
      wx.cloud.callFunction({
        name: 'movie-douban2cloud',
        data: {
          url: url,
          imageType: 'image'
        }
      }).then((imageId) => {
        console.log(imageId);
        subject.cloudImageId = imageId.result;
        b++;
        if(b == a){
          that.postMoive(subject);
        }
      })

      const casts = subject.casts;
      for (var j = 0; j < casts.length; j++) {
        const cast = casts[j];
        if (cast.avatars != null) {
          url = cast.avatars.large;
          wx.cloud.callFunction({
            name: 'movie-douban2cloud',
            data: {
              url: url,
              imageType: 'cast'
            }
          }).then((imageId) => {
            console.log(imageId);
            cast.cloudImageId = imageId.result;
            b++;
            if (b == a) {
              that.postMoive(subject);
            }
          })
        }
      }


      const directors = subject.directors;
      for (var j = 0; j < directors.length; j++) {
        const director = directors[j];
        if (director.avatars != null) {
          url = director.avatars.large;
          wx.cloud.callFunction({
            name: 'movie-douban2cloud',
            data: {
              url: url,
              imageType: 'director'
            }
          }).then((imageId) => {
            console.log(imageId);
            director.cloudImageId = imageId.result;
            b++;
            if (b == a) {
              that.postMoive(subject);
            }
          })
        }

      }
    }).catch(err => {
      console.log('error', err);
    });



  },

  startLoop: function (that,num) {
    if (num <= 250){
      that.downMovie(that, num);
      num++;
      setTimeout(function () {
        that.startLoop(that,num);
      }, 1000 * 10);
    }
  },

  onLoad: function() {
    var that = this;
    // that.startLoop(that,250);
    
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  },

  onGetUserInfo: function(e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

})
