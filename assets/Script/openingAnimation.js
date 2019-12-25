// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
		rank:1,
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
		this.node.getChildByName("text1").y=266;
		this.node.getChildByName("text2").y=190;
		this.node.getChildByName("text3").y=114;
		this.node.getChildByName("text4").y=38;
		this.node.getChildByName("text5").y=-38;
		this.node.getChildByName("text6").y=-114;
		this.node.getChildByName("text7").y=-190;
		this.node.getChildByName("text8").y=-266;
		this.node.getChildByName("text1").opacity=0;
		this.node.getChildByName("text2").opacity=0;
		this.node.getChildByName("text3").opacity=0;
		this.node.getChildByName("text4").opacity=0;
		this.node.getChildByName("text5").opacity=0;
		this.node.getChildByName("text6").opacity=0;
		this.node.getChildByName("text7").opacity=0;
		this.node.getChildByName("text8").opacity=0;
	},
    start () {

    },

    update (dt) {
		console.log(this.node.getChildByName("text2").opacity);
		switch(this.rank){
			case 1:if(this.node.getChildByName("text1").opacity<255)this.node.getChildByName("text1").opacity+=3;if(this.node.getChildByName("text1").opacity==255) this.rank++;break;
			case 2:if(this.node.getChildByName("text2").opacity<255)this.node.getChildByName("text2").opacity+=3;if(this.node.getChildByName("text2").opacity==255) this.rank++;break;
			case 3:if(this.node.getChildByName("text3").opacity<255)this.node.getChildByName("text3").opacity+=3;if(this.node.getChildByName("text3").opacity==255) this.rank++;break;
			case 4:if(this.node.getChildByName("text4").opacity<255)this.node.getChildByName("text4").opacity+=3;if(this.node.getChildByName("text4").opacity==255) this.rank++;break;
			case 5:if(this.node.getChildByName("text5").opacity<255)this.node.getChildByName("text5").opacity+=3;if(this.node.getChildByName("text5").opacity==255) this.rank++;break;
			case 6:if(this.node.getChildByName("text6").opacity<255)this.node.getChildByName("text6").opacity+=3;if(this.node.getChildByName("text6").opacity==255) this.rank++;break; 
			case 7:if(this.node.getChildByName("text7").opacity<255)this.node.getChildByName("text7").opacity+=3;if(this.node.getChildByName("text7").opacity==255) this.rank++;break; 
			case 8:if(this.node.getChildByName("text8").opacity<255)this.node.getChildByName("text8").opacity+=3;
		}
	},
});
