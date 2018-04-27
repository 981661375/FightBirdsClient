var globalData = require('globalData');
//var event = require('/Lib/Event');


cc.Class({
    extends: cc.Component,

    properties: {
        bullet:{
            default:null,
            type:cc.Node
        },
        leftAnchor:{
            default:null,
            type:cc.Node
        },
        rightAnchor:{
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
        graphics: {
            type: cc.Node,
            default: null
        },
    },

    // LIFE-CYCLE CALLBACKS:


    onLoad () {
        console.log("this.bullet =="+this.bullet);
        console.log(" rightAnchor =="+this.rightAnchor);

        this.drawGraphics = this.graphics.getComponent(cc.Graphics);
        this.leftAnchorPosition=this.leftAnchor.getPosition();
        this.rightAnchorPosition=this.rightAnchor.getPosition();
        this.originalMiddlePosition=this.leftAnchorPosition.add(this.rightAnchorPosition).mulSelf(0.5);
        globalData.socket.on("move",(data)=>{
            //if(globalData.gameState==='begine'){
                console.log("this.bullet =="+this.bullet);
                console.log(" rightAnchor =="+this.rightAnchor);
                this.bullet.setPosition(data.data);
                if('bulletmove'===data.type&data.data.y<=this.originalMiddlePosition.y){
                    this.drawLine();
                }else if('bulletfly'===data.type&data.data.y<=this.originalMiddlePosition.y){
                    this.drawLine();
                }else {
                    this.drawGraphics.clear(true);
                    this.drawGraphics.moveTo(this.rightAnchorPosition.x,this.rightAnchorPosition.y);
                    this.drawGraphics.lineTo(this.leftAnchorPosition.x,this.leftAnchorPosition.y);
                    this.drawGraphics.stroke();
                }

            //}

        });

        globalData.socket.on("Particleactive",(data)=>{
            if(data.type==='bulletParticleactive'){
                this.fireAudioSource.play();
                this.bulletParticle.getComponent(cc.ParticleSystem).resetSystem();//增加特效
                this.bulletParticle.active=true;
            }
        });


        globalData.socket.on("fireResult",(data)=>{
            console.log("catchBird");
            if(data.type==='catchBird'){
                this.bulletParticle.getComponent(cc.ParticleSystem).resetSystem();
                this.bulletParticle.active=false;
            }else if(data.type==='outBound'){
                this.bulletParticle.getComponent(cc.ParticleSystem).resetSystem();
                this.bulletParticle.active=false;
            }

        });



    },


    //子弹脱离前绘制弓弦
    drawLine:function (){
        this.drawGraphics.clear(true);
        this.drawGraphics.moveTo(this.bullet.getPosition().x,this.bullet.getPosition().y);
        this.drawGraphics.lineTo(this.leftAnchorPosition.x,this.leftAnchorPosition.y);
        this.drawGraphics.moveTo(this.bullet.getPosition().x,this.bullet.getPosition().y);
        this.drawGraphics.lineTo(this.rightAnchorPosition.x,this.rightAnchorPosition.y);
        this.drawGraphics.stroke();


    },

    //子弹脱离后绘制弓弦
    drawCurve:function (){
        this.drawGraphics.clear(true);
        this.drawGraphics.moveTo(this.leftAnchorPosition.x,this.leftAnchorPosition.y);
        this.drawGraphics.quadraticCurveTo(this.bullet.getPosition().x,this.bullet.getPosition().y,this.rightAnchorPosition.x,this.rightAnchorPosition.y);
        this.drawGraphics.stroke();
    },


    start () {

    },

    // update (dt) {},
});
