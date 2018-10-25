// miniprogram/pages/truth-adventure/index.js
var dataModel = require('../../utils/truth-adventure-data.js');
var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    problemType: 0,
    titles:['真心话','大冒险'],
    problem:'',
    turthItems: [],
    adventureItems: []
  },

  gotoShareImage: function() {
    wx.navigateTo({
      url: '../share-image/index?text=' + this.data.problem + '&title=' + this.data.titles[this.data.problemType],
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var problemType = options.problemType | 0;
    var turthItems = dataModel.getTruthItems();
    var adventureItems = dataModel.getAdventureItems();
    this.setData({
      problemType: problemType,
      turthItems: turthItems,
      adventureItems: adventureItems
    })
    console.log(this.data);
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

  nextProblem: function () {
    var problems = this.data.problemType == 0 ? this.data.turthItems : this.data.adventureItems;
    var index = util.getRandom(0, problems.length-1);
    this.animationProblem(this, 0, index, problems);
  },

  animationProblem: function (that,count, index, problems) {
    setTimeout(function () {
      if (count < 10) {
        that.setData({
          problem: problems[count++]
        })
        that.animationProblem(that, count, index, problems);
      } else {
        that.setData({
          problem: problems[index]
        })
      }

    }, 100);
  }
})