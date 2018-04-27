var globalData = require('globalData');
cc.Class({
    extends: cc.Component,

    properties: {
        leftBullet:{
            default:null,
            type:cc.Node
        },
        rightBullet:{
            default:null,
            type:cc.Node
        },
        lefthead:{
            default:null,
            type:cc.Node
        },
        righthead:{
            default:null,
            type:cc.Node
        },
        leftPlayerName:{
            default:null,
            type:cc.Node
        },
        rightPlayerName:{
            default:null,
            type:cc.Node
        },
        leftbulletpicture:{
            default:null,
            type:cc.Node
        },
        rightbulletpicture:{
            default:null,
            type:cc.Node
        },

    },
    onLoad () {
		this.scoreLeft=0,   //记录得分
         this.scoreRight = 0,//记录对方得分
		this.bulletsNumber=1 //子弹剩余数量

        if(globalData.seat==='right'){
            this.leftBullet.setPosition(cc.view.getFrameSize().width*0.5,0);
            this.rightBullet.setPosition(0,0);
            globalData.X_LeftBound=-cc.view.getFrameSize().width*0.5;
            globalData.X_RightBount=cc.view.getFrameSize().width*0.5;

            var self = this;
            cc.loader.load({url: globalData.selfInfo.picture, type: 'jpg'}, function (err, texture) {
                var frame = new cc.SpriteFrame(texture);
                self.righthead.getComponent(cc.Sprite).spriteFrame = frame;
            });
            this.rightPlayerName.getComponent(cc.Label).string=globalData.selfInfo.name;
            cc.loader.load({url: globalData.rivalInfo.picture, type: 'jpg'}, function (err, texture) {
                var frame = new cc.SpriteFrame(texture);
                self.lefthead.getComponent(cc.Sprite).spriteFrame = frame;
            });
            this.leftPlayerName.getComponent(cc.Label).string=globalData.rivalInfo.name;


            cc.loader.load({url: globalData.selfInfo.picture, type: 'jpg'}, function (err, texture) {
                var frame = new cc.SpriteFrame(texture);
                self.rightbulletpicture.getComponent(cc.Sprite).spriteFrame = frame;
            });
            cc.loader.load({url: globalData.rivalInfo.picture, type: 'jpg'}, function (err, texture) {
                var frame = new cc.SpriteFrame(texture);
                self.leftbulletpicture.getComponent(cc.Sprite).spriteFrame = frame;
            });





        }else {
            globalData.X_LeftBound=-20;
            globalData.X_RightBount=cc.view.getFrameSize().width+20;

            var self = this;
            cc.loader.load({url: globalData.selfInfo.picture, type: 'jpg'}, function (err, texture) {
                var frame = new cc.SpriteFrame(texture);
                self.lefthead.getComponent(cc.Sprite).spriteFrame = frame;
            });

            cc.loader.load({url: globalData.selfInfo.picture, type: 'jpg'}, function (err, texture) {
                var frame = new cc.SpriteFrame(texture);
                self.rightbulletpicture.getComponent(cc.Sprite).spriteFrame = frame;
            });
            this.leftPlayerName.getComponent(cc.Label).string=globalData.selfInfo.name;
                globalData.socket.on('showRivalInfo',(data)=>{
                    console.log("showRivalInfo");
                    cc.loader.load({url: globalData.rivalInfo.picture, type: 'jpg'}, function (err, texture) {
                        var frame = new cc.SpriteFrame(texture);
                        self.righthead.getComponent(cc.Sprite).spriteFrame = frame;

                    });

                    self.rightPlayerName.getComponent(cc.Label).string=globalData.rivalInfo.name;

                    cc.loader.load({url: globalData.rivalInfo.picture, type: 'jpg'}, function (err, texture) {
                        var frame = new cc.SpriteFrame(texture);
                        self.leftbulletpicture.getComponent(cc.Sprite).spriteFrame = frame;
                    });
                });
            }

	},
	

    start () {

    },

    // update (dt) {},
});
