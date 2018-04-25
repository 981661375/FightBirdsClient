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
      
    },

    // LIFE-CYCLE CALLBACKS:

	ContinueButtonClick:function(data){
		
		this.global = cc.find("Canvas").getComponent("globalJS");
		this.global.score=0;
		this.global.bulletsNumber=1;//参数复位
		
		cc.find("Canvas/RootComponent").active=true;
		cc.find("Canvas/Menu").active=false;
		cc.director.loadScene("FirstLevel");
	},
	
	QuitButtonClick:function(data){
		cc.game.end();
	},
	
    // onLoad () {},

    start () {

    },

    // update (dt) {},
});
