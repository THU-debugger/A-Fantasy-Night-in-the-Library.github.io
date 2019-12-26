// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

/* 一个场景中所有标志物的父节点,功能包括接受各个标志物的信息，并适当地写入到data组件中
event_list:所有监听的标志物发送的事件
report(event)：接收到监听的事件时，修改data中的内容
*/
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
        data_module:{
            type:cc.Node,
            default:null,
        },
        event_list:{
            type:cc.String,
            default:[],
        }
    },

    // LIFE-CYCLE CALLBACKS:
    report(event){
        console.log(event.type);
        var data = this.data_module.getComponent("data");
        console.log("data availability:", data.available);
        if(data.available==0){data.event=event.type;data.available=1;}
    },
    onLoad () {
        this.data_module=cc.find("data_module");
        cc.director.getCollisionManager().enabled=true;
        cc.director.getCollisionManager().enabledDebugDraw = false;
        for(var i=0;i<this.event_list.length;i++)
        {this.node.on(this.event_list[i],this.report,this);
        console.log("listener add:", this.event_list[i])}
    },

    start () {

    },

    // update (dt) {},
});
