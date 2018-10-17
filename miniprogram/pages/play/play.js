// miniprogram/pages/play/play.js
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk;
var a = {};
var colors = ["#FD6592", "#FEFFFA"];
var textColors = ["#FEFFFA", "#FD6592"];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLocaltion:true,//是否授权
    locationStatus: 0,//0未开始，1定位成功，2定位失败
    localName: null,//定位到的位置
    localMsg:'未授权',//提示信息
    searchError: false,
    needUpdate: true,
    newTask: {
      type: 1,
      id: 0,
      name: '美食推荐，我要去吃啥？',
      title: '美食',
      title_key: '美食',
      items: null,
    },
    task: null,
    cacheEat: null,
    currentItem: null,
    itemJson: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.clearStorage();
    console.log('onLoad');
    qqmapsdk = new QQMapWX({
      key: 'KNUBZ-B4XCP-P2GDZ-VHK7F-7FSSJ-M4BH4'
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('onShow');
    if (this.data.needUpdate){
      this.notifyCompass();
      this.setData({
        needUpdate: false
      })

    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  notifyCompass: function () {
    console.log('newTask',this.data.newTask);
    if(this.data.newTask == null){
      console.warn('notifyCompass newTask is null');
      return;
    }
    const that = this;
    const newTask = this.data.newTask;
    this.setData({
      newTask: null,
      task: newTask,
      currentItem: null,
      itemJson: null
    })
    if (this.data.task.type == 1 && this.data.task.items == null) {
      // if(this.data.cacheEat == null){
        wx.authorize({
          scope: 'scope.userLocation',
          success: () => {
            that.setData({
              isLocaltion: true
            })
            if (that.data.task.items) {
              return;
            }
            that.searchMap(this.data.task.title_key);
            that.getLocationInfo();
          },
          fail: () => {
            that.setData({
              isLocaltion: false
            })
          }
        })
        return;
      // }else{
      //   this.setData({
      //     task: this.data.cacheEat
      //   });
      // }
    }
    if (this.data.task.type == 3 && this.data.task.items == null){
      wx.cloud.callFunction({
        name: 'movie-list',
        data: {
          count: 12
        }
      }).then(res => {
        var resultTask = JSON.parse(res.result);
        console.log('success', resultTask);
        var subjects = resultTask.subjects;
        subjects.forEach((subject) => {
          subject.name = subject.title
        });
        var task = that.data.task;
        task.items = subjects;
        that.setData({
          task: task,
          cacheMovie: task
        })
        that.formatOptions(subjects);
      }).catch(err => {
        console.log('error', err);
      });
      return;
    }
    this.initCompass();
  },

  initCompass: function () {
    var options = null;
    if(this.data.task.type == 1){
      options = this.mkr2options(this.data.task.items);
    }else{
      options = this.data.task.items;
    }
    console.log(options);    
    this.formatOptions(options);
  },

  //获取位置信息
  getLocationInfo: function () {
    var that = this;
    that.setData({
      locationStatus: 0,
      localMsg: '定位中'
    })
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        console.log('getLocation:', res)
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function (res) {
            console.log('reverseGeocoder', res);
            that.setData({
              locationStatus: 1,
              localMsg: '定位成功',
              localName: res.result.formatted_addresses.recommend
            })
          },
          fail: function (res) {
            console.log(res);
            that.setData({
              locationStatus: 2,
              localMsg: '定位失败'
            })
          },
          complete: function (res) {
            console.log(res);
          }
        });
      },
    })
  },

  //poi检索附近商家
  searchMap: function (title) {
    console.log('searchMap keyword:',title);
    var that = this;
    qqmapsdk.search({
      keyword: title,
      orderby: 'star',
      page_size: 14,
      success: (res) => {
        console.log("success:", res);
        var task = that.data.task;
        task.items = res.data;
        that.setData({
          task: task,
          cacheEat: task
        })
        const options = that.mkr2options(res.data);
        console.log(options);
        that.formatOptions(options);
      },
      fail: (res) => {
        console.log("fail:", res);
        that.setData({
          searchError: true
        })
      }
    });
  },

  //抽取检索结果中title组成给罗盘显示
  mkr2options: function (mkrs) {
    mkrs.forEach((mkr)=>{
          mkr.name= mkr.title
    });
    return mkrs;
  },

  //根据选项数量格式化罗盘
  formatOptions: function (options) {
    var e = this, n = options, t = n.length, i = 360 / t, s = i - 90, r = [], d = 1 / t;
    // wx.createCanvasContext("lotteryCanvas");
    var single = t == 2 || t % 2 == 1;
    for (var o = 942.47778 / t, g = 0; g < t; g++) {
      console.log(d + ":turnNum");
      var l = colors[0];
      if (!single) {
        var u = g % 2;
        l = 1 == u ? colors[1] : colors[0]; 
      }else {
        var u = g % 2;
        l = colors[1];
      }
      var textColor = textColors[0];
      if (!single) {
        var u = g % 2;
        textColor = 1 == u ? textColors[1] : textColors[0];
      }else {
        var u = g % 2;
        textColor = textColors[1];
      }
      r.push({
        k: g,
        itemWidth: o + "px",
        item2BgColor: l,
        itemColor: textColor,
        item2Deg: g * i + 90 - i / 2 + "deg",
        item2Turn: g * d + d / 2 + "turn",
        ttt: "",
        tttSkewX: 4 * t + "deg",
        afterDeg: s + "deg",
        turn: g * d + "turn",
        lineTurn: g * d + d / 2 + "turn",
        award: n[g].name
      });
    }
    e.setData({
      single: single,
      awardsLen: r.length,
      awardsList: r
    });
    
  },

  createCanvas: function () {

  },

  //随机转动罗盘
  getLottery: function () {
    var e = this, t = this.data.task.items.length;
    console.log("len:" + t);
    var i = Math.random() * t >>> 0;
    a.runDegs = a.runDegs || 0, console.log("deg", a.runDegs), a.runDegs = a.runDegs + (360 - a.runDegs % 360) + (2160 - i * (360 / t)),
      console.log("deg", a.runDegs);
    var s = wx.createAnimation({
      duration: 4e3,
      timingFunction: "ease"
    });
    e.animationRun = s;
    s.rotate(a.runDegs).step();
    e.setData({
      animationData: s.export(),
      btnDisabled: "disabled",
      sliderDisabled: "disabled"
    });
    setTimeout(function () {
      e.setData({
        btnDisabled: "",
        sliderDisabled: "",
        itemIndex: i,
        currentItem: e.data.task.items[i],
        itemJson: JSON.stringify(e.data.task.items[i])
      });
      console.log(e.data.currentItem);
    }, 4e3);
  },

  showMore: function() {
    wx.navigateTo({
      url: '../compass-list/index',
    })
  },

  gotoDetail: function() {
    console.log('gotoDetail type', this.data.task.type);
    if(this.data.task.type == 0){
      return;
    }
    if(this.data.task.type == 1){
      wx.navigateTo({
        url: '../detail/detail?itemJson=' + this.data.itemJson + '&title=' + this.data.task.title,
      })
    }else if(this.data.task.type == 2){
      if (this.data.currentItem.problemType == 2){
        return;
      }
      wx.navigateTo({
        url: '../truth-adventure/index?problemType=' + this.data.currentItem.problemType + '&title=' + this.data.task.title,
      })
    }else if(this.data.task.type == 3){
      wx.navigateTo({
        url: '../movie-info/index?itemJson=' + this.data.itemJson + '&title=' + this.data.task.title,
      })
    }

    
  }
})