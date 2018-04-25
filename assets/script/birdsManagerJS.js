
cc.Class({
    extends: cc.Component,

    properties: {
		enemyPrefab:{
			default:null,
			type:cc.Node
		}
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
		//创建birds线程池管理所有birds
		this.birdsPool = new cc.NodePool();
		let initCount = 5;
		//this.birdsPool.put(enemyPrefab);不能直接加进去
		for(let i=0;i<initCount;++i){
			let bird = cc.instantiate(this.enemyPrefab);
			this.birdsPool.put(bird);
		}
		this.birdsInSecen=0;
	},

	//创建bird
	createBird:function(){
		let enemy=null;
		if(this.birdsPool.size()>0){
			enemy=this.birdsPool.get();
		}else{
			enemy=cc.instantiate(this.enemyPrefab);
		}
		enemy.parent=cc.find("Canvas/RootComponent");
		enemy.setPosition(cc.view.getFrameSize().width*0.5,cc.view.getFrameSize().height+100);
		this.birdsInSecen=this.birdsInSecen+1;

	},
	
	//销毁bird
	destoryBird:function(enemy){
		this.birdsPool.put(enemy);
		this.birdsInSecen=this.birdsInSecen-1;
	},
	
    start () {

    },

    update:function (dt) {
		
		if(this.birdsInSecen<3){
			this.createBird();
		}
	},
});
