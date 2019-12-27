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
        // ����ߴ�
        playersize: cc.v2(0, 0),
        Wall: cc.TiledLayer,
        Collision: cc.TiledLayer,
        OutCollision: cc.TiledLayer,
        Computer: cc.TiledLayer,
        Camera: cc.Camera,
        // ���ڼ�¼�����λ��
        deltax: 0,
        deltay: 0,
        scene: "ComputerRoom1",
        scene: "ComputerRoom2",
        scene: "ComputerRoom3",
        scene: "ComputerRoom4",
        scene: "ComputerRoom5",
        scene: "FinalRoom"
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        //��ʼ״̬
        this.start = this.node.getChildByName('f1');
        this.anim = this.getComponent(cc.Animation);
        // ��ȡtiledmap��Դ
        this.node.parent.parent.tiledMap = this.node.parent.parent.getComponent(cc.TiledMap);
        // ��ȡtiledtile�ĳ���
        this.playersize = this.node.parent.parent.tiledMap.getTileSize();
        // ��ȡGround��������ڽ�Tiledtile��ɾȥ����ʾ�Ѿ��߹���Ч��
        this.node.parent.tiledLayer = this.node.parent.getComponent(cc.TiledLayer);
        // ��ȡWall��ͼ����Ϣ
        this.Wall = this.node.parent.parent.getChildByName("Wall");
        this.Wall.tiledLayer = this.Wall.getComponent(cc.TiledLayer);
        this.Computer = this.node.parent.parent.getChildByName("Computer");
        this.Computer.tiledLayer = this.Computer.getComponent(cc.TiledLayer);
        this.Collision = this.node.parent.parent.getChildByName("Collision");
        this.Collision.tiledLayer = this.Collision.getComponent(cc.TiledLayer);
        this.OutCollision = this.node.parent.parent.getChildByName("OutCollision");
        this.OutCollision.tiledLayer = this.OutCollision.getComponent(cc.TiledLayer);
        // ��ȡtiledtile��Ϣ��������ҳ�ʼλ��
        this.tiledTile = this.getComponent(cc.TiledTile);
        this.Camera = this.node.parent.parent.parent.getChildByName("Main Camera");
        //this.Camera = cc.find("Main Camera");
        this.deltax = this.Camera.x - this.node.x;
        this.deltay = this.Camera.y - this.node.y;
        // ��ʼ��playerͼ���С�����ϵ�ͼ
        this.node.height = this.playersize.height;
        this.node.width = this.playersize.width;
       //��ʼ����
		cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
		// cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
		this.node.on("restart",this.restart_move,this);
		this.node.on("stop",this.stop_move,this);
	},
	
	restart_move(message) {
		cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
	},
	
	stop_move(message) {
		cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
	},
    // when key is pressed;
    onKeyDown(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.down:
                this.playAnim('Front');
                this.node.anchorX = 0;
                // ���ǰ���ķ��������ϰ�����ƶ�
                if (this.Wall.tiledLayer.getTileGIDAt(this.tiledTile.x, this.tiledTile.y + 1) != 0)
                    break;
                if (this.Collision.tiledLayer.getTileGIDAt(this.tiledTile.x, this.tiledTile.y + 1) != 0) {
                    var CollisionID = this.Collision.tiledLayer.getTileGIDAt(this.tiledTile.x, this.tiledTile.y + 1);
                    console.log(CollisionID);
                    // console.log("ComputerRoom1");
                    cc.loader.loadRes("Computer_Event", function (err, object) {
                        if (err) {
                            cc.error(err);
                            return;
                        }
                        console.log(CollisionID);
                        var scene_name = JSON.stringify(object.json[String(CollisionID)]).slice(1, -1);
                        cc.director.loadScene(scene_name);
                    })
                    break;
                }
                if (this.OutCollision.tiledLayer.getTileGIDAt(this.tiledTile.x, this.tiledTile.y + 1) != 0) {
                    cc.find("Canvas").getComponent("back_map").leave = true;
                    cc.find("Canvas").getComponent("back_map").back_to_map();
                }
                this.tiledTile.y += 1;
                break;
            case cc.macro.KEY.up:
                this.playAnim('Back');
                this.node.anchorX = 0;
                // ���ǰ���ķ��������ϰ�����ƶ�
                if (this.Wall.tiledLayer.getTileGIDAt(this.tiledTile.x, this.tiledTile.y - 1) != 0)
                    break;
                if (this.Collision.tiledLayer.getTileGIDAt(this.tiledTile.x, this.tiledTile.y - 1) != 0) {
                    var CollisionID = this.Collision.tiledLayer.getTileGIDAt(this.tiledTile.x, this.tiledTile.y - 1);
                    console.log(CollisionID);
                    cc.loader.loadRes("Computer_Event", function (err, object) {
                        if (err) {
                            cc.error(err);
                            return;
                        }
                        console.log(CollisionID);
                        var scene_name = JSON.stringify(object.json[String(CollisionID)]).slice(1, -1);
                        cc.director.loadScene(scene_name);
                    })
                    break;
                }
			    if (this.OutCollision.tiledLayer.getTileGIDAt(this.tiledTile.x, this.tiledTile.y - 1) != 0) {
                    cc.find("Canvas").getComponent("back_map").destroy = true;
                    cc.find("Canvas").destroy;
                }
                this.tiledTile.y += -1;
                break;
            case cc.macro.KEY.left:
                this.playAnim('Left');
                this.node.anchorX = -0.5;
                // ���ǰ���ķ��������ϰ�����ƶ�
                if (this.Wall.tiledLayer.getTileGIDAt(this.tiledTile.x - 1, this.tiledTile.y) != 0)
                    break;
                if (this.Collision.tiledLayer.getTileGIDAt(this.tiledTile.x - 1, this.tiledTile.y) != 0) {
                    var CollisionID = this.Collision.tiledLayer.getTileGIDAt(this.tiledTile.x - 1, this.tiledTile.y);
                    console.log(CollisionID);
                    cc.loader.loadRes("Computer_Event", function (err, object) {
                        if (err) {
                            cc.error(err);
                            return;
                        }
                        console.log(CollisionID);
                        var scene_name = JSON.stringify(object.json[String(CollisionID)]).slice(1, -1);
                        cc.director.loadScene(scene_name);
                    })
                    break;
                }
				if (this.OutCollision.tiledLayer.getTileGIDAt(this.tiledTile.x - 1, this.tiledTile.y) != 0) {
                    cc.find("Canvas").getComponent("back_map").destroy = true;
                    cc.find("Canvas").destroy;
                }
                this.tiledTile.x += -1;
                break;
            case cc.macro.KEY.right:
                this.playAnim('Right');
                this.node.anchorX = -0.5;
                // ���ǰ���ķ��������ϰ�����ƶ�
                if (this.Wall.tiledLayer.getTileGIDAt(this.tiledTile.x + 1, this.tiledTile.y) != 0)
                    break;
                if (this.Collision.tiledLayer.getTileGIDAt(this.tiledTile.x + 1, this.tiledTile.y) != 0) {
                    var CollisionID = this.Collision.tiledLayer.getTileGIDAt(this.tiledTile.x + 1, this.tiledTile.y);
                    console.log(CollisionID);
                    cc.loader.loadRes("Computer_Event", function (err, object) {
                        if (err) {
                            cc.error(err);
                            return;
                        }
                        console.log(CollisionID);
                        var scene_name = JSON.stringify(object.json[String(CollisionID)]).slice(1, -1);
                        cc.director.loadScene(scene_name);
                    })
                    break;
                }
				if (this.OutCollision.tiledLayer.getTileGIDAt(this.tiledTile.x + 1, this.tiledTile.y) != 0) {
                    cc.find("Canvas").getComponent("back_map").destroy = true;
                    cc.find("Canvas").destroy;
                }
                this.tiledTile.x += 1;
                break;
            default:
                break;
        }
    },

    // ����clipƬ�Σ�clip��String
    playAnim(clip) {
        this.start.active = false;
        if (this.anim.getAnimationState(clip).isPlaying) {
            return;
        }// �жϵ�ǰ�����Ƿ������У��������¿�ʼ����
        var animState = this.anim.play(clip);
        animState.speed = this.animSpeed;
    },
    // ֹͣ���ţ���������ֹͣ�ڵ�һ֡
    stopAnim() {
        var currentClip = this.anim.currentClip.name;
        this.anim.stop();
        this.anim.play(currentClip, 0);
        this.anim.sample(currentClip);
        this.anim.stop();
    },

    update(dt) {
        //this.Camera.x = this.node.x + this.deltax;
        //this.Camera.y = this.node.y + this.deltay;
    },

    onDestroy() {
        //ȡ������
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        // cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },
});
