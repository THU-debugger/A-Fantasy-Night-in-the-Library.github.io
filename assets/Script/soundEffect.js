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

        buttonSound:{
            type: cc.AudioClip,
            default: null,
        },
        pickSound: {
            type: cc.AudioClip,
            default: null,
        },
        switchSound: {
            type: cc.AudioClip,
            default: null,
        },
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

    onLoad () {
        cc.game.addPersistRootNode(this.node);
        
        /*var music = JSON.parse(cc.sys.localStorage.getItem('music'));
        if (music != 0) {
            this.play();
        }*/
    },

    mainPlay: function () {
        var effect = JSON.parse(cc.sys.localStorage.getItem('effect'));
        if (effect != 0) {
            this.seChannel = cc.audioEngine.play(this.mainSound, false, 1);
        }
    },

    buttonPlay: function () {
        var effect = JSON.parse(cc.sys.localStorage.getItem('effect'));
        if (effect != 0) {
            this.seChannel = cc.audioEngine.play(this.buttonSound, false, 1);
        }
    },

    pickPlay: function () {
        var effect = JSON.parse(cc.sys.localStorage.getItem('effect'));
        if (effect != 0) {
            this.seChannel = cc.audioEngine.play(this.pickSound, false, 1);
        }
    },

    switchPlay: function () {
        var effect = JSON.parse(cc.sys.localStorage.getItem('effect'));
        if (effect != 0) {
            this.seChannel = cc.audioEngine.play(this.switchSound, false, 1);
        }
    },

    pause: function () {
        cc.audioEngine.pause(this.seChannel);
    },

    start () {

    },

    // update (dt) {},
});
