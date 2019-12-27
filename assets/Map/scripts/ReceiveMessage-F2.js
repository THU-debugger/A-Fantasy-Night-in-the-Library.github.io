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
        ACard: cc.Component,
        Button: cc.Component,
        Door: cc.Component,
        Machine: cc.Component,
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
        console.log(message.detail);
        switch(message.detail){
            case "ACard":
                this.thing[3] = 1;
                cc.sys.localStorage.setItem('Bag', JSON.stringify(this.thing));
                this.ACard.destroy();
				var dialog = cc.instantiate(this.resizeDialog).getComponent("moduleDialog").init(" ",dialog_text[10]);
				cc.find("Canvas").getChildByName("Main Camera").addChild(dialog.node);
                break;
            case "Button":
                // 需要调用函数，相应的小游戏
				var dialog = cc.instantiate(this.resizeDialog).getComponent("moduleDialog").init(" ","一个按钮？");
				cc.find("Canvas").getChildByName("Main Camera").addChild(dialog.node);

                break;
            case "Door":
                this.player.tiledTile.y += 2;
                cc.director.pause();
                cc.director.resume();
				var dialog = cc.instantiate(this.resizeDialog).getComponent("moduleDialog").init(" ","这个门似乎打不开？");
				cc.find("Canvas").getChildByName("Main Camera").addChild(dialog.node);

                break;
            case "Machine":

                if(this.thing[3]!=0&&this.thing[4]!=0){
					this.thing[8]++;
					cc.sys.localStorage.setItem('Bag', JSON.stringify(this.thing));
					var dialog = cc.instantiate(this.resizeDialog).getComponent("moduleDialog").init("---F2---","插入两张卡，得到一把特制的钥匙");
					cc.find("Canvas").getChildByName("Main Camera").addChild(dialog.node);
				}
				else if(this.thing[3]!=0||this.thing[4]!=0){
					var dialog = cc.instantiate(this.resizeDialog).getComponent("moduleDialog").init("---F2---","似乎还需要一张卡");
					cc.find("Canvas").getChildByName("Main Camera").addChild(dialog.node);
				}		
				else{
					var dialog = cc.instantiate(this.resizeDialog).getComponent("moduleDialog").init("---F2---","机器上有两个卡槽，看来得找到这两张卡");
					cc.find("Canvas").getChildByName("Main Camera").addChild(dialog.node);
				}					
                break;
			case "switchgame":	
				//cc.sys.localStorage.setItem('playerScene', JSON.stringify("SwitchGame"));
				this.thing[4]++;
				cc.sys.localStorage.setItem('Bag', JSON.stringify(this.thing));
				cc.director.loadScene("SwitchGame");
				break;	
        }
        
    },

    onLoad () {
        // 读取初始化物品信息
        this.thing = JSON.parse(cc.sys.localStorage.getItem('Bag'));
        // 加入消息监听
        this.node.on("sent",this.dealmessage,this);
        // 将脚本内声明的变量指向对应的图层
        this.ACard = this.node.getChildByName("Thing").getChildByName("F2-ACard");
        this.Button = this.node.getChildByName("Thing").getChildByName("F2-Button");
        this.Door = this.node.getChildByName("Thing").getChildByName("F2-Door");
        this.Machine = this.node.getChildByName("Thing").getChildByName("F2-Machine");
        // 获取人物图层
        this.player = this.node.parent.getChildByName("4-F2").getChildByName("Shelf").getChildByName("Character");
        this.player.tiledTile = this.player.getComponent(cc.TiledTile);
    },

    start () {
        if(this.thing[3] != 0){
            this.ACard.destroy();
        }
    },

    update (dt) {
        
    },
});
