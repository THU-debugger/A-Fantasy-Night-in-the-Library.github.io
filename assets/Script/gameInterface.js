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
        // 背包物品数组
        thing: [cc.Integer],
        // button控件
        button: cc.button,
        // 人物
        player: cc.TiledTile,
    },

    onLoad () {
        if (this.node.parent.name == "Character") {
            // 获取人物结点
            this.player = this.node.parent;
            this.player.tiledTile = this.player.getComponent(cc.TiledTile);
            // 获取本地存储的要加载的场景
            var localScene = JSON.parse(cc.sys.localStorage.getItem('playerScene'));
            // 若现在的场景是要加载的场景，则将人物位置设为本地存档中的坐标
            if (localScene == cc.director.getScene().name) {
                this.player.tiledTile.x = JSON.parse(cc.sys.localStorage.getItem('playerX'));
                this.player.tiledTile.y = JSON.parse(cc.sys.localStorage.getItem('playerY'));
            }
            // 若之前人物在一层推箱子的矩形区域内，则直接将人物放回一层初始位置
            var xx = this.player.tiledTile.x, yy = this.player.tiledTile.y;
            if (localScene == "F1" && xx >= 177 && xx <= 187 && yy >= 95 && yy <= 115) {
                this.player.tiledTile.x = 185;
                this.player.tiledTile.y = 120;
            }
        }
    },

    // 主界面的三个按钮响应
    mainMenuCallback: function (button, x) {
        // 点击后播放音效
        this.effectPlayer = cc.find("soundEffect").getComponent("soundEffect");
        this.effectPlayer.buttonPlay();

        // 场景名用于记录设置界面应该返回到主菜单还是暂停菜单
        sceneName = "mainMenu";
        if (x == 1) {}
        else if (x == 2) {
            // 序幕
            cc.director.loadScene("openingAnimation");
        }
        else if (x == 3) {
            // 继续游戏，获取存档中的场景并加载
            var playerScene = JSON.parse(cc.sys.localStorage.getItem('playerScene'));
            cc.director.loadScene(playerScene);
        }
        else if (x == 4) {}
        else if (x == 5) {
            // 设置菜单
            cc.director.loadScene("settings");
        }
    },

    // 序幕中的两个按钮响应
    openingAnimationCallback: function (button, x) {
        // 点击后播放音效
        this.effectPlayer = cc.find("soundEffect").getComponent("soundEffect");
        this.effectPlayer.buttonPlay();
        
        if (x == 1) {
            // 返回到主菜单
            cc.director.loadScene("mainMenu");
        }
        else if (x == 2) {
            // 继续则初始化游戏数据，包括初始楼层、任务位置、背包内容，并进入F1
            cc.sys.localStorage.setItem('playerScene', JSON.stringify("F1"));
            cc.sys.localStorage.setItem('playerX', JSON.stringify(185));
            cc.sys.localStorage.setItem('playerY', JSON.stringify(120));
			cc.sys.localStorage.setItem('date', 0);
            for (var i = 0; i < 9; i++) {
                this.thing[i] = 0;
            }
            cc.sys.localStorage.setItem('Bag', JSON.stringify(this.thing));
            cc.director.loadScene("F1");
        }
    },

    // 游戏中的暂停按钮响应
    virtualGameCallback: function (button, x) {
        // 点击后播放音效
        this.effectPlayer = cc.find("soundEffect").getComponent("soundEffect");
        this.effectPlayer.buttonPlay();
        
        if (x == 1) {
            // 记录点击暂停时的场景和人物位置并加载暂停界面
            cc.sys.localStorage.setItem('playerScene', JSON.stringify(cc.director.getScene().name));
            cc.sys.localStorage.setItem('playerX', JSON.stringify(this.player.tiledTile.x));
            cc.sys.localStorage.setItem('playerY', JSON.stringify(this.player.tiledTile.y));
            cc.director.loadScene("pauseMenu");
        }
        else if (x == 2) {}
    },

    // 暂停菜单中的四个按钮响应
    pauseMenuCallback: function (button, x) {
        // 点击后播放音效
        this.effectPlayer = cc.find("soundEffect").getComponent("soundEffect");
        this.effectPlayer.buttonPlay();

        // 场景名用于记录设置界面应该返回到主菜单还是暂停菜单
        sceneName = "pauseMenu";
        if (x == 1) {
            // 继续则返回点击暂停时存储的场景
            var playerScene = JSON.parse(cc.sys.localStorage.getItem('playerScene'));
            cc.director.loadScene(playerScene);
        }
        else if (x == 2) {
            // 保存则存储背包中的内容，场景和人物位置在点击暂停时已经保存
            cc.sys.localStorage.setItem('Bag', JSON.stringify(this.thing));
            cc.director.loadScene("saveFinish");
        }
        else if (x == 3) {}
        else if (x == 4) {
            // 设置菜单
            cc.director.loadScene("settings");
        }
        else if (x == 5) {
            // 保存并退出，保存背包，加载确认界面
            cc.sys.localStorage.setItem('Bag', JSON.stringify(this.thing));
            cc.director.loadScene("confirm");
        }
    },

    // 保存成功界面按钮响应
    saveFinishCallback: function (button, x) {
        // 点击后播放音效
        this.effectPlayer = cc.find("soundEffect").getComponent("soundEffect");
        this.effectPlayer.buttonPlay();
        
        if (x == 1) {
            // 保存成功，回到暂停菜单
            cc.director.loadScene("pauseMenu");
        }
    },

    // 确认保存并退出按钮响应
    confirmCallback: function (button, x) {
        // 点击后播放音效
        this.effectPlayer = cc.find("soundEffect").getComponent("soundEffect");
        this.effectPlayer.buttonPlay();
        
        if (x == 1) {
            // 确认退出，返回主菜单
            cc.director.loadScene("mainMenu");
        }
        else if (x == 2) {
            // 不退出，返回暂停菜单
            cc.director.loadScene("pauseMenu");
        }
    },

    // 设置菜单四个按钮响应
    settingsCallback: function (button, x) {
        // 获取当前音效是否开启
        var effect = JSON.parse(cc.sys.localStorage.getItem('effect'));
        // 点击后播放音效
        this.effectPlayer = cc.find("soundEffect").getComponent("soundEffect");
        this.effectPlayer.buttonPlay();
        
        // preScene用于返回主菜单或暂停菜单
        var preScene = sceneName;
        if (x == 1) {
            cc.director.loadScene(preScene);
        }
        else if (x == 2) {
            // 获取当前音乐是否开启
            var music = JSON.parse(cc.sys.localStorage.getItem('music'));
            // 获取全局播放器
            this.musicPlayer = cc.find("music").getComponent("music");
            
            if (music == 0) {
                // 若未开启，则点击后设置label，开启音乐并播放
                this.node.parent.getChildByName("musicButton").getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string = "音乐：开";
                cc.sys.localStorage.setItem('music', JSON.stringify(1));
                this.musicPlayer.playMusic();
            }
            else {
                // 若已开启，则点击后设置label，关闭音乐并停止
                this.node.parent.getChildByName("musicButton").getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string = "音乐：关";
                cc.sys.localStorage.setItem('music', JSON.stringify(0));
                this.musicPlayer.pause();
            }
        }
        else if (x == 3) {
            // 音效与音乐相同
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
            // 游戏帮助
            cc.director.loadScene("help");
        }
        else if (x == 5) {
            // 关于
            cc.director.loadScene("about");
        }
    },

    // 帮助界面返回按钮响应
    helpCallback: function (button, x) {
        // 点击后播放音效
        this.effectPlayer = cc.find("soundEffect").getComponent("soundEffect");
        this.effectPlayer.buttonPlay();
        
        if (x == 1) {
            cc.director.loadScene("settings");
        }
    },

    // 关于界面返回按钮响应
    aboutCallback: function (button, x) {
        // 点击后播放音效
        this.effectPlayer = cc.find("soundEffect").getComponent("soundEffect");
        this.effectPlayer.buttonPlay();
        
        if (x == 1) {
            cc.director.loadScene("settings");
        }
    },

    start () {}
});
