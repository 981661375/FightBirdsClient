var globalData = require('globalData');
cc.Class({
    extends: cc.Component,

    properties: {
        roomIDLabel:{
            default:[],
            type:cc.Node
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.count=1;
    },

    KeyBordButton:function(event,CustomEventData){
        if(CustomEventData!=='cancel'){
            if(this.count<1){this.count=1};
            switch(this.count){
                case 1:
                    this.roomIDLabel[0].getComponent(cc.Label).string=CustomEventData;
                    globalData.roomID=globalData.roomID+CustomEventData;
                    this.count++;
                    break;
                case 2:
                    this.roomIDLabel[1].getComponent(cc.Label).string=CustomEventData;
                    globalData.roomID=globalData.roomID+CustomEventData;
                    this.count++;
                    break;
                case 3:
                    this.roomIDLabel[2].getComponent(cc.Label).string=CustomEventData;
                    globalData.roomID=globalData.roomID+CustomEventData;
                    this.count++;
                    break;
                case 4:
                    this.roomIDLabel[3].getComponent(cc.Label).string=CustomEventData;
                    globalData.roomID=globalData.roomID+CustomEventData;
                    this.count++;
                    break;

            };
        }else {
            //if(this.count>4){this.count=4};
            switch(this.count){
                case 1:
                    this.roomIDLabel[0].getComponent(cc.Label).string='';
                    globalData.roomID = '';

               case 2:
                   this.roomIDLabel[0].getComponent(cc.Label).string='';
                   globalData.roomID = globalData.roomID.substring(0, globalData.roomID.length - 1);

                   this.count--;
                   break;
               case 3:
                   this.roomIDLabel[1].getComponent(cc.Label).string='';
                   globalData.roomID = globalData.roomID.substring(0, globalData.roomID.length - 1);

                   this.count--;
                   break;
               case 4:
                   this.roomIDLabel[2].getComponent(cc.Label).string='';
                   globalData.roomID = globalData.roomID.substring(0, globalData.roomID.length - 1);

                   this.count--;
                   break;
               case 5:
                   this.roomIDLabel[3].getComponent(cc.Label).string='';
                   globalData.roomID = globalData.roomID.substring(0, globalData.roomID.length - 1);

                   this.count--;
                   break;


             };
        }

    },
    RoomButton:function(event,CustomEventData){

        if(globalData.roomID.length===4){
            if(CustomEventData==='joinRoom'){
                globalData.seat='right';
                globalData.sendToServer('room','joinRoom',globalData.roomID);

            }else if(CustomEventData==='createRoom'){
                globalData.seat='left';
                globalData.sendToServer('room','createRoom',globalData.roomID);
            };

            globalData.socket.on('roomJudge',(data)=>{
                if(data==='intoRoom'){
                   cc.director.loadScene("FirstLevel");

                }else if(data==='roomExist'){

                }else if(data==='roomNotExist'){

                }
            });

        }else {

        };




    }


    // update (dt) {},
});
