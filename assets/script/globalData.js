'use strict';

const  globaldata={

    playernumber:null,
    socket:null,
    originalMiddlePosition:null,
    drawGraphics:null,
    roomID:'',
    seat:'left',
    X_LeftBound:0,
    X_RightBount:160,
    selfInfo:{picture:'',name:''},
    rivalInfo:{picture:'',name:''},

    gameState:"over"

};
//定义发送通知事件
globaldata.sendToServer = function (event,type,data,callback=null) {
    globaldata.socket.emit(event,{type:type,data:data});
    if(callback){
        callback();
    }
};


module.exports=globaldata