// components/listItem/list-item.js
let globalData = getApp().globalData;

Component({
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    /**
     * 组件的属性列表
     */
    properties: {
        // item的高度
        height: {
            type: String,
            value: '110rpx'
        },
        // 是否有下边框（不占item高度）
        hasBottomBorder: {
            type: Boolean,
            value: false
        },
        // 左边的文字描述
        tabName: {
            type: String
        },
        // 开关是否打开
        switchCheck: {
            type: Boolean,
            value: true
        },
        // item的marginTop
        marginTop: {
            type: String,
            value: '0rpx'
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        resDomain: globalData.resDomain,
        resVersion: globalData.resVersion
    },

    /**
     * 组件的方法列表
     */
    methods: {
        switchChange: function (e) {
            this.setData({
                switchCheck: e.detail.value
            })
            this.triggerEvent('switchChange', {
                value: e.detail.value                
            })
        },

        clickTab: function () {
            let value = !this.data.switchCheck;
            this.setData({
                switchCheck: !this.data.switchCheck
            })
            this.triggerEvent('switchChange', {
                value: value
            })
        }
    }
})
