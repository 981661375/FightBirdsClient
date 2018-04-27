
cc.Class({
    extends: cc.Component,

    properties: {
	   Score:{
		default:null,
		type:cc.Node
	   },

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
		this.global = cc.find("Canvas").getComponent("levelDataJS");
		this.scoreLabel = this.Score.getComponent(cc.Label);
		this.scoreLabel.string=this.global.scoreLeft;
		
		//this.bulletLabel = this.Bullet.getComponent(cc.Label);
		//this.bulletLabel.string=this.global.bulletsNumber;
	},

    start () {

    },

    update (dt) {
		this.scoreLabel.string=this.global.score;
		//this.bulletLabel.string=this.global.bulletsNumber;
		
	},
});
