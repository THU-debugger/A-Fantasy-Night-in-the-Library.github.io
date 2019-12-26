// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
 
/* 数据模块，event为event_id,由各个场景进行更改
available 表示模块现在的状态：0-空闲；1-等待super-node执行跳转；2-切换场景后，等待场景读取filename
filename:由super-node负责修改，需用参数初始化的场景将参数保存在对应文件中
legal_scene:可以合理地在状态2下可以读取data其他参数的场景的名称，在场景中判断，不强制要求
*/
cc.Class({
    extends: cc.Component,
 
    properties: {
        event:"",
        available:0,
        filename:cc.String,
        legal_scene:cc.String,
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
        cc.game.addPersistRootNode(this.node);
    },
 
    start () {
 
    },
 
    update (dt) {
        if(this.available==1){console.log("data event:",this.event);}
    },
});
 
