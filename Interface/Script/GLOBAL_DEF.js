//创建按钮回调事件（回调函数所在脚本的挂载节点，回调函数所在脚本的名字，回调函数的名字，自定义回调数据）
var CREATE_EVENT_HANDLER = function(target, component, handler, customEventData){
    var eventHandler = new cc.Component.EventHandler();
    if(target instanceof cc.Node){
        eventHandler.target = target;
    }else{
        cc.error("GLOBAL_DEF.js: method 'CREATE_EVENT_HANDLER' param 'target' must be a cc.Node!");
    }

    if(typeof component == "string"){
        eventHandler.component = component;
    }else{
        cc.error("GLOBAL_DEF.js: method 'CREATE_EVENT_HANDLER' param 'component' must be a string!");
    }

    if(typeof handler == "string"){
        eventHandler.handler = handler;

    }else{
        cc.error("GLOBAL_DEF.js: method 'CREATE_EVENT_HANDLER' param 'handler' must be a string!");
    }

    if(typeof customEventData != "undefined"){
        eventHandler.customEventData = customEventData;
    }
    return eventHandler;
};

var dialog_text=new Array(
"我怎么就睡着了呢，我得赶紧找到出口",													//0
"走了好久了，怎么还没见出口呢",															//1
"北馆比我想象的要大好多啊，是我见识短浅了，以后有空得常来探索探索",						//2
"（找到一本书）书名《清华第一，北大第二》，这本书好像没还，我先把它还到服务台吧",		//3
"（把书放到了服务台上）诶，这里有一把钥匙",												//4
"找到了一把钥匙，上面写着：邺架轩",														//5
"这里有一把铲子，或许待会有用",															//6
"这个土堆好生蹊跷，铲开试试，哈哈果真有一把钥匙（3F）",									//7
"得到一个blingbling的星星",																//8
"Card-A,可能跟密码有关，收着吧",														//9
"找到了一张Card-B",																		//10
"这里好黑啊，看样子只能摸着墙走了",														//11暗黑迷宫前中
"呼，总算走出来了",																		//12暗黑迷宫后
"这里有很多箱子，莫非是，推箱子？",														//13推箱子游戏前
"我只是想还个书而已，怎么被传送到这里了？",												//14传送游戏前
"啊，图书馆里为什么会有幽灵，我得小心点走，不能被他们发现",								//15幽灵游戏前
"这里的地板怎么看起来这么松，不会掉下去吧…"	,											//16一笔画前
"剧情提示内容（待编辑）",																//17
"头好晕，这里好像有奇怪的磁场",															//18
"这个房间挺特别的哈，把书放到中间的桌上应该就行了吧",									//19
" ",//20
"---F1---",//21
"---F2---",//22
"---F3---",//23
"---F4---",//24
"---F5---",//25
"---B1---",//26
"---B2---",//27
"---Magic Room---"//28



);