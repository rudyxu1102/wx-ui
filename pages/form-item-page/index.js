// pages/form-item-page/index.js
let globalData = getApp().globalData;

Page({

    /**
     * 页面的初始数据
     */
    data: {
        options: ['hello world', 'hello wechat'],
        resDomain: globalData.resDomain,
        resVersion: globalData.resVersion,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let type = options.type;
        this.setData({
            type: type
        })
    },

    changeInput: function (e) {
        console.log(e.detail.value, e.target.dataset.key)
    },

    changeSwitch: function (e) {
        console.log(e.detail.value, e.target.dataset.key)
    },
    changeCounter: function (e) {
        console.log(e.detail.value, e.target.dataset.key)        
    },
    addOption: function () {
        let length = this.data.options.length;
        this.setData({
            [`options[${length}]`]: ''
        })
    },
    delOption: function (e) {
        let index = parseInt(e.target.dataset.index);
        let arr = this.data.options.slice();
        arr.splice(index, 1);
        this.setData({
            options: arr
        })
    }
})