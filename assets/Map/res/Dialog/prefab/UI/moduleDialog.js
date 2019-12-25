cc.Class({
    extends: cc.Component,

    properties: {
        title: cc.Label,
        content: cc.Node,
        buttons: cc.Node,
        textItem: cc.Prefab,
        imgItem: cc.Prefab,
        simpleBtn: cc.Prefab,
        closeBtn: cc.Node
    },

    // use this for initialization
    onLoad: function () {

    },

    //初始化方法，两个可选的字符串参数
    init: function(title, content){
        this.node.on("touchstart", function(event, touch){
            event.stopPropagation();
        });

        this.node.on("touchmove", function(event, touch){
            event.stopPropagation();
        });

        this.node.on("touchcancel", function(event, touch){
            event.stopPropagation();
        });

        this.node.on("touchend", function(event, touch){
            event.stopPropagation();
        });
        if(typeof title != "undefined"){
            this.title.string = title;
        }
        if(typeof content != "undefined"){
            this.addLabel(content);
        }
        return this;
    },
    //添加自定义节点
    addContentNode: function(contentNode){
        this.content.addChild(contentNode);
        return this;
    },
    //添加图片
    addImage: function(spriteFrame){
        var spNode = cc.instantiate(this.imgItem);
        spNode.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        this.content.addChild(spNode);
        return this;
    },
    //添加文本标签
    addLabel: function(text){
        var lb = cc.instantiate(this.textItem);
        lb.getComponent(cc.Label).string =text;
        this.content.addChild(lb);
        return this;
    },
    //这里是设置background节点的背景，background节点在moduleDialog预制里，并不是对话框的背景
    setBackGround: function(colorOrSpriteFrame, opacity){
        var bg = this.node.getChildByName("background");
        if(typeof colorOrSpriteFrame != "undefined"){
            cc.log("no undefined");
            
            if(colorOrSpriteFrame instanceof cc.SpriteFrame){
                cc.log("is spriteFrame");
                bg.getChildByName("background").getComponent(cc.Sprite).spriteFrame = colorOrSpriteFrame;
            }
            if(colorOrSpriteFrame instanceof cc.Color){
                cc.log("is color ===r-" + colorOrSpriteFrame.r + "====g-" + colorOrSpriteFrame.g + "====b-" + colorOrSpriteFrame.b + "===a-" + colorOrSpriteFrame.a);
                bg.color = colorOrSpriteFrame;
            }
        }

        if(typeof opacity != "undefined"){
            bg.opacity = opacity;
        }
        return this;
    },
    //设置对话框标题，没有参数默认标题为“提示”
    setTitle: function(title){
        if(typeof title != "undefined"){
            this.title.string = title;
        }else{
            this.title.string = "软件工程";
        }
        return this;
    },
    //清空对话框内容，不清空已有标题和已有按钮
    emptyContent: function(){
        this.content.removeAllChildren();
        return this;
    },
    //重置对话框，清空对话框的内容、标题、所有按钮
    reset: function(){
        cc.log("reset");
        this.title.string = "";
        this.content.removeAllChildren();
        this.buttons.removeAllChildren();
        return this;
    },
    //禁用对话框的关闭按钮，用于必须进行交互的情况下
    disabledCloseBtn: function(){
        this.closeBtn.active ? this.closeBtn.active = false : null;
        return this;
    },
    //启用对话框的关闭按钮
    enabledCloseBtn: function(){
        !this.closeBtn.active ? this.closeBtn.active = true : null;
        return this;
    },

    //添加按钮，两个可选参数，如果没有第二个参数，按钮的默认功能是关闭对话框
    addButton: function(text, eventHandler){
        var btn = cc.instantiate(this.simpleBtn);
        if(typeof text != "undefined"){
            btn.getChildByName("Label").getComponent(cc.Label).string = text;
            btn.name = text;
        }
        var b = btn.getComponent(cc.Button);
        if(typeof eventHandler == "undefined"){
            var clickEventHandler = new cc.Component.EventHandler();
            clickEventHandler.target = this.node;
            clickEventHandler.component = "moduleDialog",
            clickEventHandler.handler = "close";
            clickEventHandler.customEventData = "";
            b.clickEvents.push(clickEventHandler);
        }else{
            b.clickEvents.push(eventHandler);
            cc.log("eventHandler.customEventData = " + eventHandler.customEventData);
        }
        
        this.buttons.addChild(btn);
        cc.log("add button " + text);
        return this;
    },

    //设置按钮按下时传递的数据（因为默认在添加按钮的时候就要设置按钮数据，但是有可能添加之后还会更改）
    setEventData: function(btnName, eventData){
        var btn = this.buttons.getChildByName(btnName);
        btn.getComponent(cc.Button).clickEvents[0].customEventData = eventData;
        return this;
    },
    //根据按钮的名字来禁用按钮（添加按钮的时候按钮的名字就是传入的字符串）
    disabledBtnByName: function(btnName){
        this.buttons.getChildByName(btnName).active = false;
        return this;
    },
    //根据按钮的名字来启用按钮
    enabledBtnByName: function(btnName){
        this.buttons.getChildByName(btnName).active = true;
        return this;
    },

    //关闭对话框
    close: function(event, customEventData){
        this.node.destroy();
    },
    //隐藏对话框
    hide: function () {
        this.node.active ? this.node.active = false : null;
    },
    //显示对话框
    show: function () {
        this.node.active ? null: this.node.active = true;
    }


    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

