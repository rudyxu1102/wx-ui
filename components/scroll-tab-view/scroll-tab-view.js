// components/scrollTabView/scrollTabView.js
let app = getApp();
let globalData = getApp().globalData;

Component({
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    /**
     * 组件的属性列表
     */
    properties: {
        firstTab: {
            type: Array
        },
        firstTabTitle: {
            type: String
        },
        secondTab: {
            type: Array
        },
        secondTabTitle: {
            type: String
        },
    },

    /**
     * 组件的初始数据
     */
    data: {
        winHeight: "",                      // 窗口高度
        firstTabIndex: 0,                   // 一级分类的当前tab的index
        secondTabIndex: 0,                  // 二级分类的当前tab的index
        scrollLeft: 0,                      // 一级tab标题的滚动条位置
        isShowPanel: false,                 // 显示二级面板，
        pageStateList: [{                   // 记录每个页面的状态。
            firstTabIndex: 0,                     // 某一页面的一级分类tab的index
            secondTabIndex: 0,                    // 某一页面的二级分类tab的index
            firstTabObj: {},                      // 某一页面的一级分类tab的当前状态，为firstTab数组的元素
            secondTabObj: {},                     // 某一页面的二级分类tab的当前状态，为secondTab数组的元素
            scrollPage: 0,                  // 当前页面的处于滚动的加载的页数（从0开始）
        }],
        resDomain: globalData.resDomain + 'image/wcdWxApp/',
        isScroll: true                       // iphoneX不能滚动的bug
    },
    attached: function () {
        var that = this;
        //  高度自适应
        wx.getSystemInfo({
            success: function (res) {
                var clientHeight = res.windowHeight,
                    clientWidth = res.windowWidth,
                    rpxR = 750 / clientWidth;
                var calc = clientHeight * rpxR - 99;
                that.pxPerRpx = res.windowWidth / 750;
                that.setData({
                    winHeight: calc
                });
            }
        });
    },
    /**
     * 组件的方法列表
     */
    methods: {
        // 打开二级面板
        showPanel: function () {
            this.setData({
                isScroll: !this.data.isScroll,
                isShowPanel: !this.data.isShowPanel
            });
        },

        // 隐藏二级面板
        hidePanel: function () {
            this.setData({
                isShowPanel: false,
                isScroll: true
            });
        },

        // 水平切换页面的时候，切换一级分类的tab
        switchTab: function (e) {
            this.setData({
                firstTabIndex: e.detail.current
            });

            let isReload = this.judgeReload(e.detail.current, this.data.secondTabIndex);
            this.fetchData(e.detail.current, this.data.secondTabIndex, 0, isReload);
            this.checkTabPos();
        },

        // 点击顶部的一级分类
        clickNav: function (e) {
            var cur = e.target.dataset.current;
            if (this.data.firstTabIndex === cur) {
                return false;
            } else {
                this.hidePanel();
                this.setData({
                    firstTabIndex: cur
                });
                this.checkTabPos();
            }
        },

        // 点击隐藏折叠面板的一级分类tab
        clickPanelFirstTab: function (e) {
            var cur = e.target.dataset.current;
            if (this.data.firstTabIndex == cur) {
                return false
            } else {
                this.setData({
                    firstTabIndex: cur
                });
            }
        },

        // 点击隐藏折叠面板的二级分类tab
        clickPanelSecondTab: function (e) {
            var cur = e.target.dataset.current;
            if (this.data.secondTabIndex == cur) {
                return false
            } else {
                this.setData({
                    secondTabIndex: cur
                });
                let isReload = this.judgeReload(this.data.firstTabIndex, cur);
                this.fetchData(this.data.firstTabIndex, cur, 0, isReload)
            }
        },

        // 检查tab滚动的位置，使active的tab处于中间.160为最大的宽度
        checkTabPos: function () {
            let left = (this.data.firstTabIndex + 1) % 3;
            let cycle = Math.floor((this.data.firstTabIndex + 1) / 3);
            let distance = 160 * left;
            if (cycle > 0) {
                distance = 160 * (left + ((cycle - 1) * 3));
            }
            if (cycle > 0) {
                this.setData({
                    scrollLeft: distance * this.pxPerRpx
                });
            } else {
                this.setData({
                    scrollLeft: 0
                });
            }
        },

        /**
        * 记录页面的状态，方便判断是否需要重载
        * @param {number} firstTabIndex 一级分类tab的index，同时也是当前页面的index
        * @param {number} secondTabIndex 二级分类tab的index
        * @param {number} scrollPage 当前滚动加载的页数
        */
        changePageStateList: function (firstTabIndex, secondTabIndex, scrollPage) {
            let obj = {
                firstTabIndex: firstTabIndex,
                secondTabIndex: secondTabIndex,
                firstTabObj: this.data.firstTab[firstTabIndex],
                secondTabObj: this.data.secondTab[secondTabIndex],
                scrollPage: scrollPage
            };
            let pageIndex = firstTabIndex;
            this.data.pageStateList[pageIndex] = obj;
        },

        /**
        * 与存储pageStateList的旧数据比较，判断是否需要重新加载数据
        * @param {number} newFirstTabIndex 当前页面最新的一级分类tab的index
        * @param {number} newSecondTabIndex 当前页面最新的二级分类的tab的index
        * @return {boolean} 是否需要重新获取数据
        */
        judgeReload: function (newFirstTabIndex, newSecondTabIndex) {
            // 第一次获取数据必须加载
            if (!this.data.pageStateList[newFirstTabIndex]) {
                return true
            }
            // 只有一级分类或者只有二级分类，只用加载第一次，不用判断重载
            if (!this.data.firstTab || !this.data.secondTab) {
                return false
            }
            let pageIndex = newFirstTabIndex;
            let tabData = this.data.pageStateList[pageIndex];
            let oldFirstTabIndex = tabData.firstTabIndex;
            let oldSecondTabIndex = tabData.secondTabIndex;

            if (oldFirstTabIndex !== newFirstTabIndex || oldSecondTabIndex !== newSecondTabIndex) {
                return true
            } else {
                return false
            }
        },

        // 滚动到底部 
        scrollToBottom: function () {
            let tabState = this.data.pageStateList[this.data.firstTabIndex];
            let nextPage = tabState.scrollPage + 1;
            this.fetchData(this.data.firstTabIndex, this.data.secondTabIndex, nextPage, false);
        },

        /**
        * 触发事件，获取数据
        * @param {number} firstTabIndex 一级分类tab的index
        * @param {number} secondTabIndex 二级分类tab的index
        * @param {number} scrollPage 当前滚动加载的页数
        * @param {boolean} isReload 是否需要重新获取数据
        */
        fetchData: function (firstTabIndex, secondTabIndex, scrollPage, isReload) {
            if (this.data.firstTab && this.data.secondTab) {                // 同时有一级分类和二级分类
                let firstTabObj = this.data.firstTab[firstTabIndex];
                let secondTabObj = this.data.secondTab[secondTabIndex];
                this.triggerEvent("switchEvent", {
                    firstTabIndex: firstTabIndex,
                    secondTabIndex: secondTabIndex,
                    firstTabObj: firstTabObj,
                    secondTabObj: secondTabObj,
                    scrollPage: scrollPage,
                    isReLoad: isReload
                });
            } else if (this.data.firstTab && !this.data.secondTab) {              // 只有一级分类
                let firstTabObj = this.data.firstTab[firstTabIndex];
                this.triggerEvent("switchEvent", {
                    firstTabIndex: firstTabIndex,                    
                    secondTabIndex: secondTabIndex,                    
                    firstTabObj: firstTabObj,
                    secondTabObj: null,
                    scrollPage: scrollPage,
                    isReLoad: isReload
                });
            }
        }
    }
})