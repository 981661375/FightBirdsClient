var globalData = require('globalData');

cc.Class({
    extends: cc.Component,

    properties: {
       Score:{
			default:null,
			type:cc.Node
	   },
        ScoreAI:{
            default:null,
            type:cc.Node
        },

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        console.log("Score =="+this.Score);
		this.global = cc.find("Canvas").getComponent("levelDataJS");
        //分配得分
        if(globalData.seat==='left'){
            this.scoreLabel = this.Score.getComponent(cc.Label);
            this.scoreLabel.string=this.global.scoreLeft;
            this.scoreAILabel = this.ScoreAI.getComponent(cc.Label);
            this.scoreAILabel.string=this.global.scoreRight;
        }else {
            this.scoreLabel = this.Score.getComponent(cc.Label);
            this.scoreLabel.string=this.global.scoreRight;
            this.scoreAILabel = this.ScoreAI.getComponent(cc.Label);
            this.scoreAILabel.string=this.global.scoreLeft;
        }
		
	},



    start () {

    },

    update (dt) {
        console.log("Score =="+this.Score);
        if(globalData.seat==='left'){
            this.scoreLabel = this.Score.getComponent(cc.Label);
            this.scoreLabel.string=this.global.scoreLeft;
            this.scoreAILabel = this.ScoreAI.getComponent(cc.Label);
            this.scoreAILabel.string=this.global.scoreRight;
        }else {
            this.scoreLabel = this.Score.getComponent(cc.Label);
            this.scoreLabel.string=this.global.scoreRight;
            this.scoreAILabel = this.ScoreAI.getComponent(cc.Label);
            this.scoreAILabel.string=this.global.scoreLeft;
        }

    },
});
