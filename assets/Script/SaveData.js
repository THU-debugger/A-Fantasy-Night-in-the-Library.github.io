// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

var UserData = {
    player_scene: "B1",			//人物位置（精确到哪层哪个入口）
    if_bgm: true,
    if_soundeffect:true,
	game_finished:{0,0,0,0,0,0,0},	//游戏完成情况记录，已完成为1，未完成为0
									//依次为：0迷宫，1推箱子，2一笔画，3传送门，4幽灵，5传送通道，6开关
	prop_get:{0,0,0,0,0,0},
		
};

cc.Class({
    extends: cc.Component,

    properties: {
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

    start () {

    },
	
	

	var saveData:function(){
		UserData.if_bgm = ;									//获取当前状态
		UserData.if_soundeffect = ;
		UserData.game_finished = ;
		UserData.prop_get = ;
		UserData.player_scene = ;
		
		
		var dataText = JSON.stringify(UserData);
        var ciphertext;
		for(var k in UserData) {							//储存
            ciphertext = btoa(encodeURI(UserData[k]));
            cc.sys.localStorage.setItem(k, ciphertext);
        }

	//	音乐音效开关；
	//	游戏进度（数组[7])
	//	人物位置（精确到哪层哪个入口）
	//	道具有无（数组）
		
	}

	var readData:function(){									//读取数据并加载场景
		var dataText；
		for(var k in UserData) {
            dataText = cc.sys.localStorage.getItem(k);
            if (dataText === null) {
                break;
            }
			//读取数据
	}
	

    // update (dt) {},
});