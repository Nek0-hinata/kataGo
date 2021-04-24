const Auth = require('../../utils/netTools');
Page({
    data: {
        money: 0,
        version: 0
    },
    onLoad: function (options) {
        this.setData({
            version: getApp().globalData.version
        })
    },
    onShow() {
        const that = this;
        this.getTabBar().init();
        Auth.request({
            url: '/money',
            data: 0,
            method: 'GET',
        })
            .then((res) => {
                that.setData({
                    money: res.data.money
                })
            })
            .catch((res) => {
                wx.showToast({
                    title: '获取余额失败',
                    icon: 'error',
                    duration: 1000
                })
            })
    }
});