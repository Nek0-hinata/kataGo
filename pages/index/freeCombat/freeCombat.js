
Page({
    data: {
        x: 0,
        y: 0,
        vis: [],
        vec: [
            [0, 1],
            [1, 0],
            [0, -1],
            [-1, 0]
        ]
    },
    onLoad: function (options) {
        this.init();
    },
    init() {
        for (let i = 0; i < 15; i++){
            for (let j = 0; j < 15; j++){
                this.setData({
                    [`vis[${i*15+j}]`]: 0
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
                canvas.weight = res[0].weight * dpr;
                ctx.scale(dpr, dpr);
                let img = canvas.createImage();
                img.src = "/img/background.png";
                img.onload = function () {
                    ctx.drawImage(img, 10, 10, 150, 225);
                    for (let i = 0; i <= 15; i++) {
                        ctx.moveTo(10 + i * 10, 10);
                        ctx.lineTo(10 + i * 10, 235);
                        ctx.stroke();
                        ctx.moveTo(10, 10 + i * 15);
                        ctx.lineTo(160, 10 + i * 15);
                        ctx.stroke();
                    }
                }
                // ctx.fillRect(10,160,10,160);
            })
    },
    start(e) {
        this.setData({
            x: e.touches[0].x,
            y: e.touches[0].y
        });

    },
    oneStep() {
        
    }
});