Component({
    data: {
        active: 0,
        list: [
            {
                url: '/pages/index/index',
                text: '首页',
                icon: 'send-gift',
            },
            {
                url: '/pages/course/course',
                text: '课程',
                icon: 'column'
            },
            {
                url: '/pages/shop/shop',
                text: '商城',
                icon: 'cart'
            },
            {
                url: '/pages/user/user',
                text: '用户',
                icon: 'friends'
            }
        ]
    },
    methods: {
        onChange: function (event) {
            this.setData({
                active: event.detail
            });
            wx.switchTab({
                url: this.data.list[event.detail].url
            });
        },
        init: function() {
            const page = getCurrentPages().pop()
            this.setData({
                active: this.data.list.findIndex(item => item.url === `/${page.route}`)
            })
        },
    },
});
