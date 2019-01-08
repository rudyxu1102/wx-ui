// pages/footer-option-page/index.js
let globalData = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: false,
    resDomain: globalData.resDomain + 'image/wcdWxApp/'
  },

  showOptions: function () {
    this.setData({
      isShow: true
    })
  },

  hideOptions: function () {
    this.setData({
      isShow: false
    })
  }
})