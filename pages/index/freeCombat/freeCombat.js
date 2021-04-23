
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
                    ctx.arc(60,60, 3, 0, 2*Math.PI);
                    ctx.closePath();
                    ctx.fill();
                    ctx.beginPath();
                    ctx.arc(12*20,3*20, 3, 0, 2*Math.PI);
                    ctx.closePath();
                    ctx.fill();
                    ctx.beginPath();
                    ctx.arc(3*20,12*20, 3, 0, 2*Math.PI);
                    ctx.closePath();
                    ctx.fill();
                    ctx.beginPath();
                    ctx.arc(12*20,12*20, 3, 0, 2*Math.PI);
                    ctx.closePath();
                    ctx.fill();
                }
                // ctx.fillRect(10,160,10,160);
            })
    },
    start(e) {
        this.setData({
            x: (e.touches[0].x)/20,
            y: (e.touches[0].y)/20
        });

    },
    oneStep() {
        
    }
});