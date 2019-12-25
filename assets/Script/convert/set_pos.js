// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
 
/*
        这个组件用于对每一层地图的初始化:
        (1) onLoad():读取所需要的文件的名字到this.file，并将data_module改为可修改的状态
        (2) start():根据this.file 读取json，读取x,y坐标 并更改节点坐标
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
        // },S
        file:"",
        preprocess:false,
        scene_name:"",
        print:false,
    },
 
    // LIFE-CYCLE CALLBACKS:
 
    onLoad () {
        cc.log(this.init_x);
        var dm=cc.find("data_module").getComponent("data");
        var f="";
        if(dm.available==2&&dm.legal_scene==this.scene_name){
            cc.log("Get from DM");
            dm.available=0;
            dm.event="";
            dm.legal_scene="";
            f=dm.filename;
            cc.log(f);
            this.file=f;
        }
    },
 
    start () {
        cc.log("this.file is",this.file);
        cc.log("super node",cc.find("super_node"));
        cc.log("data ",cc.find("data_module"));
        if(this.file.length>1){
            var self=this;
            cc.loader.loadRes(this.file, function (err, object) {
                if (err) {
                    cc.error(err);
                    return;
                }
                var init_x=Number(JSON.stringify(object.json['x']));
                var init_y=Number(JSON.stringify(object.json['y']));
                cc.log("read file",self.file);
                cc.log("from json",init_x, init_y);
                cc.log("x,y",init_x,init_y);
                var tt=self.node.getComponent(cc.TiledTile);
                tt.x=init_x;
                tt.y=init_y;
            });
            this.preprocess=true;
        }
        else{
            this.preprocess=true;
        }
    },
 
    update (dt) {
        if(this.print){
        var tt=this.node.getComponent(cc.TiledTile);
        cc.log(tt.x,tt.y);}
        if(!this.preprocess){
            return;
        }
    },
});
 
