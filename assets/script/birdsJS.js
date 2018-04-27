var globalData = require('globalData');
cc.Class({
    extends: cc.Component,

    properties: {
        BirdsManage:{
			default:null,
			type:cc.Node
		},
		Particle:{
			default:null,
			type:cc.ParticleSystem
		},
		BoomAudioSource: {
            type: cc.AudioSource,
            default: null
		},
    },

    onLoad () {
		
		this.global = cc.find("Canvas").getComponent("levelDataJS");
		//this.global.score++;
		//console.log(this.global.score);
		//console.log(this.global.name);

		this.originLocation=this.node.getPosition();
		this.goalLocation=null;    //移动的目的位置
		this.changeLocationTime=3;//改变位置的间隔时间
		var action=null;
		//每间隔一定时间（this.changeLocationTime）改变移动方向

        globalData.socket.on('birdMove',(data)=>{
            if(globalData.gameState==='begine'){
                console.log("bird == "+this.node);
                this.goalLocation = cc.v2(cc.view.getFrameSize().height*(1-data.x_Percent),cc.view.getFrameSize().width*(data.y_Percent));
                this.node.stopAllActions();
                var action = cc.moveTo(data.changeTime,this.goalLocation.y,this.goalLocation.x);
                this.node.runAction(action);
            }

		});


        globalData.socket.on("birdBeCatch",(data)=>{
                this.BoomAudioSource.play();
                var node = cc.instantiate(this.Particle.node);//增加特效
                node.parent = this.node;
                node.setPosition(0,0);
                if(data.seat===globalData.seat){
                    this.global.scoreLeft++;
				}else {
                	this.global.scoreRight++;
				}

                this.node.stopAllActions();
                this.scheduleOnce(function() {
                    node.destroy();
                    this.node.setPosition(this.originLocation);
                }, 0.15);
        });

        //
		// this.schedule( function() {
		// 	this.goalLocation = cc.v2(cc.view.getFrameSize().height*(1-cc.random0To1()*(0.5)),cc.view.getFrameSize().width*(cc.random0To1()*(1)));
		// 	this.node.stopAllActions();
		// 	var action = cc.moveTo(this.changeLocationTime,this.goalLocation.y,this.goalLocation.x);
		// 	this.node.runAction(action);
		// 	this.changeLocationTime=(1-cc.random0To1())*3+0.1;
		// }, this.changeLocationTime);
	},
	
	// onCollisionEnter: function (other, self) {
	// 	if(other.name!=self.name){  //被子弹击中
	// 		this.BoomAudioSource.play();
	// 		var node = cc.instantiate(this.Particle.node);//增加特效
	// 		node.parent = this.node;
	// 		node.setPosition(0,0);
	//
	// 		this.node.stopAllActions();
	// 		this.scheduleOnce(function() {
	// 			node.destroy();
	// 			this.BirdsManage.getComponent("birdsManagerJS").destoryBird(this.node);
	// 			this.global.score++;
	// 		 }, 0.15);
	//
	//
	//
	// 	};
		
		
		

	
    start () {
		
		
		
		
    },

    update (dt) {
		//this.moveArround();
	},
});
