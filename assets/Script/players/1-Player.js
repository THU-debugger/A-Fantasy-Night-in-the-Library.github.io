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
		//传送带游戏
		RightDeriction: cc.TiledLayer,
		LeftDeriction: cc.TiledLayer,
		UpDeriction: cc.TiledLayer,
		DownDeriction: cc.TiledLayer,
		//推箱子游戏
		Box: cc.TiledLayer,
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
		
		// 获取箱子的图块信息
		this.Box = this.node.parent.parent.getChildByName("Box");
		this.Box.tiledLayer = this.Box.getComponent(cc.TiledLayer);
		// 获取方向键的信息
        this.UpDeriction = this.node.parent.parent.getChildByName("Up");
        this.UpDeriction.tiledLayer = this.UpDeriction.getComponent(cc.TiledLayer);
        this.DownDeriction = this.node.parent.parent.getChildByName("Down");
        this.DownDeriction.tiledLayer = this.DownDeriction.getComponent(cc.TiledLayer);
        this.LeftDeriction = this.node.parent.parent.getChildByName("Left");
        this.LeftDeriction.tiledLayer = this.LeftDeriction.getComponent(cc.TiledLayer);
        this.RightDeriction = this.node.parent.parent.getChildByName("Right");
		this.RightDeriction.tiledLayer = this.RightDeriction.getComponent(cc.TiledLayer);
		
        // 获取tiledtile信息，设置玩家初始位置
		this.tiledTile = this.node.getComponent(cc.TiledTile);
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
				(this.Shelf.tiledLayer.getTileGIDAt(this.tiledTile.x, this.tiledTile.y + 1) != 0 ) ){
					console.log("11111");
					break;
				}
				//push_box, by Wang LuYao
				//console.log("00000");
				if ((this.Box.tiledLayer.getTileGIDAt(this.tiledTile.x, this.tiledTile.y + 1)) && 
				(this.Wall.tiledLayer.getTileGIDAt(this.tiledTile.x, this.tiledTile.y + 2))) {
					//alert("Barrier!");
					console.log("22222");
					break;
				} else if(this.Box.tiledLayer.getTileGIDAt(this.tiledTile.x, this.tiledTile.y + 1) &&
				(this.Box.tiledLayer.getTileGIDAt(this.tiledTile.x, this.tiledTile.y + 2))){
					//alert("Too Many Box!");
					console.log("33333");
					break;
				} else if (this.Box.tiledLayer.getTileGIDAt(this.tiledTile.x, this.tiledTile.y + 1)) {//有箱子且无障碍物
					console.log("44444");
					//this.Box.tiledLayer.getTiledTileAt(this.tiledTile.x, this.tiledTile.y - 1).y -= 1;
					this.pushGid = this.Box.tiledLayer.getTileGIDAt(this.tiledTile.x, this.tiledTile.y + 1);
					this.Box.tiledLayer.setTileGIDAt(0,this.tiledTile.x, this.tiledTile.y + 1);
					this.tiledTile.y += 1; 
					//console.log(this.pushGid);                    
					this.Box.tiledLayer.setTileGIDAt(this.pushGid,this.tiledTile.x,this.tiledTile.y+1,1);  
					
					//  this.Player.tiledLayer.getTiledTileAt(this.Player.tiledTile.x, this.Player.tiledTile.y).y ++;
					break;
				}
				this.tiledTile.y += 1;
				break;
			case cc.macro.KEY.up:
				this.playAnim('Back');
				this.node.anchorX = 0;
				// 如果前进的方向上有障碍物，则不移动
				if( (this.Grass.tiledLayer.getTileGIDAt(this.tiledTile.x, this.tiledTile.y - 1) != 0 ) ||
				(this.Wall.tiledLayer.getTileGIDAt(this.tiledTile.x, this.tiledTile.y - 1) != 0 ) ||
				(this.Ornament.tiledLayer.getTileGIDAt(this.tiledTile.x, this.tiledTile.y - 1) != 0 ) ||
				(this.Shelf.tiledLayer.getTileGIDAt(this.tiledTile.x, this.tiledTile.y - 1) != 0 ) ){
					console.log("11111");
					break;
				}
				//推箱子判断
				if ((this.Box.tiledLayer.getTileGIDAt(this.tiledTile.x, this.tiledTile.y - 1)) && 
				(this.Wall.tiledLayer.getTileGIDAt(this.tiledTile.x, this.tiledTile.y - 2))) {
					console.log("22222");
					//alert("Barrier!");
					break;
				} else if(this.Box.tiledLayer.getTileGIDAt(this.tiledTile.x, this.tiledTile.y - 1) &&
				(this.Box.tiledLayer.getTileGIDAt(this.tiledTile.x, this.tiledTile.y - 2))){
					console.log("33333");
					//alert("Too Many Box!");
					break;
				} else if (this.Box.tiledLayer.getTileGIDAt(this.tiledTile.x, this.tiledTile.y - 1)) {//有箱子且无障碍物
					//this.Box.tiledLayer.getTiledTileAt(this.tiledTile.x, this.tiledTile.y - 1).y -= 1;
					console.log("44444");
					this.pushGid = this.Box.tiledLayer.getTileGIDAt(this.tiledTile.x, this.tiledTile.y - 1);
					this.Box.tiledLayer.setTileGIDAt(0,this.tiledTile.x, this.tiledTile.y - 1);
					this.tiledTile.y -= 1; 
					//console.log(this.pushGid);                    
					this.Box.tiledLayer.setTileGIDAt(this.pushGid,this.tiledTile.x,this.tiledTile.y-1,1);  
					
					//  this.Player.tiledLayer.getTiledTileAt(this.Player.tiledTile.x, this.Player.tiledTile.y).y ++;
					break;
				}
				this.tiledTile.y += -1;
				break;
			case cc.macro.KEY.left:
				this.playAnim('Left');
				this.node.anchorX = -0.5;
				// 如果前进的方向上有障碍物，则不移动
				if( (this.Grass.tiledLayer.getTileGIDAt(this.tiledTile.x - 1, this.tiledTile.y) != 0 ) ||
				(this.Wall.tiledLayer.getTileGIDAt(this.tiledTile.x - 1, this.tiledTile.y) != 0 ) ||
				(this.Ornament.tiledLayer.getTileGIDAt(this.tiledTile.x - 1, this.tiledTile.y) != 0 ) ||
				(this.Shelf.tiledLayer.getTileGIDAt(this.tiledTile.x - 1, this.tiledTile.y) != 0 ) ){
					console.log("11111");
					break;
				}
				//推箱子判断
				if ((this.Box.tiledLayer.getTileGIDAt(this.tiledTile.x - 1, this.tiledTile.y)) && 
				(this.Wall.tiledLayer.getTileGIDAt(this.tiledTile.x - 2, this.tiledTile.y))) {
					//alert("Barrier!");
					console.log("22222");
					break;
				} else if(this.Box.tiledLayer.getTileGIDAt(this.tiledTile.x - 1, this.tiledTile.y) &&
				(this.Box.tiledLayer.getTileGIDAt(this.tiledTile.x - 2, this.tiledTile.y))){
					//alert("Too Many Box!");
					console.log("33333");
					break;
				} else if (this.Box.tiledLayer.getTileGIDAt(this.tiledTile.x - 1, this.tiledTile.y)) {//有箱子且无障碍物
					//this.Box.tiledLayer.getTiledTileAt(this.tiledTile.x, this.tiledTile.y - 1).y -= 1;
					console.log("44444");
					this.pushGid = this.Box.tiledLayer.getTileGIDAt(this.tiledTile.x - 1, this.tiledTile.y);
					this.Box.tiledLayer.setTileGIDAt(0,this.tiledTile.x - 1, this.tiledTile.y);
					this.tiledTile.x -= 1; 
					//console.log(this.pushGid);                    
					this.Box.tiledLayer.setTileGIDAt(this.pushGid,this.tiledTile.x - 1,this.tiledTile.y,1);  
					
					//  this.Player.tiledLayer.getTiledTileAt(this.Player.tiledTile.x, this.Player.tiledTile.y).y ++;
					break;
				}
				this.tiledTile.x += -1;
				break;
			case cc.macro.KEY.right:
				this.playAnim('Right');
				this.node.anchorX = -0.5;
				// 如果前进的方向上有障碍物，则不移动
				if( (this.Grass.tiledLayer.getTileGIDAt(this.tiledTile.x + 1, this.tiledTile.y) != 0 ) ||
				(this.Wall.tiledLayer.getTileGIDAt(this.tiledTile.x + 1, this.tiledTile.y) != 0 ) ||
				(this.Ornament.tiledLayer.getTileGIDAt(this.tiledTile.x + 1, this.tiledTile.y) != 0 ) ||
				(this.Shelf.tiledLayer.getTileGIDAt(this.tiledTile.x + 1, this.tiledTile.y) != 0 ) ){
					console.log("11111");
					break;
				}
				//推箱子判断
				if ((this.Box.tiledLayer.getTileGIDAt(this.tiledTile.x + 1, this.tiledTile.y)) && 
				(this.Wall.tiledLayer.getTileGIDAt(this.tiledTile.x + 2, this.tiledTile.y))) {
					console.log("22222");
					//alert("Barrier!");
					break;
				} else if(this.Box.tiledLayer.getTileGIDAt(this.tiledTile.x + 1, this.tiledTile.y) &&
				(this.Box.tiledLayer.getTileGIDAt(this.tiledTile.x + 2, this.tiledTile.y))){
					console.log("33333");
					//alert("Too Many Box!");
					break;
				} else if (this.Box.tiledLayer.getTileGIDAt(this.tiledTile.x + 1, this.tiledTile.y)) {//有箱子且无障碍物
					//this.Box.tiledLayer.getTiledTileAt(this.tiledTile.x, this.tiledTile.y - 1).y -= 1;
					console.log("44444");
					this.pushGid = this.Box.tiledLayer.getTileGIDAt(this.tiledTile.x + 1, this.tiledTile.y);
					this.Box.tiledLayer.setTileGIDAt(0,this.tiledTile.x + 1, this.tiledTile.y);
					this.tiledTile.x += 1; 
					//console.log(this.pushGid);                    
					this.Box.tiledLayer.setTileGIDAt(this.pushGid,this.tiledTile.x + 1,this.tiledTile.y,1);  
					
					//  this.Player.tiledLayer.getTiledTileAt(this.Player.tiledTile.x, this.Player.tiledTile.y).y ++;
					break;
				}
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
		if (this.UpDeriction.tiledLayer.getTileGIDAt(this.tiledTile.x, this.tiledTile.y)){
            //console.log("22222");
            this.tiledTile.y --;
        }
        if (this.DownDeriction.tiledLayer.getTileGIDAt(this.tiledTile.x, this.tiledTile.y)){
            //console.log("22222");
            this.tiledTile.y ++;
        }
        if (this.LeftDeriction.tiledLayer.getTileGIDAt(this.tiledTile.x, this.tiledTile.y)){
            //console.log("22222");
            this.tiledTile.x--;
        }
        if (this.RightDeriction.tiledLayer.getTileGIDAt(this.tiledTile.x, this.tiledTile.y)){
            //console.log("22222");
            this.tiledTile.x ++;
        }
	},
	
	onDestroy () {
		//取消监听
		cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
		// cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
	},
});
