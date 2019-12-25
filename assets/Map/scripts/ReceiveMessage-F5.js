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
        // 记录本层物品的拾取情况
        thing: [cc.Integer],
        // 用于获取预置prefeb中的各个物品层
        Star: cc.Component,
        Key: cc.Component,
        // 用于对人物的运动逻辑进行修改
        player: cc.TiledTile,
		resizeDialog: cc.Prefab,
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

    // 接收到碰撞信息后进行相应的处理
    dealmessage(message) {
        switch(message.detail){
            case "Star":
                this.thing[1]++;
                cc.sys.localStorage.setItem('Bag', JSON.stringify(this.thing));
                this.Star.destroy();
                console.log(this.thing[1]);
				var dialog = cc.instantiate(this.resizeDialog).getComponent("moduleDialog").init(" ",dialog_text[8]);
				cc.find("Canvas").getChildByName("Main Camera").addChild(dialog.node);
                break;
            case "Key":
                this.thing[0]++;
                cc.sys.localStorage.setItem('Bag', JSON.stringify(this.thing));
                this.Key.destroy();
                console.log(this.thing[0]);
				var dialog = cc.instantiate(this.resizeDialog).getComponent("moduleDialog").init(" ","又是一把钥匙");
				cc.find("Canvas").getChildByName("Main Camera").addChild(dialog.node);
                break;
        }
        
    },

    onLoad () {
        // 读取初始化物品信息
        this.thing = JSON.parse(cc.sys.localStorage.getItem('Bag'));
        // 加入消息监听
        this.node.on("sent",this.dealmessage,this);
        // 将脚本内声明的变量指向对应的图层
        this.Star = this.node.getChildByName("Thing").getChildByName("F5-Star");
        this.Key = this.node.getChildByName("Thing").getChildByName("F5-Key");
        // 获取人物图层
        this.player = this.node.parent.getChildByName("4-F5").getChildByName("Shelf").getChildByName("Character");
        this.player.tiledTile = this.player.getComponent(cc.TiledTile);
    },

    start () {

    },

    update (dt) {
        
    },
});
