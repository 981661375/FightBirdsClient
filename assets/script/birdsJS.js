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
	
	moveArround (){
		//console.log("movearround"+cc.view.getFrameSize().height+"   "+cc.view.getFrameSize().width+"    "+(1-cc.random0To1())+"   "+(1-cc.random0To1()));
		
		
	},

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
		
		this.global = cc.find("Canvas").getComponent("globalJS");
		//this.global.score++;
		//console.log(this.global.score);
		//console.log(this.global.name);
		
		this.goalLocation=null;    //移动的目的位置
		this.changeLocationTime=3;//改变位置的间隔时间
		var action=null;
		//每间隔一定时间（this.changeLocationTime）改变移动方向
		this.schedule( function() {
			this.goalLocation = cc.v2(cc.view.getFrameSize().height*(1-cc.random0To1()*(0.5)),cc.view.getFrameSize().width*(cc.random0To1()*(1)));
			//console.log("aaaaa"+this.goalLocation);
			this.node.stopAllActions();
			var action = cc.moveTo(this.changeLocationTime,this.goalLocation.y,this.goalLocation.x);
			this.node.runAction(action);
			
			this.changeLocationTime=(1-cc.random0To1())*3+0.1; 
		}, this.changeLocationTime);
	},
	
	onCollisionEnter: function (other, self) {
		if(other.name!=self.name){  //被子弹击中
			this.BoomAudioSource.play();
			var node = cc.instantiate(this.Particle.node);//增加特效
			node.parent = this.node;
			node.setPosition(0,0);
			
			this.node.stopAllActions();
			this.scheduleOnce(function() {
				node.destroy();
				this.BirdsManage.getComponent("birdsManagerJS").destoryBird(this.node);
				this.global.score++;
			 }, 0.15);
			
			
			
		};
		
		
		
	},
	
    start () {
		
		
		
		
    },

    update (dt) {
		//this.moveArround();
	},
});
