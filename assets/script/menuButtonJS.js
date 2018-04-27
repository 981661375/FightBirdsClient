var globalData = require('globalData');

cc.Class({
    extends: cc.Component,

    properties: {
      
    },

    // LIFE-CYCLE CALLBACKS:

	ContinueButtonClick:function(data){
       // globalData.gameState==="over"
		//globalData.socket.close();
		//cc.director.loadScene("StartLevel");
        // globalData.sendToServer('game','continuegame','');
        // if(globalData.gameState==="ready"){
         //    globalData.gameState="begine";
		// }else {
         //    globalData.gameState="ready";
		// }


	},
	
	QuitButtonClick:function(data){

        globalData.sendToServer('game','quitgame','');
		cc.game.end();
	},


	gameOver:function (data) {
        globalData.sendToServer('game','gameover','');
    },
    onLoad () {

	},

    start () {

    },

    // update (dt) {},
});
