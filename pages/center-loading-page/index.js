// pages/loading-page/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: false
  },

  showLoading: function () {
    this.setData({
      isShow: true
    })
  },

  hideLoading: function () {
    this.setData({
      isShow: false
    })
  }

})