var globalData = require('globalData');
cc.Class({
	
	//name:"bullet",
    extends: cc.Component,

    properties: {
        leftAnchor:{
			default:null,
			type:cc.Node
		},
		rightAnchor:{
			default:null,
			type:cc.Node
		},
		drawCanvas:{
			default:null,
			type:cc.Node
		},
		k:{                 //弹性系数
			default:0.5,
			type:cc.Float
		}, 
		cursePoint:{        //绘制弓弦时的控制点
			default:null,
			type:cc.Node
		},
		bulletParticle:{
			default:null,
			type:cc.Node
		},
		fireAudioSource: {
            type: cc.AudioSource,
            default: null
		},
	
		
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
		
		
		//得到当前关卡的的全关卡变量
		this.global = cc.find("Canvas").getComponent("levelDataJS");
		
		//得到左右两个锚点以及中点的坐标，用于绘图
		this.leftAnchorPosition=this.leftAnchor.getPosition();
		this.rightAnchorPosition=this.rightAnchor.getPosition();
		this.originalMiddlePosition=this.leftAnchorPosition.add(this.rightAnchorPosition).mulSelf(0.5);
		
		//绘图
		this.drawGraphics = this.drawCanvas.getComponent(cc.Graphics);
		//globalData.drawGraphics=this.drawGraphics;

		//物理引擎
		this.rigidBody=this.node.getComponent(cc.RigidBody);
	    //this.rigidBody.active=false;

		var touchposition_x_left=0;
		var touchposition_y_right=0;
		//移动子弹
		this.node.on('touchmove',function(event){
			if(globalData.gameState==='begine'){
                if(globalData.seat==='right'){
                    touchposition_x_left=event.getLocation().x-cc.view.getFrameSize().width*0.5;
                    console.log( touchposition_x_left);
                    // touchposition_y_right=cc.view.getFrameSize().width*0.5;
                }else {
                    touchposition_x_left=event.getLocation().x;
                };

                if((event.getLocation().y<=this.originalMiddlePosition.y)&( touchposition_x_left<(cc.view.getFrameSize().width*0.5))&touchposition_x_left>(-10)){
                    this.node.setPosition( touchposition_x_left,event.getLocation().y);

                }

			}

		},this);
		
		//'touchstart'
		this.node.on('touchstart',function(event){
            if(globalData.gameState==='begine') {
                this.rigidBody.active = false;
            }
		},this);
		
		
		//释放子弹
		this.node.on('touchend',function(event){
            if(globalData.gameState==='begine') {
                if (event.getLocation().y < (this.originalMiddlePosition.y - 20)) {
                    console.log('touchend');
                    this.rigidBody.active = true;
                    //console.log(this.bulletParticle.getComponent(cc.ParticleSystem));
                    this.fireAudioSource.play();
                    this.bulletParticle.getComponent(cc.ParticleSystem).resetSystem();//增加特效
                    this.bulletParticle.active = true;
                    globalData.sendToServer('Particleactive', 'bulletParticleactive', "");
                    this.canFire = true;

                } else {
                    this.node.setPosition(this.originalMiddlePosition);
                }
                ;
            }
		},this);
		
		//手指移动到屏幕以外
		this.node.on('touchcancel',function(event){
            if(globalData.gameState==='begine'){
			this.rigidBody.active=true;
			if(this.global.bulletsNumber>0){
				this.canFire = true;
				this.global.bulletsNumber--;
			};
            }
		},this);
	},
	
	//开火
	Fire:function(locationA){
		var force = (cc.pSub(this.originalMiddlePosition,locationA)).mul(this.k);
		this.rigidBody.applyForceToCenter(force);
    },

    //击中目标
    onCollisionEnter: function (other, self) {
        this.rigidBody.linearVelocity = new cc.Vec2(0,0);
        this.node.setPosition(this.originalMiddlePosition);
        this.rigidBody.active=false;
        this.bulletParticle.getComponent(cc.ParticleSystem).resetSystem();
        this.bulletParticle.active=false;
        //this.global.bulletsNumber++;
        globalData.sendToServer('fireResult','catchBird',{seat:globalData.seat});
    },
	
    //子弹脱离前绘制弓弦
	drawLine:function (){
		this.drawGraphics.clear(true);
		this.drawGraphics.moveTo(this.node.getPosition().x,this.node.getPosition().y);
		this.drawGraphics.lineTo(this.leftAnchorPosition.x,this.leftAnchorPosition.y);
		this.drawGraphics.moveTo(this.node.getPosition().x,this.node.getPosition().y);
		this.drawGraphics.lineTo(this.rightAnchorPosition.x,this.rightAnchorPosition.y);
		this.drawGraphics.stroke();
		this.cursePoint.setPosition(this.node.getPosition());
		
	},
	
	//子弹脱离后绘制弓弦
	drawCurve:function (){
		this.drawGraphics.clear(true);
		this.drawGraphics.moveTo(this.leftAnchorPosition.x,this.leftAnchorPosition.y);
		this.drawGraphics.quadraticCurveTo(this.cursePoint.getPosition().x,this.cursePoint.getPosition().y,this.rightAnchorPosition.x,this.rightAnchorPosition.y);
		this.drawGraphics.stroke();
	},


	
	onEnable(){
		this.rigidBody.linearVelocity = new cc.Vec2(0,0);
		this.node.setPosition(this.originalMiddlePosition);
		this.rigidBody.active=false;
	
	},
	
	onDisable (){
		//this.rigidBody.active=false;
	},

    start () {
		this.rigidBody.active=false;  //初始化时只有这里设置才有用其它几个地方（onenable,onload等）特么没用！！start只在第一次运行脚本的时候执行！！
		
	
	
   },


    update (dt) {
		
		//this.rigidBody.active=false;
		//console.log("aaaaaaaa "+this.rigidBody.active);
		//得到子弹当前的位置
		var locationSelf = this.node.getPosition();


        //子弹飞出
		if(this.canFire){
			this.Fire(locationSelf);
			if(locationSelf.y>this.originalMiddlePosition.y){
				this.canFire=false;
			};
            //将位置信息发送给服务器同步
            globalData.sendToServer('move','bulletfly',locationSelf);
		}else {
			if(globalData.gameState==='begine'){
				//console.log(this.node);
                globalData.sendToServer('move','bulletmove',locationSelf);
			}


		};
		
		//没有击中目标时
		if(locationSelf.y>cc.view.getFrameSize().height|locationSelf.y<(-10)|locationSelf.x>globalData.X_RightBount|locationSelf.x<globalData.X_LeftBound){
			console.log("locationSelf.x    "+locationSelf.x);

            globalData.sendToServer('fireResult','outBound',"");

            this.rigidBody.linearVelocity = new cc.Vec2(0,0);
            this.node.setPosition(this.originalMiddlePosition);
            this.rigidBody.active=false;
            this.bulletParticle.getComponent(cc.ParticleSystem).resetSystem();
            this.bulletParticle.active=false;


		};
		
		//绘制弓弦
		if(locationSelf.y<=this.originalMiddlePosition.y){
			this.drawLine();
		}else{
			this.drawCurve();
		}

	},
	
});
