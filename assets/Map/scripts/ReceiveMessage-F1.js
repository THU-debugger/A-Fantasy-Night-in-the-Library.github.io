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
        CCard: cc.Component,
        axe: cc.Component,
        Book: cc.Component,
        Soil: cc.Component,
		remove_book: cc.Component,
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
            case "CCard":
                this.thing[5] = 1;
                cc.sys.localStorage.setItem('Bag', JSON.stringify(this.thing));
                this.CCard.destroy();
				var dialog = cc.instantiate(this.resizeDialog).getComponent("moduleDialog").init("---F1---","找到了一张电梯卡");
				cc.find("Canvas").getChildByName("Main Camera").addChild(dialog.node);
                break;
            case "axe":
                this.thing[6] = 1;
                cc.sys.localStorage.setItem('Bag', JSON.stringify(this.thing));
                this.axe.destroy();
				var dialog = cc.instantiate(this.resizeDialog).getComponent("moduleDialog").init("---F1---",dialog_text[6]);
				cc.find("Canvas").getChildByName("Main Camera").addChild(dialog.node);
                break;
            case "Book":
                this.thing[2] = 1;
                cc.sys.localStorage.setItem('Bag', JSON.stringify(this.thing));
                this.Book.destroy();
				var dialog = cc.instantiate(this.resizeDialog).getComponent("moduleDialog").init("---F1---",dialog_text[3]);
				cc.find("Canvas").getChildByName("Main Camera").addChild(dialog.node);
                break;
            case "Soil":
                if(this.thing[6] == 0){
                    this.player.tiledTile.y -= 1;
					var dialog = cc.instantiate(this.resizeDialog).getComponent("moduleDialog").init("---F1---","这里一堆杂土，得找一把铲子才行...");
					cc.find("Canvas").getChildByName("Main Camera").addChild(dialog.node);
                }
                else{
                    this.Soil.destroy();
					var dialog = cc.instantiate(this.resizeDialog).getComponent("moduleDialog").init("---F1---","（用铲子铲走土堆，可以通行了）");
					cc.find("Canvas").getChildByName("Main Camera").addChild(dialog.node);
                }
				break;
			case "checkbooks":
				if(this.thing[2] == 1){
					this.player.tiledTile.x -= 1;
					var dialog = cc.instantiate(this.resizeDialog).getComponent("moduleDialog").init("---F1---","（滴滴滴）身上有未还的书不能通过！");
					cc.find("Canvas").getChildByName("Main Camera").addChild(dialog.node);
				}
				break;
				
			case "remove_book":
				if(this.thing[2] == 1){
					cc.director.loadScene("ComputerRoom1");
					this.thing[2] = 0;
					this.thing[0] ++;
					cc.sys.localStorage.setItem('Bag', JSON.stringify(this.thing));
				}
				else{
					this.player.tiledTile.x=92;
					this.player.tiledTile.y=58;
					var dialog = cc.instantiate(this.resizeDialog).getComponent("moduleDialog").init("---F1---","还书机？可我没有书要还啊");
					cc.find("Canvas").getChildByName("Main Camera").addChild(dialog.node);
				}
				break;
			case "F1B1":
				cc.sys.localStorage.setItem('playerScene', JSON.stringify("B1"));
	            cc.sys.localStorage.setItem('playerX', JSON.stringify(93));
	            cc.sys.localStorage.setItem('playerY', JSON.stringify(51));
				cc.director.loadScene("B1");
				
				break;
			case "F1B1-2":
				cc.sys.localStorage.setItem('playerScene', JSON.stringify("B1"));
	            cc.sys.localStorage.setItem('playerX', JSON.stringify(38));
	            cc.sys.localStorage.setItem('playerY', JSON.stringify(58));
				cc.director.loadScene("B1");
				
				break;
			case "F1F3":
				cc.sys.localStorage.setItem('playerScene', JSON.stringify("F3"));
	            cc.sys.localStorage.setItem('playerX', JSON.stringify(153));
	            cc.sys.localStorage.setItem('playerY', JSON.stringify(39));
				cc.director.loadScene("F3");		
				break;
			case "borrowbooks":	
				var dialog = cc.instantiate(this.resizeDialog).getComponent("moduleDialog").init("---F1---","自助借书机");
				cc.find("Canvas").getChildByName("Main Camera").addChild(dialog.node);
				this.player.tiledTile.x=143;
				this.player.tiledTile.y=68;
				break;
			case "destination":
				var ttt=cc.sys.localStorage.getItem('date');
				if(ttt==1){
					cc.director.loadScene("success");
				}
				else{
					this.player.tiledTile.y += 1;
					var dialog = cc.instantiate(this.resizeDialog).getComponent("moduleDialog").init("---F1---","大门紧锁着");
					cc.find("Canvas").getChildByName("Main Camera").addChild(dialog.node);
				}
			case "Button":
                // 相应的响应函数
				this.node.getChildByName("游戏触发节点").getChildByName("barrier").destroy();
				this.node.getChildByName("游戏触发节点").getChildByName("door-left").destroy();
				this.node.getChildByName("游戏触发节点").getChildByName("door-right").destroy();
				break;	
			case "doorleft":	
				this.player.tiledTile.x -= 2;
				var dialog = cc.instantiate(this.resizeDialog).getComponent("moduleDialog").init("---F1---","门打不开");
				cc.find("Canvas").getChildByName("Main Camera").addChild(dialog.node);
				break;	
			case "doorright":	
				this.player.tiledTile.x += 2;
				var dialog = cc.instantiate(this.resizeDialog).getComponent("moduleDialog").init("---F1---","门打不开");
				cc.find("Canvas").getChildByName("Main Camera").addChild(dialog.node);
				break;
				break;
        }
        
    },

    onLoad () {
        // 读取初始化物品信息
        this.thing = JSON.parse(cc.sys.localStorage.getItem('Bag'));
        // 加入消息监听
        this.node.on("sent",this.dealmessage,this);
        // 将脚本内声明的变量指向对应的图层
        this.CCard = this.node.getChildByName("Thing").getChildByName("F1-CCard");
        this.axe = this.node.getChildByName("Thing").getChildByName("F1-axe");
        this.Book = this.node.getChildByName("Thing").getChildByName("F1-Book");
        this.Soil = this.node.getChildByName("Thing").getChildByName("F1-Soil");
        // 获取人物图层
        this.player = this.node.parent.getChildByName("4-F1").getChildByName("Shelf").getChildByName("Character");
        this.player.tiledTile = this.player.getComponent(cc.TiledTile);
    },

    start () {
        if(this.thing[2] != 0){
            this.Book.destroy();
        }
        if(this.thing[5] != 0){
            this.CCard.destroy();
        }
        if(this.thing[6] != 0){
            this.axe.destroy();
        }
    },

    update (dt) {
        
    },
});
