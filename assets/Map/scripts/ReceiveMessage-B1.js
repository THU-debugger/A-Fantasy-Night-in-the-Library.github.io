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
        Button: cc.Component,
        Soil: cc.Component,
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
            case "Button":
                // 相应的响应函数
				this.node.getChildByName("游戏触发节点").getChildByName("barrier").destroy();
				this.node.getChildByName("游戏触发节点").getChildByName("door-left").destroy();
				this.node.getChildByName("游戏触发节点").getChildByName("door-right").destroy();
				break;
            case "Soil":
                if(this.thing[6] == 0){
                    this.player.tiledTile.y ++;
					var dialog = cc.instantiate(this.resizeDialog).getComponent("moduleDialog").init("---B1---","一堆土，没有铲子之类的东西也弄不开吧");
					cc.find("Canvas").getChildByName("Main Camera").addChild(dialog.node);
                }    
                else{
                    this.Soil.destroy();
                    this.thing[0] ++;
                    cc.sys.localStorage.setItem('Bag', JSON.stringify(this.thing));
					var dialog = cc.instantiate(this.resizeDialog).getComponent("moduleDialog").init("---B1---",dialog_text[7]);
					cc.find("Canvas").getChildByName("Main Camera").addChild(dialog.node);
                }   
                break;
			case "B1B2":	
				cc.sys.localStorage.setItem('playerScene', JSON.stringify("B2"));
	            cc.sys.localStorage.setItem('playerX', JSON.stringify(168));
	            cc.sys.localStorage.setItem('playerY', JSON.stringify(70));
				cc.director.loadScene("B2");
				break;
			case "B1B2-2":	
				cc.sys.localStorage.setItem('playerScene', JSON.stringify("B2"));
	            cc.sys.localStorage.setItem('playerX', JSON.stringify(9));
	            cc.sys.localStorage.setItem('playerY', JSON.stringify(85));
				cc.director.loadScene("B2");
				break;	
			case "doorleft":	
				this.player.tiledTile.x -= 2;
				var dialog = cc.instantiate(this.resizeDialog).getComponent("moduleDialog").init("---B1---","门打不开");
				cc.find("Canvas").getChildByName("Main Camera").addChild(dialog.node);
				break;	
			case "doorright":	
				this.player.tiledTile.x += 2;
				var dialog = cc.instantiate(this.resizeDialog).getComponent("moduleDialog").init("---B1---","门打不开");
				cc.find("Canvas").getChildByName("Main Camera").addChild(dialog.node);
				break;
			case "lift":	
				if(this.thing[5] == 0){
                    this.player.tiledTile.y ++;
					var dialog = cc.instantiate(this.resizeDialog).getComponent("moduleDialog").init("---B1---","没有电梯卡，不能坐电梯");
					cc.find("Canvas").getChildByName("Main Camera").addChild(dialog.node);
                }    
                else{
                    cc.sys.localStorage.setItem('playerScene', JSON.stringify("F5"));
		            cc.sys.localStorage.setItem('playerX', JSON.stringify(74));
		            cc.sys.localStorage.setItem('playerY', JSON.stringify(25));
					cc.director.loadScene("F5");
                } 
				break;
			case "bookleft":
				if(this.thing[7] == 0){
					this.player.tiledTile.x -= 2;
					var dialog = cc.instantiate(this.resizeDialog).getComponent("moduleDialog").init("---B1---","需要一本古籍才能通过");
					cc.find("Canvas").getChildByName("Main Camera").addChild(dialog.node);
				}
				break;	
			case "bookright":	
				if(this.thing[7] == 0){
				this.player.tiledTile.x += 2;
				var dialog = cc.instantiate(this.resizeDialog).getComponent("moduleDialog").init("---B1---","需要一本古籍才能通过");
				cc.find("Canvas").getChildByName("Main Camera").addChild(dialog.node);
				}
				break;
        }
        
    },

    onLoad () {
        // 读取初始化物品信息
        this.thing = JSON.parse(cc.sys.localStorage.getItem('Bag'));
        // 加入消息监听
        this.node.on("sent",this.dealmessage,this);
        // 将脚本内声明的变量指向对应的图层
        this.Button = this.node.getChildByName("Thing").getChildByName("B1-Button");
        this.Soil = this.node.getChildByName("Thing").getChildByName("B1-Soil");
        // 获取人物图层
        this.player = this.node.parent.getChildByName("4-B1").getChildByName("Shelf").getChildByName("Character");
        this.player.tiledTile = this.player.getComponent(cc.TiledTile);
    },

    start () {
    },

    update (dt) {
        
    },
});
