// miniprogram/pages/compass-list/index.js
const { $Message } = require('../../dist/base/index');

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
    tasks_recommend = [{
      type: 1,
      id: 0,
      name: '美食',
      title: '美食',
      title_key: '美食',
      items: null
    }, {
      type: 1,
      id: 1,
      name: '游玩景点',
      title: '景点',
      title_key: '旅游景点',
      items: null
    }, {
      type: 1,
      id: 2,
      name: '购物商场',
      title: '购物',
      title_key: '综合商场',
      items: null
    }, {
      type: 1,
      id: 3,
      name: '休闲娱乐',
      title: '休闲',
      title_key: '娱乐休闲',
      items: null
    }, {
      type: 0,
      id: 4,
      name: '石头剪刀布',
      title: '猜拳',
      items: [{
        name:'石头',
      },{
        name: '剪刀',
      },{
        name: '布',
      }]
      }, {
        type: 0,
        id: 5,
        name: '抛硬币',
        title: '决定',
        items: [{
          name: '正面',
        }, {
          name: '反面',
        }]
      }, {
        type: 0,
        id: 6,
        name: '真心话&大冒险',
        title: '游戏',
        items: [{
          name: '真心话',
        }, {
          name: '大冒险',
        }, {
          name: 'PASS',
        }]
      }];
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
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    prevPage.setData({
      needUpdate: true,
      newTask: task
    });
    wx.navigateBack({
      delta: 1
    });
  },

  selectDiyTitle: function (event) {
    console.log(event);
    var task = this.data.tasks_my[event.currentTarget.dataset.index];
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    prevPage.setData({
      needUpdate: true,
      newTask: task
    });
    wx.navigateBack({
      delta: 1
    });
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