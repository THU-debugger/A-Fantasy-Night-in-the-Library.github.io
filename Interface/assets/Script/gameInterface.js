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
var playing = false;
cc.Class({
    extends: cc.Component,

    properties: {
        button: cc.button
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

    loginSignupCallback: function (button, x) {
        sceneName = "login&signup";
        if (x == 1) {
            cc.director.loadScene("loginOK");
        }
        else if (x == 2) {
            cc.director.loadScene("signupOK");
        }
    },

    loginOKCallback: function (button, x) {
        var preScene = sceneName;
        sceneName = "loginOK";
        if (x == 1) {
            if (preScene == "") {
                cc.director.loadScene("login&signup");
            }
            else {
                cc.director.loadScene(preScene);
            }
        }
        else if (x == 2) {
            cc.director.loadScene("mainMenu");
        }
    },

    signupOKCallback: function (button, x) {
        var preScene = sceneName;
        sceneName = "signupOK";
        if (x == 1) {
            if (preScene == "") {
                cc.director.loadScene("login&signup");
            }
            else {
                cc.director.loadScene(preScene);
            }
        }
        else if (x == 2) {
            cc.director.loadScene("mainMenu");
        }
    },

    mainMenuCallback: function (button, x) {
        sceneName = "mainMenu";
        if (x == 1) {
            cc.director.loadScene("login&signup");
        }
        else if (x == 2) {
            cc.director.loadScene("openingAnimation");
        }
        else if (x == 3) {
            cc.director.loadScene("virtualGame");
        }
        else if (x == 4) {
            cc.director.loadScene("achievements");
        }
        else if (x == 5) {
            cc.director.loadScene("settings");
        }
    },

    openingAnimationCallback: function (button, x) {
        if (x == 1) {
            cc.director.loadScene("mainMenu");
        }
        else if (x == 2) {
            cc.director.loadScene("virtualGame");
        }
    },

    virtualGameCallback: function (button, x) {
        sceneName = "virtualGame";
        if (x == 1) {
            cc.director.loadScene("pauseMenu");
        }
        else if (x == 2) {
            cc.director.loadScene("");
        }
    },

    pauseMenuCallback: function (button, x) {
        sceneName = "pauseMenu";
        if (x == 1) {
            cc.director.loadScene("virtualGame");
        }
        else if (x == 2) {
            cc.director.loadScene("");
        }
        else if (x == 3) {
            cc.director.loadScene("achievements");
        }
        else if (x == 4) {
            cc.director.loadScene("settings");
        }
        else if (x == 5) {
            cc.director.loadScene("mainMenu");
        }
    },

    achievementsCallback: function (button, x) {
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
            cc.director.loadScene("");
        }
    },

    settingsCallback: function (button, x) {
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
            cc.director.loadScene("");
        }
        else if (x == 3) {
            cc.director.loadScene("");
        }
        else if (x == 4) {
            cc.director.loadScene("help");
        }
        else if (x == 5) {
            cc.director.loadScene("about");
        }
    },

    helpCallback: function (button, x) {
        if (x == 1) {
            cc.director.loadScene("settings");
        }
    },

    aboutCallback: function (button, x) {
        if (x == 1) {
            cc.director.loadScene("settings");
        }
    },

    start () {

    },

    // update (dt) {},
});
