// components/ slideTab/ slideTab.js
Component({
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    /**
     * 组件的属性列表
     */
    properties: {
        // 顶部的tab
        tabs: {
            type: Array
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        currentTab: 0
    },

    attached: function () {
        var that = this;
        //  高度自适应
        wx.getSystemInfo({
            success: function (res) {
                var clientHeight = res.windowHeight,
                    clientWidth = res.windowWidth,
                    rpxR = 750 / clientWidth;
                var calc = clientHeight * rpxR;
                that.pxPerRpx = res.windowWidth / 750;
                that.setData({
                    winHeight: Math.ceil(calc)
                });
            }
        });
    },

    /**
     * 组件的方法列表
     */
    methods: {
        selectTab: function (e) {
            let index = e.target.dataset.index;
            this.setData({
                currentTab: index
            });
        },
        switchTab: function (e) {
            this.setData({
                currentTab: e.detail.current
            });
        }
    }
})
