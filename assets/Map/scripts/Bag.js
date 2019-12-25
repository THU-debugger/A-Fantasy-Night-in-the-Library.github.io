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
        // 创建数组用于记录各个物品的获取情况，0为未有，1为已有
        thing: [cc.Integer],
        // 记录背包是否可见
        visible: false,
        key: cc.Component,
        star: cc.Component,
        book: cc.Component,
        ACard: cc.Component,
        BCard: cc.Component,
        CCard: cc.Component,
        axe: cc.Component,
        book2: cc.Component,
        key2: cc.Component,
        // 挂载在人物节点下面
        player: cc.TiledTile,
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

    onKeyDown(event){
        if(event.keyCode == cc.macro.KEY.enter)
        this.visible = !this.visible;
        this.node.opacity = this.visible * 155;
	},

    onLoad () {
        // 初始化背包显示的位置
        this.player = this.node.parent;
        this.player.tiledTile = this.player.getComponent(cc.TiledTile);
        this.node.x = 960 / 2 - this.node.width * 1.1;
        this.node.y = 10;
        // 加入键盘监听，将背包初始化为不可见
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        this.node.opacity = this.visible * 255;

        // 背包内各个物品的情况，有即可见，没有即不可见
        this.key = this.node.getChildByName("key");
        this.star = this.node.getChildByName("star");
        this.book = this.node.getChildByName("book");
        this.ACard = this.node.getChildByName("ACard");
        this.BCard = this.node.getChildByName("BCard");
        this.CCard = this.node.getChildByName("card3");
        this.axe = this.node.getChildByName("axe");
        this.book2 = this.node.getChildByName("book2");
        this.key2 = this.node.getChildByName("key2");
        for(var i = 0; i < 9; i++)
            this.thing[i] = 0;
    },

    start () {
    },

    update (dt) {
        // 读取背包情况
        this.thing = JSON.parse(cc.sys.localStorage.getItem('Bag'));
        // 设置背包内物品的可见情况
        if (this.thing[0] != 0)
            this.key.opacity = 255;
        else
            this.key.opacity = 0;
        if (this.thing[1] != 0)
            this.star.opacity = 255;
        else
            this.star.opacity = 0;
        this.book.opacity = this.thing[2] * 255;
        this.ACard.opacity = this.thing[3] * 255;
        this.BCard.opacity = this.thing[4] * 255;
        this.CCard.opacity = this.thing[5] * 255;
        this.axe.opacity = this.thing[6] * 255;
        this.book2.opacity = this.thing[7] * 255;
        this.key2.opacity = this.thing[8] * 255;
    },
});
