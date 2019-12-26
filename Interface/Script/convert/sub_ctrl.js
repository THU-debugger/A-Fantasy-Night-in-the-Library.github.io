// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
 
// 附加在场景中的sprite（位置固定）的组件，比如固定在楼梯口位置的sprite，用来检测
/*event_id：如果受到人物figure碰撞后，向上汇报的事件名称*/
cc.Class({
    extends: cc.Component,
 
    properties: {
        event_id:"",
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
        console.log("detect collision");
    },
 
    start () {
 
    },
    onCollisionEnter(other,self){
        console.log("collide---");
        this.node.dispatchEvent(new cc.Event.EventCustom(this.event_id,true));
        console.log("dispatch event ", this.event_id);
    },
 
    update (dt) {
    },
});
 
