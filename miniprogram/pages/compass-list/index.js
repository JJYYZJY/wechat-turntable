// miniprogram/pages/compass-list/index.js
const { $Message } = require('../../dist/base/index');
const compass_recommend_util = require('../../utils/compass-list.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    visible: false,
    actions: [
      {
        name: '删除轮盘',
      }
    ],
    tasks_recommend: [],
    tasks_my: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getTasks();
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

  getTasks: function () {
    var that = this;
    var tasks_recommend = null;    
    var tasks_my = null;
    wx.getStorage({
      key: 'tasks',
      success: function(res) {
        console.log('success',res);
        tasks_my = res.data;
      },
      fail: function(res) {
        console.log('fail',res);
      },
      complete: function(res) {
        console.log('getStorage tasks', tasks_my);
        if(tasks_my != null){
          that.setData({
            tasks_my: tasks_my
          })
        }
      }
    });
    tasks_recommend = compass_recommend_util.getCompassList();
    that.setData({
      tasks_recommend: tasks_recommend
    })
  },

  addCompass: function () {
    wx.navigateTo({
      url: '../compass-new/index',
    })
  },

  selectRecommendTitle: function (event) {
    console.log(event);
    var task = this.data.tasks_recommend[event.currentTarget.dataset.index];

    if(task.type == 10001){
      wx.navigateTo({
        url: '../truth-adventure/index?problemType=' + task.problemType + '&title=' + task.title,
      })
    }else{
      this.goHome(task);
    }
  },

  selectDiyTitle: function (event) {
    console.log(event);
    var task = this.data.tasks_my[event.currentTarget.dataset.index];
    this.goHome(task);
  },

  goHome: function (task) {
    var pages = getCurrentPages();
    if(pages.length > 1){
      var prevPage = pages[pages.length - 2];
      prevPage.setData({
        needUpdate: true,
        newTask: task
      });
      wx.navigateBack({
        delta: 1
      });
    }else{
      wx.reLaunch({
        url: '../play/play?source=compassList&task=' + JSON.stringify(task),
      })
    }
  },

  longClick: function (event) {
    console.log(event);
    var index = event.currentTarget.dataset.index;
    var task = this.data.tasks_my[index];
    this.data.actions[0].name = '删除轮盘('+task.name+')'
    this.setData({
      actions:this.data.actions,
      longSelectTask:task,
      longSelectIndex:index,
      visible: true
    })
  },

  handleCancel() {
    this.setData({
      visible: false
    });
  },

  handleClickItem({ detail }) {
    const index = detail.index + 1;

    if(index == 1){
      this.deleteCompass(this.data.longSelectIndex, this.data.longSelectTask);
    }

    this.handleCancel();
  },

  deleteCompass: function (index,task) {
    var tasks = this.data.tasks_my;
    tasks.splice(index,1);
    this.setData({
      tasks_my:tasks
    })
    wx.setStorage({
      key: 'tasks',
      data: tasks,
    })
    $Message({
      content: '删除成功'
    });
  }
})