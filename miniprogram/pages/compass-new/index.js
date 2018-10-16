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

  saveTask: function () {
    var task = this.data.task;
    if(task.name == ''){
      $Message({
        content: '请填写轮盘名称',
        type: 'warning'
      });
      return false;
    }
    var c = task.items.filter(function (item) {
      return item.name == '';
    })
    if(c.length > 0){
      $Message({
        content: '请填写选项名称',
        type: 'warning'
      });
      return false;
    }


    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    var tasks_my = prevPage.data.tasks_my;
    this.data.task.id = tasks_my.length;
    this.data.task.title = '轮盘';//this.data.task.name.substr(0, 2);
    tasks_my.push(this.data.task);
    prevPage.setData({
      tasks_my: tasks_my
    });
    wx.setStorage({
      key: 'tasks',
      data: tasks_my,
      success: function (res) {
        console.log('setStorage success',res);
      },
      fail: function (res) {
        console.log('setStorage fail', res);
      }
    })

    wx.cloud.callFunction({
      name: 'login',
      data: this.data.task
    }).then(res => {
      console.log('success', JSON.parse(res.result));
    }).catch(err => {
      console.log('error', err);
    });

    wx.navigateBack({
      delta:1
    });
    
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