// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
 
//控制场景切换的“上帝”节点 
/*
    default_scene:在game-loading字样后出现的场景
    实时监控data中的内容，一旦available=1，就将读取其所接收的event，
    根据event_map.json，寻找对应的目标场景和对应的参数文件，然后修改data.available为2
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
            default:null
        },
        map_file:cc.String,
    },
 
    // LIFE-CYCLE CALLBACKS:
 
    onLoad () {
        cc.game.addPersistRootNode(this.node);
        console.log("super control init");
        cc.log("data state:",this.data_module.getComponent("data").available);
        cc.loader.loadRes(this.map_file, function (err, object) {
            if (err) {
                cc.error(err);
                return;
            }
            cc.log("file ",object.json["MapN_B1_Elv"]);
        });
    },
 
    start () {
 
    },
 
    update (dt) {
        var data = this.data_module.getComponent("data");
        if(data.available==1){
            cc.loader.loadRes(this.map_file, function (err, object) {
                if (err) {
                    cc.error(err);
                    return;
                }
                var scene_name=JSON.stringify(object.json[data.event][0]).slice(1,-1);
                var file_name=JSON.stringify(object.json[data.event][1]).slice(1,-1);
                cc.log("target scene is ",scene_name);
                cc.director.loadScene(scene_name);
                data.available=2;
                data.filename=file_name;
                data.event="";
                data.legal_scene=scene_name;
                cc.log(data.filename)
            });
        }
    },
});
 
