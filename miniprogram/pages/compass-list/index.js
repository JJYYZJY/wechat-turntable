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
        type: 2,
        id: 6,
        name: '真心话&大冒险',
        title: '游戏',
        items: [{
          problemType: 0,
          name: '真心话',
        }, {
          problemType: 1,
          name: '大冒险',
        }, {
          problemType: 2,
          name: 'PASS',
        }]
    }, {
        type: 10001,
        id: 7,
        name: '真心话题库',
        title: '游戏',
        problemType: 0,
    }, {
        type: 10001,
        id: 8,
        name: '大冒险题库',
        title: '游戏',
        problemType: 1,
    }, {
      type: 3,
      id: 9,
      name: '看哪部经典电影？',
      title: '电影',
      items: null
    }, {
        type: 0,
        id: 10,
        name: '周末怎么过？',
        title: '决定',
        items: [{
          name: '当然是逛吃逛吃',
        }, {
          name: '压力辣么大 玩会游戏吧',
        }, {
          name: '宅在家里吃泡面刷剧',
        }, {
          name: '什么周末？当我醒来就是周一',
        }, {
          name: '大风越狠我越要出去浪',
        }, {
          name: '组织朋友聚会',
        }, {
          name: '去电影院连刷三部电影',
        }, {
          name: '去公司加班/教室自习',
        }, {
          name: '出门扶老奶奶过马路',
        }, {
          name: '来一场说走就走的周边游',
        }]
      }, {
        type: 0,
        id: 11,
        name: '要不要辞职',
        title: '决定',
        items: [{
          name: '别瞎想 专心搬砖',
        }, {
          name: '我家有矿 想走就走',
        }, {
          name: '先找好下家再走',
        }, {
          name: '辞职 大爷不干了',
        }, {
          name: '明天再决定',
        }, {
          name: '请两天假放松一下',
        }, {
          name: '先冷静冷静再说',
        }, {
          name: '拿完年终奖再辞职',
        }, {
          name: '先努力学习提高能力',
        }, {
          name: '要想富 得创业',
        }, {
          name: '涨薪 不涨就辞职',
        }, {
          name: '忍无可忍 再忍一次',
        }]
      }, {
        type: 0,
        id: 12,
        name: '要不要表白',
        title: '决定',
        items: [{
          name: '表白',
        }, {
          name: '不表白',
        }, {
          name: '再等等',
        }, {
          name: '暗示一下',
        }]
      }, {
        type: 0,
        id: 13,
        name: '谁去取快递/外卖/跑腿',
        title: '决定',
        items: [{
          name: '最瘦的',
        }, {
          name: '微信好友最多的',
        }, {
          name: '个子最高的',
        }, {
          name: '离门口最近的',
        }, {
          name: '长得最好看的',
        }, {
          name: '年龄最小的',
        }, {
          name: '微信步数最少的',
        }, {
          name: '单身最久的',
        }, {
          name: '穿的最多的',
        }, {
          name: '头发最长的',
        }, {
          name: '手机电量最少的',
        }, {
          name: '双腿最直的',
        }]
      }, {
        type: 0,
        id: 14,
        name: '谁买单？',
        title: '决定',
        items: [{
          name: '身高最高的',
        }, {
          name: '微信好友最多的',
        }, {
          name: '最瘦的',
        }, {
          name: '身高第二高的',
        }, {
          name: '第二瘦的',
        }, {
          name: '年龄最小的',
        }, {
          name: '年龄最大的',
        }, {
          name: '微信好友第二多的',
        }, {
          name: '年龄第二大的',
        }, {
          name: '头发最长的',
        }, {
          name: '头发最短的',
        }, {
          name: '年龄第二小的',
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

    if(task.type == 10001){
      wx.navigateTo({
        url: '../truth-adventure/index?problemType=' + task.problemType + '&title=' + task.title,
      })
    }else{
      var pages = getCurrentPages();
      var prevPage = pages[pages.length - 2];
      prevPage.setData({
        needUpdate: true,
        newTask: task
      });
      wx.navigateBack({
        delta: 1
      });
    }
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