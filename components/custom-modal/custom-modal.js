// components/customModal/customModal.js
Component({
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    /**
     * 组件的属性列表
     */
    properties: {
        isShow: {
            type: Boolean,
            value: false
        },
        padding: {
            type: String,
            value: '0rpx'
        },
        footerStyle: {
            type: String,
            value: ''
        },
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        // 隐藏弹框
        hideModal () {
            this.setData({
                isShow: false
            })
        },
        // 展示弹框
        showModal () {
            this.setData({
                isShow: true
            })
        },
        cancelCabk () {
            // 触发取消回调
            this.triggerEvent("cancelEvent");
        },
        confirmCabk () {
            // 触发成功回调
            this.triggerEvent("confirmEvent");
        }
    }
})
