var globalData = require('globalData');
import io from 'socket.io';
cc.Class({
    extends: cc.Component,

    properties: {
        network:{
            default:null,
            type:cc.Node
        }
    },

    // LIFE-CYCLE CALLBACKS:
	
	//初始化物理世界
    initPhysicalWorld(){
		//使用物理引擎
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getPhysicsManager().gravity = cc.v2(0, -10);
		
		//使用碰撞系统
		var manager = cc.director.getCollisionManager();
		manager.enabled = true;
		manager.enabledDebugDraw = false;//绘制可见范围
		manager.enabledDrawBoundingBox = false;

    },
	
    onLoad () {
       
        cc.game.addPersistRootNode(this.network);
        //连接服务器
        this.socket = io('http://207.148.86.78:3000');
        globalData.socket=this.socket;

        globalData.socket.on('connect',function(){
            console.log("已连接");


            globalData.selfInfo.picture="https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIGJlkCBSm96XXARNuOoxsOcwib92iaXic1827J0tSxCDemia25g8Pibx6rnnSA2wXdNBLHXGibYweia5Ggg/0";
            globalData.selfInfo.name="大勇";


        });

        globalData.socket.on('disconnect',function(){
            console.log("连接已断开");
        });

        globalData.socket.on('game',(data)=>{
            if(data.type==='gameover'){
                cc.game.end();
                cc.find("Canvas/RootComponent").active=false;
                cc.find("Canvas/Menu").active=true;
                globalData.gameState='over';

            }else if(data.type==="continuegame"){
                if(globalData.gameState==='ready'){
                    globalData.gameState='begine';
                }else {
                    globalData.gameState='ready'
                }

            }
            else if(data.type==='quitgame'){
                cc.game.end();
            }else if(data.type==='allPlayerJoin'){    //同步玩家信息
                globalData.sendToServer("game","playerinfo",{seat:globalData.seat,info:globalData.selfInfo});
                globalData.gameState='begine';
            }else if(data.type==='playerinfo'){
                if(data.data.seat!==globalData.seat){
                    globalData.rivalInfo=data.data.info;
                }
            }
        });


        //初始化物理世界
		 this.initPhysicalWorld();

	},

    start () {

    },

    update (dt) {
        //console.log("gggggggggg");
    },
});
