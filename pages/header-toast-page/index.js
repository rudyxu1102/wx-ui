// pages/header-toast-page/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tip: '请输入正确的手机号码'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  changeTip: function (e) {
    this.setData({
      tip: e.detail.value
    })
  },

  showTip: function () {
    this.setData({
      isShowTip: true
    })
  }
})