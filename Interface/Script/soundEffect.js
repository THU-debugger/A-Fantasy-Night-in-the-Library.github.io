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

        // 按钮音效
        buttonSound:{
            type: cc.AudioClip,
            default: null,
        },

        // 拾取物品音效
        pickSound: {
            type: cc.AudioClip,
            default: null,
        },

        // 切换场景音效
        switchSound: {
            type: cc.AudioClip,
            default: null,
        },
    },

    onLoad () {
        cc.game.addPersistRootNode(this.node);
    },

    // 播放按钮音效
    buttonPlay: function () {
        var effect = JSON.parse(cc.sys.localStorage.getItem('effect'));
        // 判断音效是否打开
        if (effect != 0) {
            this.seChannel = cc.audioEngine.play(this.buttonSound, false, 1);
        }
    },

    // 播放拾取音效
    pickPlay: function () {
        var effect = JSON.parse(cc.sys.localStorage.getItem('effect'));
        if (effect != 0) {
            this.seChannel = cc.audioEngine.play(this.pickSound, false, 1);
        }
    },

    // 播放切换场景音效
    switchPlay: function () {
        var effect = JSON.parse(cc.sys.localStorage.getItem('effect'));
        if (effect != 0) {
            this.seChannel = cc.audioEngine.play(this.switchSound, false, 1);
        }
    },

    // 暂停音效
    pause: function () {
        cc.audioEngine.pause(this.seChannel);
    },

    start () {}
});
