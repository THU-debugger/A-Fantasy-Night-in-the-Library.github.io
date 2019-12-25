cc.Class({
    extends: cc.Component,

    properties: {
        resizeDialog: cc.Prefab,
		rank1:0,
		rank2:0,
    },

    // use this for initialization
    onLoad: function () {
		cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.openDialog, this);
    },


    openDialog: function(event){//新建一个对话框，按空格键打开或关闭
		if(event.keyCode != cc.macro.KEY.space&&cc.find("Canvas").getChildByName("Main Camera").getChildByName("resizeDialog")!=null){
				cc.find("Canvas").getChildByName("Main Camera").getChildByName("resizeDialog").destroy();
			}
		if(event.keyCode == cc.macro.KEY.space){
			if(cc.find("Canvas").getChildByName("Main Camera").getChildByName("resizeDialog")!=null){				
				cc.find("Canvas").getChildByName("Main Camera").getChildByName("resizeDialog").destroy();
			}
			else{
				var dialog = cc.instantiate(this.resizeDialog).getComponent("moduleDialog").init(dialog_text[this.rank1],dialog_text[this.rank2]);
				cc.find("Canvas").getChildByName("Main Camera").addChild(dialog.node);
			}
		}
	},



    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
