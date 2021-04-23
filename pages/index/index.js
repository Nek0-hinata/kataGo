Page({
    data: {
        swiperCurrent: 0,
        imgUrls: [
            '/img/01.jpg',
            '/img/02.jpg',
            '/img/03.jpg'
        ]
    },
    onLoad: function (options) {

    },
    onShow() {
        this.getTabBar().init();
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