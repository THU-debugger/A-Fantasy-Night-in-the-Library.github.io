// Created by XIA Yuke
/* This document is to contorl the movement of player, using Keyboard;

 * UP: move upwards;
 * DOWN: move downwards;
 * LEFT: move to the left;
 * RIGHT: move to the right;
 * You can use two keys at the same time ;
 * When 'SHIFT' is pressed, the player will be speed up;
 */
cc.Class({
    extends: cc.Component,
    properties: {
		animSpeed: 1,
		moveable: true,
		// 人物尺寸
        playersize: cc.v2(0, 0),
        // 用于识别地图中的障碍物
        Grass: cc.TiledLayer,
		Wall: cc.TiledLayer,
		Ornament: cc.TiledLayer,
		Shelf: cc.TiledLayer,
		Camera: cc.Camera,
		// 用于记录主相机位置
		deltax: 0,
		deltay: 0,
    },
	// LIFE-CYCLE CALLBACKS:
	
    onLoad () {
		//起始状态
		this.start = this.node.getChildByName('f1');
		this.anim = this.getComponent(cc.Animation);

        // 获取tiledmap资源
        this.node.parent.parent.tiledMap = this.node.parent.parent.getComponent(cc.TiledMap);
        // 获取tiledtile的长宽
		this.playersize = this.node.parent.parent.tiledMap.getTileSize();

        // 获取Ground层对象，用于将Tiledtile块删去以显示已经走过的效果
        this.node.parent.tiledLayer = this.node.parent.getComponent(cc.TiledLayer);
        // 获取Grass的图块信息
        this.Grass = this.node.parent.parent.getChildByName("Grass");
        this.Grass.tiledLayer = this.Grass.getComponent(cc.TiledLayer);
        // 获取Wall的图块信息
        this.Wall = this.node.parent.parent.getChildByName("Wall");
		this.Wall.tiledLayer = this.Wall.getComponent(cc.TiledLayer);
		// 获取Ornament的图块信息
        this.Ornament = this.node.parent.parent.getChildByName("Ornament");
		this.Ornament.tiledLayer = this.Ornament.getComponent(cc.TiledLayer);
		// 获取Shelf的图块信息
        this.Shelf = this.node.parent.parent.getChildByName("Shelf");
        this.Shelf.tiledLayer = this.Shelf.getComponent(cc.TiledLayer);

        // 获取tiledtile信息，设置玩家初始位置
		this.tiledTile = this.getComponent(cc.TiledTile);
		this.Camera = this.node.parent.parent.parent.getChildByName("Main Camera");
		this.Camera.x = this.node.x;
		this.Camera.y = this.node.y;

		
        // 初始化player图像大小，符合地图
        this.node.height = this.playersize.height;
		this.node.width = this.playersize.width;
		

		//开始监听
		cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
		// cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
	},
	
	// when key is pressed;
	onKeyDown(event){
		switch(event.keyCode){
			case cc.macro.KEY.down:
				this.playAnim('Front');
				this.node.anchorX = 0;
				// 如果前进的方向上有障碍物，则不移动
				if( (this.Grass.tiledLayer.getTileGIDAt(this.tiledTile.x, this.tiledTile.y + 1) != 0 ) ||
				(this.Wall.tiledLayer.getTileGIDAt(this.tiledTile.x, this.tiledTile.y + 1) != 0 ) ||
				(this.Ornament.tiledLayer.getTileGIDAt(this.tiledTile.x, this.tiledTile.y + 1) != 0 ) ||
				(this.Shelf.tiledLayer.getTileGIDAt(this.tiledTile.x, this.tiledTile.y + 1) != 0 ) )
                    break;
				this.tiledTile.y += 1;
				break;
			case cc.macro.KEY.up:
				this.playAnim('Back');
				this.node.anchorX = 0;
				// 如果前进的方向上有障碍物，则不移动
				if( (this.Grass.tiledLayer.getTileGIDAt(this.tiledTile.x, this.tiledTile.y - 1) != 0 ) ||
				(this.Wall.tiledLayer.getTileGIDAt(this.tiledTile.x, this.tiledTile.y - 1) != 0 ) ||
				(this.Ornament.tiledLayer.getTileGIDAt(this.tiledTile.x, this.tiledTile.y - 1) != 0 ) ||
				(this.Shelf.tiledLayer.getTileGIDAt(this.tiledTile.x, this.tiledTile.y - 1) != 0 ) )
                    break;
				this.tiledTile.y += -1;
				break;
			case cc.macro.KEY.left:
				this.playAnim('Left');
				this.node.anchorX = -0.5;
				// 如果前进的方向上有障碍物，则不移动
				if( (this.Grass.tiledLayer.getTileGIDAt(this.tiledTile.x - 1, this.tiledTile.y) != 0 ) ||
				(this.Wall.tiledLayer.getTileGIDAt(this.tiledTile.x - 1, this.tiledTile.y) != 0 ) ||
				(this.Ornament.tiledLayer.getTileGIDAt(this.tiledTile.x - 1, this.tiledTile.y) != 0 ) ||
				(this.Shelf.tiledLayer.getTileGIDAt(this.tiledTile.x - 1, this.tiledTile.y) != 0 ) )
                    break;
				this.tiledTile.x += -1;
				break;
			case cc.macro.KEY.right:
				this.playAnim('Right');
				this.node.anchorX = -0.5;
				// 如果前进的方向上有障碍物，则不移动
				if( (this.Grass.tiledLayer.getTileGIDAt(this.tiledTile.x + 1, this.tiledTile.y) != 0 ) ||
				(this.Wall.tiledLayer.getTileGIDAt(this.tiledTile.x + 1, this.tiledTile.y) != 0 ) ||
				(this.Ornament.tiledLayer.getTileGIDAt(this.tiledTile.x + 1, this.tiledTile.y) != 0 ) ||
				(this.Shelf.tiledLayer.getTileGIDAt(this.tiledTile.x + 1, this.tiledTile.y) != 0 ) )
                    break;
				this.tiledTile.x += 1;
				break;
			default:
				break;			
		}
	},

	// when key is released;
	/*onKeyUp(event){
		switch(event.keyCode){
			case cc.macro.KEY.down:
				break;
			case cc.macro.KEY.up:
				break;
			case cc.macro.KEY.left:
				break;
			case cc.macro.KEY.right:
				break;
			default:
				break;			
		}
	},*/

	/*
	start () {

	},*/
	
	// 播放clip片段，clip：String
	playAnim(clip){
		this.start.active = false;
		if(this.anim.getAnimationState(clip).isPlaying){
			return;
		}// 判断当前动画是否在运行，否则重新开始动画
		var animState = this.anim.play(clip);
		animState.speed = this.animSpeed;
	},
	// 停止播放，并将动画停止在第一帧
	stopAnim(){		
		var currentClip = this.anim.currentClip.name;
		this.anim.stop();
		this.anim.play(currentClip,0);
		this.anim.sample(currentClip);
		this.anim.stop();		
	},

	

	update (dt) {
		this.Camera.x = this.node.x + this.deltax;
		this.Camera.y = this.node.y + this.deltay;
	},
	
	onDestroy () {
		//取消监听
		cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
		// cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
	},
});
