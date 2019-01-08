// pages/custom-modal-page/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: false
  },

  showModal: function () {
    this.setData({
      isShow: true
    })
  },

  cancelOrder: function () {
    // todo something
    this.setData({
      isShow: false
    })
  },

  hideModal: function () {
    // todo something
    this.setData({
      isShow: false
    })
  }
})