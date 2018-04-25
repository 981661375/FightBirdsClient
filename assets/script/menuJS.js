// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
      Score:{
		  default:null,
		  type:cc.Node
	  },
	  ContinueButton:{
		  default:null,
		  type:cc.Node
	  },
	  QuitButton:{
		  default:null,
		  type:cc.Node
	  },
	  
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
		
	},
	onEnable(){
		this.global = cc.find("Canvas").getComponent("globalJS");
		this.scoreLabel = this.Score.getComponent(cc.Label);
		this.scoreLabel.string=this.global.score;
	},

    start () {
		
    },

    // update (dt) {},
});
