// pages/footer-loading-oage/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: false,
    isToBottom: false
  },
  showLoading: function () {
    this.setData({  
      isShow: true,
      isToBottom: false
    })
  },
  toBottom: function () {
    this.setData({
      isShow: false,
      isToBottom: true
    })
  }
 
})