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
    }
});