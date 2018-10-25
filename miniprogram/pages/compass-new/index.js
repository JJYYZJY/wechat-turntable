// miniprogram/pages/compass-new/index.js
const { $Message } = require('../../dist/base/index');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    task: {
      type: 0,
      name: '',
      title: '',
      items:[{
          id:0,
          name:''
        },{
          id:1,
          name:''
        }]
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  addItem: function () {
    var task = this.data.task;
    console.log(task);
    task.items.push({
      id:task.items.length,
      name:''
    })
    this.setData({
      task:task
    })
  },

  delItem: function () {
    var task = this.data.task;
    task.items.splice(task.items.length-1,1);
    this.setData({
      task: task
    })
  },

  checkTask: function (task) {
    if (task.name == '') {
      $Message({
        content: '请填写轮盘名称',
        type: 'warning'
      });
      return false;
    }
    var c = task.items.filter(function (item) {
      return item.name == '';
    })
    if (c.length > 0) {
      $Message({
        content: '请填写选项名称',
        type: 'warning'
      });
      return false;
    }

    return true;
  },

  saveTask: function () {
    var that = this;
    var task = this.data.task;
    if (!this.checkTask(task)){
      console.warn('checkTask error');
      return;
    }
    
    var pages = getCurrentPages();
    var tasks_my = null;
    if (pages.length > 1){
      var prevPage = pages[pages.length - 2];
      tasks_my = prevPage.data.tasks_my;
    }
    if (tasks_my == null){
      wx.getStorage({
        key: 'tasks',
        success: function (res) {
          console.log('success', res);
          tasks_my = res.data;
        },
        fail: function (res) {
          console.log('fail', res);
        },
        complete: function (res) {
          console.log('getStorage tasks', tasks_my);

          if (tasks_my == null) {
            tasks_my = [];
          }
          that.data.task.id = tasks_my.length;
          that.data.task.title = '罗盘';//that.data.task.name.substr(0, 2);
          tasks_my.push(that.data.task);

          wx.setStorage({
            key: 'tasks',
            data: tasks_my,
            success: function (res) {
              console.log('setStorage success', res);
            },
            fail: function (res) {
              console.log('setStorage fail', res);
            }
          })

          wx.cloud.callFunction({
            name: 'login',
            data: that.data.task
          }).then(res => {
            console.log('success', JSON.parse(res.result));
          }).catch(err => {
            console.log('error', err);
          });

          if (pages.length > 1) {
            var prevPage2 = pages[pages.length - 2];
            prevPage2.setData({
              tasks_my: tasks_my
            });
            wx.navigateBack({
              delta: 1
            });
          } else {
            wx.reLaunch({
              url: '../play/play?source=newCompass&task=' + JSON.stringify(that.data.task),
            })
          }
        }
      });
    }
    
  },

  bindInputTitle: function (e) {
    console.log(e)
    this.data.task.name = e.detail.value;
  },

  bindKeyInput: function (e) {
    console.log(e)
    this.data.task.items[e.currentTarget.dataset.index].name = e.detail.value;
  }
})