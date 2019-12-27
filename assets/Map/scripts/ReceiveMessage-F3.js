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
        BCard: cc.Component,
        Star: cc.Component,
        Door: cc.Component,
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
            case "BCard":
                this.thing[4] = 1;
                cc.sys.localStorage.setItem('Bag', JSON.stringify(this.thing));
                this.BCard.destroy();
				var dialog = cc.instantiate(this.resizeDialog).getComponent("moduleDialog").init(" ",dialog_text[10]);
				cc.find("Canvas").getChildByName("Main Camera").addChild(dialog.node);
                break;
            case "Star":
                this.thing[1]++;
                cc.sys.localStorage.setItem('Bag', JSON.stringify(this.thing));
                this.Star.destroy();
                console.log(this.thing[1]);
				var dialog = cc.instantiate(this.resizeDialog).getComponent("moduleDialog").init(" ",dialog_text[8]);
				cc.find("Canvas").getChildByName("Main Camera").addChild(dialog.node);
                break;
            case "Door":
                this.player.tiledTile.y += 2;
				var dialog = cc.instantiate(this.resizeDialog).getComponent("moduleDialog").init(" ","门紧关着，似乎从里面才能打开");
				cc.find("Canvas").getChildByName("Main Camera").addChild(dialog.node);
                break;
			case "keyChecks":
				if(this.thing[0]<3 ){
					this.player.tiledTile.y -= 1;
					var dialog = cc.instantiate(this.resizeDialog).getComponent("moduleDialog").init("---F3---","这个门似乎需要三把钥匙，我再找找吧");
					cc.find("Canvas").getChildByName("Main Camera").addChild(dialog.node);
				}
			break;	
			case "switchgame":	
				//cc.sys.localStorage.setItem('playerScene', JSON.stringify("SwitchGame"));
				this.thing[3]++;
				cc.sys.localStorage.setItem('Bag', JSON.stringify(this.thing));
				cc.director.loadScene("SwitchGame -F3");
				break;	

			
				
        }
        
    },

    onLoad () {
        // 读取初始化物品信息
        this.thing = JSON.parse(cc.sys.localStorage.getItem('Bag'));
        // 加入消息监听
        this.node.on("sent",this.dealmessage,this);
        // 将脚本内声明的变量指向对应的图层
        this.BCard = this.node.getChildByName("Thing").getChildByName("F3-BCard");
        this.Star = this.node.getChildByName("Thing").getChildByName("F3-Star");
        this.Door = this.node.getChildByName("Thing").getChildByName("F3-Door");
        // 获取人物图层
        this.player = this.node.parent.getChildByName("4-F3").getChildByName("Shelf").getChildByName("Character");
        this.player.tiledTile = this.player.getComponent(cc.TiledTile);
    },

    start () {
        if(this.thing[4] != 0){
            this.BCard.destroy();
        }
        if(this.thing[1] != 0){
            this.Star.destroy();
        }
    },

    update (dt) {
        
    },
});
