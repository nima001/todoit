var cover = {
    template: '<transition name="cover1"><div class="cover" @click="cover"></div></transition>',
    methods: {
        cover: function () {
            this.$emit("to-show");
        }
    }
};

var addContent = { //添加多一项
    data: function () {
        return {
            showcontent: false,
            content: '',
            mytop: 695,
            transform: "rotate(0deg)",
            bg: "#757575",
        }
    },
    template: "#add-content",
    methods: {
        back: function () {
            if (this.mytop == 595) {
                this.mytop = 695;
                this.transform = "rotate(0deg)";
                this.showcontent = false;
            } else {
                this.mybottom = 595;
                this.transform = "rotate(-45deg)";
                this.showcontent = true;
            }
        },
        add: function () {
            if (this.content == "") {
                //内容为空什么都不做
            } else {
                this.back();
                this.$emit("to-add", this.content);
                this.content = "";
                this.bg = "#fff";
            }
        },
        showbtn: function () {
            if (this.mytop == 595) {
                this.transform = "rotate(0deg)";
                this.mytop = 695;
            } else {
                this.transform = "rotate(-45deg)";
                this.mytop = 595;
            }
            this.showcontent = !this.showcontent;
        }
    },
    watch: {
        content: function () {
            if (this.content != "") {
                this.bg = "rgb(37, 185, 154)";
            } else {
                this.bg = "#757575";
            }
        }
    }
};

var todolist = {
    props: ["mytodo"],
    data: function () {
        return {
            todo: this.mytodo,

        }
    },
    template: '#todo-list',
    methods:{
        clear:function (index) {
            this.$emit("clear",index);
        },
        finish:function (index) {
            this.$emit("finish",index);
        }
    }
};

var completedList = { //完成事项
    props: ["mydone"],
    data: function() {
        return {
            done: this.mydone,//完成
        }
    },
    template: '#completed-list',
    methods: {
        clear: function(index) {
            this.$emit("clear", index); //触发事件,把数据传给父类
        }
    }
};

var menuContent = { //一级菜单
    data: function () {
        return {
            items: [{
                message: "待做事项",
            }, {
                message: "完成事项",
            }, {
                message: "皮肤",
            }, {
                message: "关于",
            }],
        }
    },
    template: '#menu-content',
        methods:{
            whatShow:function (index) {
                this.$emit("what-show", index);
            }
        }
}

var menuCard = {
    props:["iswhat"],
    data: function() {
        return {
            items: [{
                message: "文艺药丸",
                bg1: "#25b99a",
                bg2: "#E8F5E9",
                shake:false
            }, {
                message: "狂热药丸",
                bg1: "#F44336",
                bg2: "#FFEBEE",
                shake:false
            }, {
                message: "高冷药丸",
                bg1: "#2196F3",
                bg2: "#E3F2FD",
                shake:false
            }]
        }
    },
    template: "#menu-card",
    methods: {
        changeColor: function(val,index) {
            this.$emit("change-color", val);//改变head颜色
        }
    }
}



new Vue({
    el: '#app',
    data: {
        show: false
        ,
        showcover:false
        ,
        done: []
        ,
        todo: ["点击右下方按钮，写下您的第一件事项"]
        ,
        left: -260
        ,
        list:true//切换事件
        ,
        list1:true
        ,
        isWhat:true
        ,
        showokbtn: false
        ,
        menuCardShow:false
        ,
        headerBg: "#25b99a", //top背景色
    },
    methods: {
        changeleft: function () {
            if(this.left==0&&this.show==true){
                this.left=-260;
                this.show=!this.show;
                this.showcover=false;
            }else if(this.left == -260 && this.show == false){
                this.left=0;
                this.show=!this.show;
                this.showcover=true;
            }else{
                this.show = !this.show;
                this.menuCardShow = !this.menuCardShow
            }
        },
        add: function (val) { //添加一个代做事项
            this.todo.unshift(val);
            if (this.left == 0 && this.show == true) {
                this.left = -260;
                this.show = !this.show;
            }
        },
        todoClear:function (index) {
            this.todo.splice(index,1);
        },
        todoFinish:function (index) {
            var content = this.todo[index];
            this.todo.splice(index, 1);
            this.done.unshift(content);
        },
        whatShow:function (index) {
            switch (index) {
                case 0:
                    this.list = true;
                    this.list1=false;
                    this.changeleft();
                    this.showcover=false;
                    this.menuCardShow = false;
                    break;
                case 1:
                    this.list = false;
                    this.list1=true;
                    this.changeleft();
                    this.showcover=false;
                    this.menuCardShow = false;
                    break;
                case 2:
                    this.list=false;
                    this.list1=false;
                    this.changeleft();
                    this.show=false;
                    this.isWhat = true;
                    this.showcover=true;
                    this.menuCardShow = true;
                    break;
                case 3:
                    this.list=false;
                    this.list1=false;
                    this.changeleft();
                    this.show=false;
                    this.isWhat = false;
                    this.showcover=true;
                    this.menuCardShow = true;
                    break;
            }
        },
        clear:function (index) {
            this.done.splice(index,1);
        },
        changeColor:function (val) {
            this.headerBg = val;
        }

    }, components: {
        'cover': cover,
        'add-content': addContent,
        'todo-list': todolist,
        'menu-content': menuContent,
        "completed-list": completedList,
        "menu-card": menuCard
    }
});
