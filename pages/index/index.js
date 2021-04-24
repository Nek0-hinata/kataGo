const  Auth = require('../../utils/netTools')
Page({
    data: {
        swiperCurrent: 0,
        imgUrls: [
            '/img/01.jpg',
            '/img/02.jpg',
            '/img/03.jpg'
        ],
        isFirst: false,
        recommend: [
            {
                blackName: "唐韦星",
                blackLoc: "中国",
                blackImg: "/img/tangweixin.jpg",
                whiteName: "丁浩",
                whiteLoc: "中国",
                whiteImg: "/img/dinhao.jpg",
                times: 208,
                rules: '白中盘胜',
                info: "第17届倡棋杯8强赛"
            },
            {
                blackName: "杨鼎新",
                blackLoc: "中国",
                blackImg: "/img/tangweixin.jpg",
                whiteName: "党毅飞",
                whiteLoc: "中国",
                whiteImg: "/img/dinhao.jpg",
                times: 289,
                rules: '黑1点胜',
                info: "第17届倡棋杯16强赛"
            },{
                blackName: "杨鼎新",
                blackLoc: "中国",
                blackImg: "/img/tangweixin.jpg",
                whiteName: "党毅飞",
                whiteLoc: "中国",
                whiteImg: "/img/dinhao.jpg",
                times: 289,
                rules: '黑1点胜',
                info: "第17届倡棋杯32强赛"
            }
        ]

    },
    onLoad: function (options) {
        // this.data.isFirst = getApp().globalData.isFirst;
    },
    onShow() {
        this.getTabBar().init();
        console.log(this.data.recommend.length);
    },
    onReady() {
    },
    onClose() {
        this.setData({
            isFirst: false
        })
    },
    onReachBottom() {
        const that = this;
        console.log('触底');
        Auth.request({
            url: '/reFresh',
            data: 0,
            method: 'GET'
        }, false)
            .then((res) => {   //res.data里返回数组数据
                that.setData({
                    recommend: that.data.recommend.concat(res.data)
                })
            })
            .catch();
    },
    click2() {
        wx.navigateTo({
            url: '/pages/index/transfer/transfer',
            success(res) {
                res.eventChannel.emit('transfer', {
                    destination: '/freeCombat/freeCombat'
                })
            }
        })
    }
});