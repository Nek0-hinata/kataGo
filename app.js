// app.js
const Auth = require('/utils/netTools');
App({
    onLaunch() {
        const that = this;
        Auth.request({
            url: '/isFirst',
            method: 'GET',
            data: 'hello'
        })
            .then((res) => {
                that.globalData.first = res.data.isFirst;
            })
            .catch((res) => {
                console.log(res);
            })
        Auth.request({
            url: 'version',
            method: 'GET',
            data: 'hello'
        })
            .then((res) => {
                that.globalData.version = res.data.version;
            })
            .catch((res) => {

            })
    },
    globalData: {
        host: '',
        first: true,
        version: '2.0.1'
    }
})
