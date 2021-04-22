let token = wx.getStorageSync('token');
const that = this;
const app = getApp();
const Auth = {};

function getToken() {
    return new Promise((resolve, reject) => {
        token = wx.getStorageSync('token');
        if (!token) {
            login()
                .then((res1) => {
                    resolve(res1.header.token);
                })
                .catch((res) => {
                    reject(res);
                });
        } else {
            resolve(token);
        }
    });
}

function login() {
    return new Promise((resolve, reject) => {
        wx.login({
            success(res) {
                console.log(res.code)
                if (res.code) {
                    Auth.request({
                        url: '/login',
                        data: {
                            code: res.code
                        },
                        method: 'POST'
                    }, false)
                        .then((res2) => {
                            console.log(res2)
                            if (res2.header.token) {
                                wx.setStorageSync('token', res2.header.token);
                                resolve(res2);
                            } else {
                                reject({
                                    msg: '远端请求失败',
                                    detail: res2
                                });
                            }
                        })
                        .catch((error) => {
                            reject(error);
                        })
                } else {
                    reject({
                        msg: '获取Token失败',
                        detail: res
                    })
                }
            },
            fail: (err) => {
                reject({
                    msg: '获取登录授权失败',
                    err: err
                });
            }
        })
    })
}

function isHttpSuccess(status) {
    return status >= 200 && status < 300 || status === 304 || status === 401;
}

function request(options = {}, token = 0) {   //options中封装url, data, method。 返回从后端请求得到的数据
    return new Promise((resolve, reject) => {
        let header;
        if (!token) {
            header = {
                'content-type': 'application/json',
            }
        } else {
            header = {
                'content-type': 'application/json',
                'token': token
            }
        }
        wx.request({
            url: `${getApp().globalData.host}${options.url}`,
            method: options.method,
            data: options.method === 'GET' ? options.data : JSON.stringify(options.data),
            header: header,
            success(res) {
                if (isHttpSuccess(res.statusCode)) {
                    resolve(res);
                } else {
                    reject({
                        msg: `网络错误:${res.statusCode}`,
                        detail: res,
                        statusCode: res.statusCode
                    });
                }
            },
            fail(error) {
                reject({
                    detail: error,
                    msg: '请求失败',
                    statusCode: 503
                });
            }
        })
    })
}

Auth.request = function (options = {}, needToken = true) {  //needToken为是否为登录态请求
    if (needToken) {
        return new Promise((resolve, reject) => {
            getToken()
                .then((res1) => {
                    request(options, res1)
                        .then((res2) => {
                            if (res2.statusCode === 401) {       //身份过期
                                getToken()
                                    .then((res3) => {
                                        request(options, res3)
                                            .then((res4) => resolve(res4))      //成功就返回数据
                                            .catch((res4) => {
                                                reject(res4);      //返回错误信息msg， 错误数据detail, 错误状态码
                                            })
                                    })
                                    .catch((res3 => {
                                        reject(res3)
                                    }))
                            } else {
                                resolve(res2);
                            }
                        })
                        .catch((res2) => {
                            reject(res2);
                        });
                })
                .catch((res1) => {
                    reject(res1);
                });
        });
    } else {
        return request(options);
    }
}

module.exports = Auth;