// components/slideView/slideView.js
let thorttle = require("../../utils/util.js").thorttle;
Component({
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    /**
     * 组件的属性列表
     */
    properties: {
        // 右滑的隐藏选项按钮的总宽度
        optionWidth: {
            type: String,
            value: '110rpx'
        },

        // 是否隐藏关闭右侧的选项
        isClose: {
            type: Boolean,
            value: false,
            observer: function (n, o) {
                if (n === true) {
                    this.setData({
                        translateX: '0px'
                    })
                }
            }
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        translateX: '0px',
        canSlideLeft: true
    },

    attached: function () {
        var that = this;
        //  高度自适应
        wx.getSystemInfo({
            success: function (res) {
                that.pxPerRpx = res.windowWidth / 750;
            }
        });
    },

    /**
     * 组件的方法列表
     */
    methods: {

        // touchStart事件
        touchEleStart: function (e) {
            if (e.touches.length == 1) {
                this.triggerEvent("clickEvent");                                                                                                
                this.setData({
                    //设置触摸水平方向起始位置
                    startX: e.touches[0].clientX
                });
            }
        },

        // touchMove事件
        touchEleMove: function (e) {
            if (e.touches.length == 1 && this.data.canSlideLeft) {
                //手指移动时即时位置
                let moveX = e.touches[0].clientX;
                //手指起始点位置与移动期间的差值
                let disX = this.data.startX - moveX;
                let optionWidth = parseInt(/\d+/.exec(this.data.optionWidth)[0]) * this.pxPerRpx;
                if (disX == 0 || disX < 0) {//如果移动距离小于等于0，文本层位置不变

                } else if (disX > 0) {//移动距离大于0，文本层left值等于手指移动距离
                    this.setData({
                        translateX: -disX + 'px'
                    })
                    if (disX >= optionWidth) {
                        //控制手指移动距离最大值为删除按钮的宽度
                        this.setData({
                            translateX: '-' + optionWidth + 'px',
                            canSlideLeft: false                            
                        })
                    }
                }
            }
        },

        // touchEnd事件
        touchEleEnd: function (e) {
            if (e.changedTouches.length == 1) {
                //手指移动结束后水平位置
                let endX = e.changedTouches[0].clientX;
                //触摸开始与结束，手指移动的距离
                let disX = this.data.startX - endX;
                let optionWidth = parseInt(/\d+/.exec(this.data.optionWidth)[0]) * this.pxPerRpx;

                //如果距离小于删除按钮的1/6，不显示删除按钮
                if (disX > optionWidth / 6) {
                    this.setData({
                        translateX: '-' + optionWidth + 'px',
                        canSlideLeft: false
                    })                                                                                             
                } else {
                    this.setData({
                        translateX: '0px',
                        canSlideLeft: true                        
                    })
                }
            }
        }
    }
})
