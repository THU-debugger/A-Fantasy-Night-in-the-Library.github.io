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
        sq_size:cc.size(100,100),
        position:cc.v2(-200,-200),
        state:true,//当前状态
        state_change:false,//是否需要切换
    },

    // LIFE-CYCLE CALLBACKS:
    change(){this.state=!this.state;
        this.state_change=true;},//改变状态参数
    touch(t){
        //修改switchCtrl中的参数
		if(cc.find("SwitchControl").getComponent("SwitchCtrl")==null){
			var c=cc.find("SwitchControl").getComponent("SwitchCtrl - F3");
			c.current_pos=this.node.name;
			c.switch=true;
		}
		else{
			var c=cc.find("SwitchControl").getComponent("SwitchCtrl");
			c.current_pos=this.node.name;
			c.switch=true;
			//移动人物
        }
        var ch=cc.find("Canvas/Character");
        ch.x=this.node.x;
        ch.y=this.node.y;
    },
    onLoad () {
        this.node.on(cc.Node.EventType.MOUSE_UP,this.touch,this);
    },

    start () {
        //设置位置和大小
        this.node.height=this.sq_size.height;
        this.node.width=this.sq_size.width;
        this.node.x=this.position.x;
        this.node.y=this.position.y;
    },

    update (dt) {
        if(!this.state_change){return;}
        this.state_change=false;
        if(this.state){
            this.node.color=new cc.color(255,255,255);
        }
        else{
            this.node.color=new cc.color(96,96,96);
        }
    },
});
