// miniprogram/pages/share-image/index.js
const { $Message } = require('../../dist/base/index');
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  eventGetImage: function (event) {
    console.log(event);
    this.setData({
      imageUrl:event.detail.tempFilePath
    })
  },

  saveCanvasImage(){
    wx.saveImageToPhotosAlbum({
      filePath: this.data.imageUrl,
      success: function (res) {
        console.log('success', res);
        $Message({
          content: '保存成功，已保存到手机相册',
          type: 'success'
        });
      },
      fail: function (res) {
        console.log('fail', res);
      }
    })
  },

  drawImage(title,text,acodeUrl){
    var width = 375;
    var height = 555;

    var acodeWidth = 100;
    var acodeHeight = 100;
    var acodeTop = height - acodeHeight - 20;
    var acodeLeft = (width - acodeWidth) / 2;
    
    var title = title;
    var text = text;
    var titleSize = 22;
    var textSize = 18;
    var linePadding = 6;
    var lineHeight = textSize + linePadding;

    var titleTop = 40;

    var boxBorderWidth = 5;
    var boxWidth = 200;
    var boxTop = 90;
    var boxLeft = (width - boxWidth) / 2

    var box2Width = boxWidth - boxBorderWidth * 2;
    var box2Top = boxTop + boxBorderWidth;
    var box2Left = (width - box2Width) / 2

    var textWidth = box2Width - 30;
    console.log('textWidth', textWidth);
    console.log('textSize', textSize);
    var lineTextSize = Math.floor(textWidth / textSize) + 1;
    console.log('lineTextSize', lineTextSize);
    var line = Math.ceil(text.length / lineTextSize);

    console.log('text.length', text.length);
    console.log('line', line);
    var textHeight = textSize * line + linePadding * (line - 1);
    var textPadding = 20;

    var box2Height = textHeight + textPadding * 2;
    var boxHeight = box2Height + boxBorderWidth * 2;

    var textTop = box2Top + textPadding;

    console.log(boxHeight, box2Height, textSize, textPadding, boxTop, box2Top, textTop);

    this.setData({
      painting: {
        width: width,
        height: height,
        views: [
          {
            type: 'rect',
            background: '#FFEBCC',
            top: 0,
            left: 0,
            width: width,
            height: height
          },
          {
            type: 'rect',
            background: '#FFB86C',
            top: boxTop,
            left: boxLeft,
            width: boxWidth,
            height: boxHeight
          },
          {
            type: 'rect',
            background: '#FFFFFF',
            top: box2Top,
            left: box2Left,
            width: box2Width,
            height: box2Height
          },
          {
            type: 'text',
            content: title,
            fontSize: titleSize,
            textAlign: 'center',
            breakWord: true,
            MaxLineNumber: 2,
            width: width - 60,
            top: titleTop,
            left: 187
          },
          {
            type: 'text',
            content: text,
            fontSize: textSize,
            textAlign: 'center',
            breakWord: true,
            MaxLineNumber: line + 4,
            lineHeight: lineHeight,
            width: textWidth,
            top: textTop,
            left: 187
          }
          ,
          {
            type: 'image',
            url: acodeUrl,
            top: acodeTop,
            left: acodeLeft,
            width: acodeWidth,
            height: acodeHeight
          }

        ]
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var title = options.title;
    var text = options.text;
    this.setData({
      title: title,
      text: text
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    var acode_tempFileUrl = '../../image/eat_code.jpg';
    that.drawImage(that.data.title, that.data.text, acode_tempFileUrl)
    // db.collection('acode-images').where({
    //   name: 'acode-small-ai'
    // }).get().then(res => {
    //   console.log('acode result ', res);
    //   wx.cloud.downloadFile({
    //     fileID: res.data[0].url,
    //     success: function (res) {
    //       console.log('getTempFileURL', res);
    //       that.drawImage(that.data.title, that.data.text, res.tempFilePath)
    //     }
    //   });
    // })
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

  }
})