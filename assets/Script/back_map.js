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
        init:true,
        leave:true,
        event_id:"",
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        if(this.init){
        var dd=cc.find("data_module").getComponent("data");
        if(dd.available=2){dd.available=0;}
        }
    },

    start () {

    },

    // update (dt) {},
    onDestroy(){
        if(this.destroy){
        var dm=cc.find("data_module").getComponent("data");
        if(dm.available==0){
        dm.event=this.event_id;
        dm.available=1;}
        }
    }
});
