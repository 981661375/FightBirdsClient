
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
		rootComponent:{
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
		var self = this;
		var remoteUrl="https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIGJlkCBSm96XXARNuOoxsOcwib92iaXic1827J0tSxCDemia25g8Pibx6rnnSA2wXdNBLHXGibYweia5Ggg/0";
		this.deps=cc.loader.load({url: remoteUrl, type: 'jpg'}, function (err, texture) {
			
			var frame = new cc.SpriteFrame(texture);
			self.node.getComponent(cc.Sprite).spriteFrame = frame;
			//self.node.getComponent(cc.Sprite).spriteFrame.setTexture (texture); //千万不能直接加载图片，不然一是有时不能完整加载，偶尔还要报错
			//self.node.getComponent(cc.Sprite).Width=w;
			//self.node.getComponent(cc.Sprite).Height=h;
			//console.log(self.node.getComponent(cc.Sprite).Width+"   sss   "+self.node.getComponent(cc.Sprite).Width)
		});
		
		
		//得到当前关卡的的全关卡变量
		this.global = cc.find("Canvas").getComponent("globalJS");
		
		//得到左右两个锚点以及中点的坐标，用于绘图
		this.leftAnchorPosition=this.leftAnchor.getPosition();
		this.rightAnchorPosition=this.rightAnchor.getPosition();
		this.originalMiddlePosition=this.leftAnchorPosition.add(this.rightAnchorPosition).mulSelf(0.5);
		
		//绘图
		this.drawGraphics = this.rootComponent.getComponent(cc.Graphics);
		
		//物理引擎
		this.rigidBody=this.node.getComponent(cc.RigidBody);
	    //this.rigidBody.active=false;
		
		//移动子弹
		this.node.on('touchmove',function(event){
			if(event.getLocation().y<=this.originalMiddlePosition.y){
				this.node.setPosition(event.getLocation());
			}
		},this);
		
		//'touchstart'
		this.node.on('touchstart',function(event){
			this.rigidBody.active=false;
			
		},this);
		
		
		//释放子弹
		this.node.on('touchend',function(event){
			
			if(this.global.bulletsNumber>0&event.getLocation().y<(this.originalMiddlePosition.y-20)){
				this.rigidBody.active=true;
				//console.log(this.bulletParticle.getComponent(cc.ParticleSystem));
				this.fireAudioSource.play();
				this.bulletParticle.getComponent(cc.ParticleSystem).resetSystem();//增加特效
				this.bulletParticle.active=true;
				this.canFire = true;
				this.global.bulletsNumber--;
			}else{
				
				this.node.setPosition(this.originalMiddlePosition);
				
			};
			
		},this);
		
		//手指移动到屏幕以外
		this.node.on('touchcancel',function(event){
			this.rigidBody.active=true;
			if(this.global.bulletsNumber>0){
				this.canFire = true;
				this.global.bulletsNumber--;
			};
		},this);
		

	},
	
	//开火
	Fire:function(locationA){
		var force = (cc.pSub(this.originalMiddlePosition,locationA)).mul(this.k);
		this.rigidBody.applyForceToCenter(force);
		
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

	//击中目标
	onCollisionEnter: function (other, self) {
		this.rigidBody.linearVelocity = new cc.Vec2(0,0);
		this.node.setPosition(this.originalMiddlePosition);
		this.rigidBody.active=false;
		this.bulletParticle.getComponent(cc.ParticleSystem).resetSystem();
		this.bulletParticle.active=false;
		this.global.bulletsNumber++;
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
		};
		
		//没有击中目标时
		if(locationSelf.y>cc.view.getFrameSize().height|locationSelf.y<(-10)|locationSelf.x>cc.view.getFrameSize().width|locationSelf.x<0|locationSelf.y<(-10)){
			this.rigidBody.linearVelocity = new cc.Vec2(0,0);
			this.node.setPosition(this.originalMiddlePosition)
			this.rigidBody.active=false;
			this.bulletParticle.active=false;
			//游戏结束
			if(true){
				this.rigidBody.active=false;
				console.log("aaaaaaaa "+this.rigidBody.active);
				cc.find("Canvas/RootComponent").active=false;
				cc.find("Canvas/Menu").active=true;
				this.rigidBody.active=false;
			};
		};
		
		//绘制弓弦
		if(locationSelf.y<=this.originalMiddlePosition.y){
			this.drawLine();
		}else{
			this.drawCurve();
		}
		
		
	},
	
});
