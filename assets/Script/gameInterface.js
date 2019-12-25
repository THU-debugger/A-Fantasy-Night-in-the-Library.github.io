// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var sceneName = "";
cc.Class({
    extends: cc.Component,

    properties: {
        button: cc.button,
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

    // onLoad () {},
    onLoad: function () {
        this.button.node.on('click', this.callback.this);
    },

    mainMenuCallback: function (button, x) {
        this.effectPlayer = cc.find("soundEffect").getComponent("soundEffect");
        this.effectPlayer.buttonPlay();

        sceneName = "mainMenu";
        if (x == 1) {
            //cc.director.loadScene("login&signup");
        }
        else if (x == 2) {
            cc.director.loadScene("openingAnimation");
        }
        else if (x == 3) {
            cc.director.loadScene("F1");
        }
        else if (x == 4) {
            //cc.director.loadScene("achievements");
        }
        else if (x == 5) {
            cc.director.loadScene("settings");
            
        }
    },

    openingAnimationCallback: function (button, x) {
        this.effectPlayer = cc.find("soundEffect").getComponent("soundEffect");
        this.effectPlayer.buttonPlay();
        
        if (x == 1) {
            cc.director.loadScene("mainMenu");
        }
        else if (x == 2) {
            cc.director.loadScene("F1");
        }
    },

    virtualGameCallback: function (button, x) {
        this.effectPlayer = cc.find("soundEffect").getComponent("soundEffect");
        this.effectPlayer.buttonPlay();
        
        sceneName = "F1";
        if (x == 1) {
            cc.director.loadScene("pauseMenu");
        }
        else if (x == 2) {
            cc.director.loadScene("");
        }
    },

    pauseMenuCallback: function (button, x) {
        this.effectPlayer = cc.find("soundEffect").getComponent("soundEffect");
        this.effectPlayer.buttonPlay();
        
        sceneName = "pauseMenu";
        if (x == 1) {
            cc.director.loadScene("F1");
        }
        else if (x == 2) {
            cc.director.loadScene("saveFinish");
        }
        else if (x == 3) {
            //cc.director.loadScene("achievements");
        }
        else if (x == 4) {
            cc.director.loadScene("settings");
        }
        else if (x == 5) {
            cc.director.loadScene("confirm");
        }
    },

    saveFinishCallback: function (button, x) {
        this.effectPlayer = cc.find("soundEffect").getComponent("soundEffect");
        this.effectPlayer.buttonPlay();
        
        if (x == 1) {
            cc.director.loadScene("pauseMenu");
        }
    },

    confirmCallback: function (button, x) {
        this.effectPlayer = cc.find("soundEffect").getComponent("soundEffect");
        this.effectPlayer.buttonPlay();
        
        if (x == 1) {
            cc.director.loadScene("mainMenu");
        }
        else if (x == 2) {
            cc.director.loadScene("pauseMenu");
        }
    },

    settingsCallback: function (button, x) {
        var effect = JSON.parse(cc.sys.localStorage.getItem('effect'));
        this.effectPlayer = cc.find("soundEffect").getComponent("soundEffect");
        this.effectPlayer.buttonPlay();
        
        var preScene = sceneName;
        if (x == 1) {
            if (preScene == "") {
                cc.director.loadScene("mainMenu");
            }
            else {
                cc.director.loadScene(preScene);
            }
        }
        else if (x == 2) {
            var music = JSON.parse(cc.sys.localStorage.getItem('music'));
            this.musicPlayer = cc.find("music").getComponent("music");
            
            if (music == 0) {
                this.node.parent.getChildByName("musicButton").getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string = "音乐：开";
                cc.sys.localStorage.setItem('music', JSON.stringify(1));
                this.musicPlayer.playMusic();
            }
            else {
                this.node.parent.getChildByName("musicButton").getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string = "音乐：关";
                cc.sys.localStorage.setItem('music', JSON.stringify(0));
                this.musicPlayer.pause();
            }
        }
        else if (x == 3) {
            if (effect == 0) {
                this.node.parent.getChildByName("soundEffectsButton").getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string = "音效：开";
                cc.sys.localStorage.setItem('effect', JSON.stringify(1));
            }
            else {
                this.node.parent.getChildByName("soundEffectsButton").getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string = "音效：关";
                cc.sys.localStorage.setItem('effect', JSON.stringify(0));
            }
        }
        else if (x == 4) {
            cc.director.loadScene("help");
        }
        else if (x == 5) {
            cc.director.loadScene("about");
        }
    },

    helpCallback: function (button, x) {
        this.effectPlayer = cc.find("soundEffect").getComponent("soundEffect");
        this.effectPlayer.buttonPlay();
        
        if (x == 1) {
            cc.director.loadScene("settings");
        }
    },

    aboutCallback: function (button, x) {
        this.effectPlayer = cc.find("soundEffect").getComponent("soundEffect");
        this.effectPlayer.buttonPlay();
        
        if (x == 1) {
            cc.director.loadScene("settings");
        }
    },

    start () {

    },

    // update (dt) {},
});
