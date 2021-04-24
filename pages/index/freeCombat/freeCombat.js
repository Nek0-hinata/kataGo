Page({
    data: {
        x: 0,
        y: 0,
        vis: null,
        vec: [
            [
                [1, 0],
                [-1, 0]
            ],
            [
                [0, 1],
                [0, -1]
            ],
            [
                [1, 1],
                [-1, -1]
            ],
            [
                [1, -1],
                [-1, 1]
            ]
        ],
        black: false
    },
    onLoad: function (options) {
        let eventChanel = this.getOpenerEventChannel();
        eventChanel.on('transferTo', (data) => {
            console.log(data);
        })
        this.init();
    },
    init() {
        for (let i = 0; i <= 15; i++) {
            for (let j = 0; j <= 15; j++) {
                this.setData({
                    [`vis[${i}][${j}]`]: -1
                });
            }
        }
    },
    onReady() {
        wx.createSelectorQuery()
            .select('#myCanvas')
            .fields({
                size: true,
                node: true
            })
            .exec((res) => {
                const canvas = res[0].node;
                const ctx = canvas.getContext('2d');
                const dpr = wx.getSystemInfoSync().pixelRatio;
                canvas.height = res[0].height * dpr;
                // canvas.weight = res[0].weight * dpr;
                canvas.width = res[0].width * dpr;
                ctx.scale(dpr, dpr);
                let img = canvas.createImage();
                img.src = "/img/background.png";
                img.onload = function () {
                    ctx.drawImage(img, 0, 0, 300, 300);
                    for (let i = 0; i <= 15; i++) {
                        ctx.moveTo(i * 20, 0);
                        ctx.lineTo(i * 20, 300);
                        ctx.stroke();
                        ctx.moveTo(0, i * 20);
                        ctx.lineTo(300, i * 20);
                        ctx.stroke();
                    }
                    ctx.beginPath();
                    ctx.arc(60, 60, 3, 0, 2 * Math.PI);
                    ctx.closePath();
                    ctx.fill();
                    ctx.beginPath();
                    ctx.arc(12 * 20, 3 * 20, 3, 0, 2 * Math.PI);
                    ctx.closePath();
                    ctx.fill();
                    ctx.beginPath();
                    ctx.arc(3 * 20, 12 * 20, 3, 0, 2 * Math.PI);
                    ctx.closePath();
                    ctx.fill();
                    ctx.beginPath();
                    ctx.arc(12 * 20, 12 * 20, 3, 0, 2 * Math.PI);
                    ctx.closePath();
                    ctx.fill();
                }
                // ctx.fillRect(10,160,10,160);
            })
    },
    start(e) {
        this.setData({
            x: Math.round((e.touches[0].x) / 20),
            y: Math.round((e.touches[0].y) / 20)
        });
        this.drawPiece()
            .then((res) => {
                if (this.ifWin()){
                    let msg;
                    if (this.data.black){
                        msg = '黑方'
                    } else {
                        msg = '白方'
                    }
                    wx.showModal({
                        title: '赢了!',
                        content: `${msg}获胜`,
                        showCancel: false,
                        success(res) {
                            if(res.confirm){
                                wx.navigateBack({
                                    delta: 10
                                });
                            }
                        }
                    })
                }
            })
    },
    ifWin() {
        let x = this.data.x;
        let y = this.data.y;
        let z = 0;
        for (let i = 0; i < 4; i++) {
            if(this.count(i, z) === 5){
                return true;
            }
        }
        return false;
    },
    count(n, i) {
        let dx = this.data.x;
        let dy = this.data.y;
        let count = 1, max = 1;
        while (dx >= 0 && dx <= 15 && dy >= 0 && dx <= 15 && i < 2) {
            dx += this.data.vec[n][i][0];
            dy += this.data.vec[n][i][1];
            if ((this.data.vis[dx][dy] == this.data.black) && this.data.vis[dx][dy] != -1) {
                count++;
                if(max < count){
                    max = count;
                }
            } else {
                i++;
                dx = this.data.x;
                dy = this.data.y;
            }
        }
        return max;
    },
    drawPiece() {
        const that = this;
        let x = this.data.x;
        let y = this.data.y;
        return new Promise((resolve, reject) => {
            wx.createSelectorQuery()
                .select("#myCanvas")
                .fields({
                    node: true,
                })
                .exec((res) => {
                    const canvas = res[0].node;
                    const ctx = canvas.getContext('2d');
                    ctx.beginPath();
                    ctx.arc(x * 20, y * 20, 10, 0, 2 * Math.PI);
                    ctx.closePath();
                    if (that.data.vis[x][y] === -1) {
                        if (!that.data.black) {
                            ctx.fillStyle = "black"
                            ctx.fill();
                            that.setData({
                                black: true,
                                [`vis[${x}][${y}]`]: 1
                            })
                        } else {
                            ctx.fillStyle = "white";
                            ctx.fill();
                            that.setData({
                                black: false,
                                [`vis[${x}][${y}]`]: 0
                            })
                        }
                        resolve(res);
                    }
                })
        })

    }
});