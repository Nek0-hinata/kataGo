Page({
    data: {
        first: true,
        time: false,
        show: false,
        show1: false,
        show2: false,
        destination: null,
        firstName: '猜先',
        timeName: '不计时',
        minName: '10分钟',
        min: 10,
        secName: '10秒',
        sec: 10,
        finName: '3次',
        fin: 3,
        actions1: [
            {
                name: '猜先',
            },
            {
                name: '黑先',
            },
            {
                name: '白先',
            },
        ],
        actions2: [
            {
                name: '计时'
            },
            {
                name: '不计时'
            }
        ],
        actions3: [
            {
                name: '0分钟'
            },
            {
                name: '10分钟'
            },
            {
                name: '20分钟'
            },
            {
                name: '30分钟'
            },
            {
                name: '40分钟'
            },
            {
                name: '60分钟'
            },
            {
                name: '120分钟'
            }
        ],
        actions4: [
            {
                name: '10秒'
            },
            {
                name: '20秒'
            },
            {
                name: '30秒'
            },
            {
                name: '40秒'
            },
            {
                name: '60秒'
            },
            {
                name: '120秒'
            }
        ],
        actions5: [
            {
                name: '1次'
            },
            {
                name: '3次'
            },
            {
                name: '5次'
            },
            {
                name: '10次'
            }
        ]
    },
    onLoad: function (options) {
        let eventChannel = this.getOpenerEventChannel();
        eventChannel.on('transfer', (data) => {
            console.log(data);
            this.setData({
                destination: data.destination
            })
        })
    },
    show() {
        this.setData({
            show: true
        })
    },
    show1() {
        this.setData({
            show1: true
        })
    },
    show2() {
        this.setData({
            show2: true
        })
    },
    show3() {
        this.setData({
            show3: true
        })
    },
    show4() {
        this.setData({
            show4: true
        })
    },
    close() {
        this.setData({
            show: false
        })
    },
    close1() {
        this.setData({
            show1: false
        })
    },
    close2() {
        this.setData({
            show2: false
        })
    },
    close3() {
        this.setData({
            show3: false
        })
    },
    close4() {
        this.setData({
            show4: false
        })
    },
    first(e) {
        this.setData({
            first: true,
            show: false,
            firstName: e.detail.name
        })
    },
    times(e) {
        if (e.detail.name == '计时'){
            this.setData({
                show1: false,
                timeName: e.detail.name,
                time: true
            })
        } else {
            this.setData({
                show1: false,
                timeName: e.detail.name,
                time: false
            })
        }
    },
    mins(e) {
        this.setData({
            min: parseInt(e.detail.name),
            minName: e.detail.name,
            show2:false
        })
    },
    secs(e) {
        this.setData({
            sec: parseInt(e.detail.name),
            secName: e.detail.name,
            show3:false
        })
    },
    fin(e) {
        this.setData({
            fin: parseInt(e.detail.name),
            finName: e.detail.name,
            show4:false
        })
    },
    submit() {
        const that = this;
        console.log(`pages/index${this.data.destination}`);
        wx.navigateTo({
            url: `/pages/index${that.data.destination}`,
            success(res) {
                let d = 0;
                if(that.data.time){
                    d = {
                        min: that.data.min,
                        sec: that.data.sec,
                        fin: that.data.fin
                    }
                }
                res.eventChannel.emit('transferTo', {
                    data: {
                        first: that.data.first,
                        time: that.data.time,
                        detail: d
                    }
                })
            }
        })
    }
});