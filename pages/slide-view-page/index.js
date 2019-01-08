// pages/slide-view-page/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isClose: false,
    list: [{
      content: 'hello world',
    }, {
      content: 'hello everyone',
    }, {
      content: 'hello faisco',
    }, {
      content: 'hello wcd',
    }, {
      content: 'hello wechat',
    }]
  },

  selectItem: function (e) {
    let index = e.target.dataset.index;
    this.setData({
      currentItem: index
    })
  },

  deleteItem: function (e) {
    let index = e.target.dataset.index;
    let arr = this.data.list.slice();
    arr.splice(index, 1);
    this.setData({
      list: arr
    })
    console.log('delete item-' + index);
  }
 
})