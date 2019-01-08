// components/footerOption/footerOption.js
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
        closeModal: function () {
            this.setData({
                isShow: false
            })
        }
    }
})
