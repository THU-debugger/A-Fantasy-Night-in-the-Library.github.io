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
        t_size:cc.size(600,600),//整个屏幕大小
        position:cc.v2(-200,-300),
        num_blocks:cc.v2(5,5),//码放的灯泡数量
        squares:{
            type:cc.Sprite,
            default:[]
        },//灯泡组件
        active_pos:cc.v2(0,0),
        current_pos:"",//当前被点击的节点
        switch:false,//是否需要改变灯泡状态
        difficulty:1,//初始难度
    },

    get_sucess()/*判断是否成功*/
    {
        for(var i=0;i<this.squares.length;i++)
        {if(!this.squares[i].getComponent("square").state)return false;}
        return true;
    },
    Success()/*胜利之后的操作*/
    {
        if(this.get_sucess()){
        cc.sys.localStorage.setItem('playerScene', JSON.stringify("F3"));
        cc.sys.localStorage.setItem('playerX', JSON.stringify(39));
        cc.sys.localStorage.setItem('playerY', JSON.stringify(68));
		cc.director.loadScene("F3");
		}
    },

    abs(x)
    {
        if(x>=0){return x;}
        return -x;
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        var c0=100;
        console.log("-----------controller onload start--------------");
        //求出每一块大小
        var x0=this.t_size.width/this.num_blocks.x;
        var y0=this.t_size.height/this.num_blocks.y;
        
        var n =this.active_pos.x+this.active_pos.y*this.num_blocks.x;
        //设置所有灯泡位置和大小
        for(var i=0;i<this.squares.length;i++){
            //console.log("-----------manage square--------------",i);
            var s = this.squares[i].getComponent("square");
            s.sq_size.width=x0;
            s.sq_size.height=y0;
            //cc.log(s.sq_size);
            var t1 = (i)%this.num_blocks.x;
            s.position.x=this.position.x+t1*x0+x0/2;
            var t2=(i-t1)/this.num_blocks.x;
            s.position.y=this.position.y+t2*y0+y0/2;
            //cc.log("result");
            //cc.log(this.squares[i].name,this.squares[i].x,this.squares[i].y);
            //if(n==i){var a= this.arrow.getComponent("arrow");a.init_x=s.position.x;a.init_y=s.position.y;}
        }
        //随机挑选灯泡进行翻转，设置初始场景
        while(this.get_sucess()){
        for(var j=0;j<this.difficulty;j++){
        var a=Math.floor(Math.random()*this.squares.length);
        this.convert_all(a);
        //cc.log("convert",a);
        }
        }
    },

    start () {
        
    },
    change_state(i){//改变第i个灯泡状态
        this.squares[i].getComponent("square").change();
    },
    convert_all(i){//改变一个灯泡及周围所有灯泡状态
        this.change_state(i);
        var t1=i%this.num_blocks.x;
        var t2=(i-t1)/this.num_blocks.x;
        
        if(t1-1>=0)
            this.change_state(this.num_blocks.x*t2+t1-1);
        if(t1+1<this.num_blocks.x)
            this.change_state(this.num_blocks.x*t2+t1+1);
        if(t2-1>=0)
            this.change_state(this.num_blocks.x*(t2-1)+t1);
        if(t2+1<this.num_blocks.y)
            this.change_state(this.num_blocks.x*(t2+1)+t1);
    },
    update (dt) {//更新当前画面
        if(!this.switch){return;}//如不需操作，直接返回
        this.switch=false;
        //cc.log(this.current_pos);
        var i=0;
        for(i=0;i<this.squares.length;i++){//寻找被点击的灯泡
            if(this.squares[i].name==this.current_pos+"<Sprite>"){
                //cc.log(this.current_pos);
                this.convert_all(i);//反转被点击的灯泡周围所有灯泡
                break;
            }
        }
        this.Success();//判断是否应当退出
    },

});
