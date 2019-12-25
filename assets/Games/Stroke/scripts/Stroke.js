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
        // 行走速度
        times: 1,
        // 人物及地图尺寸
        playersize: cc.v2(0, 0),
        mapsize: cc.v2(0, 0),
        // 用于识别地图中的障碍物
        barrier: cc.TiledLayer,
        barrierNum: 0,
        // 用于识别地图中已走过的地方
        gone: cc.TiledLayer,
        goneNum: 0,
        // 记录已经走过的方块数量
        number: 0,


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
    // 记录键盘按下的函数
    onKeyDown (event) {
        // set a flag when key pressed
        switch(event.keyCode) {
            case ( cc.macro.KEY.up || cc.macro.KEY.w ):
                // 如果前进的方向上有障碍物，则给出提示并不移动
                if(this.barrier.tiledLayer.getTileGIDAt(this.tiledTile.x, this.tiledTile.y - 1) == this.barrierNum){
                    alert("Barrier!");
                    break;
                }
                // 如果走到已经走过的地方，则提示失败并不移动
                else if(this.node.parent.tiledLayer.getTileGIDAt(this.tiledTile.x, this.tiledTile.y - 1) == this.goneNum){
                    alert("Fail!");
                    cc.director.loadScene("Stroke");
                    break;
                }
                this.tiledTile.y += -1 * this.times;
                this.number ++;
                break;
            case ( cc.macro.KEY.down || cc.macro.KEY.s ):
                // 如果前进的方向上有障碍物，则给出提示并不移动
                if(this.barrier.tiledLayer.getTileGIDAt(this.tiledTile.x, this.tiledTile.y + 1) == this.barrierNum){
                    alert("Barrier!");
                    break;
                }
                // 如果走到已经走过的地方，则提示失败并不移动
                else if(this.node.parent.tiledLayer.getTileGIDAt(this.tiledTile.x, this.tiledTile.y + 1) == this.goneNum){
                    alert("Fail!");
                    cc.director.loadScene("Stroke");
                    break;
                }
                this.tiledTile.y += 1 * this.times;
                this.number ++;
                break;
            case ( cc.macro.KEY.left || cc.macro.KEY.a ):
                // 如果前进的方向上有障碍物，则给出提示并不移动
                if(this.barrier.tiledLayer.getTileGIDAt(this.tiledTile.x - 1, this.tiledTile.y) == this.barrierNum){
                    alert("Barrier!");
                    break;
                }
                // 如果走到已经走过的地方，则提示失败并不移动
                else if(this.node.parent.tiledLayer.getTileGIDAt(this.tiledTile.x - 1, this.tiledTile.y) == this.goneNum){
                    alert("Fail!");
                    cc.director.loadScene("Stroke");
                    break;
                }
                this.tiledTile.x += -1 * this.times;
                this.number ++;
                break;
            case ( cc.macro.KEY.right || cc.macro.KEY.d ):
                // 如果前进的方向上有障碍物，则给出提示并不移动
                if(this.barrier.tiledLayer.getTileGIDAt(this.tiledTile.x + 1, this.tiledTile.y) == this.barrierNum){
                    alert("Barrier!");
                    break;
                }
                // 如果走到已经走过的地方，则提示失败并不移动
                else if(this.node.parent.tiledLayer.getTileGIDAt(this.tiledTile.x + 1, this.tiledTile.y) == this.goneNum){
                    alert("Fail!");
                    cc.director.loadScene("Stroke");
                    break;
                }
                this.tiledTile.x += 1 * this.times;
                this.number ++;
                break;
        }
        this.node.parent.tiledLayer.setTileGIDAt(this.goneNum, this.tiledTile);
    },

    onLoad () {
        // 便于后续变量的识别
        var grandfather = this.node.parent.parent;
        // 获取tiledmap资源信息
        grandfather.tiledMap = grandfather.getComponent(cc.TiledMap);
        // 获取tiledtile的长宽
        this.playersize = grandfather.tiledMap.getTileSize();
        // 获取地图的tiled块数量
        this.mapsize = grandfather.tiledMap.getMapSize();

        // 获取Ground层对象，用于将Tiledtile块删去以显示已经走过的效果
        this.node.parent.tiledLayer = this.node.parent.getComponent(cc.TiledLayer);
        // 获取barrier的图块信息
        this.barrier = this.node.parent.parent.getChildByName("Barrier");
        this.barrier.tiledLayer = this.barrier.getComponent(cc.TiledLayer);
        this.barrierNum = this.barrier.tiledLayer.getTileGIDAt(0, 0);
        // 获取gone的图块信息
        this.gone = this.node.parent.parent.getChildByName("Gone");
        this.gone.tiledLayer = this.gone.getComponent(cc.TiledLayer);
        this.goneNum = this.gone.tiledLayer.getTileGIDAt(6, 0);

        // 获取tiledtile信息，设置玩家初始位置
        this.tiledTile = this.getComponent(cc.TiledTile);
        this.tiledTile.x = this.mapsize.width / 2;
        this.tiledTile.y = this.mapsize.height - 1;
        this.node.parent.tiledLayer.setTileGIDAt(this.goneNum, this.tiledTile);
        
        // 初始化player图像大小，符合地图
        this.node.height = this.playersize.height;
        this.node.width = this.playersize.width;

        // 设置刷新时间
        // cc.game.setFrameRate(15);
        // 初始化键盘输入监听
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    },

    
    start () {
    },

    update (dt) {
        if( this.number == 39){
            alert("Success!");
            cc.find("Canvas").destroy();
        }        
    },
});
