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
        // item的marginTop
        marginTop: {
            type: String,
            value: '0rpx'
        },
        
        placeholder: {
            type: String,
            value: ''
        },

        value: {
            type: String
        },
        // 是否上拉页面
        adjustPos: {
            type: Boolean,
            value: false
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        resDomain: globalData.resDomain,
        resVersion: globalData.resVersion,
        focusInput: false
    },

    /**
     * 组件的方法列表
     */
    methods: {
        changeInput: function (e) {
            let value = e.detail.value;
            this.triggerEvent('inputChange', {
                value: value
            }) 
        },

        clickTab: function () {
            this.setData({
                focusInput: true
            })
        }

    }
})
