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
		moveable: true
    },
	// LIFE-CYCLE CALLBACKS:
	
    onLoad () {
		//起始状态
		this.start = this.node.getChildByName('f1');
		this.anim = this.getComponent(cc.Animation);
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
				break;
			case cc.macro.KEY.up:
				this.playAnim('Back');
				this.node.anchorX = 0;
				break;
			case cc.macro.KEY.left:
				this.playAnim('Left');
				this.node.anchorX = -0.5;
				break;
			case cc.macro.KEY.right:
				this.playAnim('Right');
				this.node.anchorX = -0.5;
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
	},
	
	onDestroy () {
		//取消监听
		cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
		// cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
	},
});
