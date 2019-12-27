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
        button: cc.button,

        bgMusic: {
            type: cc.AudioClip,
            default: null,
        },
    },

    onLoad () {
        cc.game.addPersistRootNode(this.node);
        // 全局播放器，只在mainMenu第一次load或设置音乐开的时候播放
        this.playMusic();
    },

    // 播放
    playMusic: function () {
        var music = JSON.parse(cc.sys.localStorage.getItem('music'));
        // 判断音乐是否打开
        if (music != 0) {
            this.musicChannel = cc.audioEngine.play(this.bgMusic, true, 1);
        }
    },

    // 暂停
    pause: function () {
        cc.audioEngine.pause(this.musicChannel);
    },

    start () {}
});
