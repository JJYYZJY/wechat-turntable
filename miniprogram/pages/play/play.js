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
    isLocaltion:false,
    localName:'定位中',
    localMsg:'未授权'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    const that = this;
    wx.authorize({
      scope: 'scope.userLocation',
      success: () => {
        if(that.data.mkrs){
          return;
        }
        qqmapsdk.search({
          keyword: '美食',
          orderby: 'star',
          page_size: 14,
          success: (res) => {
            console.log("success:", res);
            that.setData({
              mkrs: res.data
            })
            const options = that.mkr2options(res.data);
            console.log(options);
            that.formatOptions(options);
          },
          fail: (res) => {
            console.log("fail:", res);
          }
        });
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
                console.log(res);
                that.setData({
                  localName: res.result.address
                })
              },
              fail: function (res) {
                console.log(res);
              },
              complete: function (res) {
                console.log(res);
              }
            });
          },
        })
        that.setData({
          isLocaltion: true,
        })
      },
      fail: () => {

      }
    })
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

  mkr2options: function (mkrs) {
    var options = [];
    mkrs.forEach((mkr)=>{
        options.push({
          name: mkr.title
        })
    });
    return options;
  },

  formatOptions: function (options) {
    var e = this, n = options, t = n.length, i = 360 / t, s = i - 90, r = [], d = 1 / t;
    wx.createCanvasContext("lotteryCanvas");
    for (var o = 942.47778 / t, g = 0; g < t; g++) {
      console.log(d + ":turnNum");
      var l = colors[0];
      if (t % 2 == 0) l = 1 == (u = g % 2) ? colors[1] : 2 == u ? colors[1] : colors[0]; else {
        var u = g % 2;
        l = g == t - 1 ? colors[1] : 1 == u ? colors[0] : colors[1];
      }
      var textColor = textColors[0];
      if (t % 2 == 0) textColor = 1 == (u = g % 2) ? textColors[1] : 2 == u ? textColors[1] : textColors[0]; else {
        var u = g % 2;
        textColor = g == t - 1 ? textColors[1] : 1 == u ? textColors[0] : textColors[1];
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
      awardsLen: r.length,
      awardsList: r
    });
    
  },

  createCanvas: function () {

  },

  getLottery: function () {
    var e = this, t = 14;
    console.log("len:" + t);
    var i = Math.random() * t >>> 0;
    a.runDegs = a.runDegs || 0, console.log("deg", a.runDegs), a.runDegs = a.runDegs + (360 - a.runDegs % 360) + (2160 - i * (360 / t)),
      console.log("deg", a.runDegs);
    var s = wx.createAnimation({
      duration: 4e3,
      timingFunction: "ease"
    });
    e.animationRun = s, s.rotate(a.runDegs).step(), e.setData({
      animationData: s.export(),
      btnDisabled: "disabled",
      sliderDisabled: "disabled"
    }), setTimeout(function () {
      e.setData({
        btnDisabled: "",
        sliderDisabled: "",
        itemIndex: i,
        currentItem: e.data.mkrs[i],
        itemJson: JSON.stringify(e.data.mkrs[i])
      });
    }, 4e3);
  },
})