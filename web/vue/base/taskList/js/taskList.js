//使用 localStorage 存储数据
var store = {
    save: function (key, value) { //保存数据
        localStorage.setItem(key, JSON.stringify(value)); // localStorage中只能保存 string
    },
    fetch: function (key) {
        return JSON.parse(localStorage.getItem(key)) || [];
    }
};
var list = store.fetch("task-list");
/*var list = [
    {
        title: "v-for",
        name: " v-for指令需要以 site in sites 形式的特殊语",
        isChecked: false
    },
    {
        title: "Vue.js",
        name: "Vue.js 使用了基于 HTML 的模版语法，允许开发者声明式地将 DOM 绑定至底层 Vue 实例的数据。",
        isChecked: false
    },
    {
        title: "第二部分",
        name: " 使用原生JS实现jQuery的addClass, removeClass, hasClass函数功能",
        isChecked: true
    },
    {
        title: "获取 class 内容",
        name: "判断获取到的 class 是否为空, 如果不为空在前面加个'空格'",
        isChecked: true
    }
];*/
new Vue({
    el: ".main",
    data: {
        list: list,
        todo: "", //添加的数据
        idx: 0, //选中的 menu 下标
        editItem: "", //当前编辑的任务
        beforeName: "" //记录正在编辑的任务的原来的 name
    },
    watch: {
        // list: function () { // 监听 list 的变化，但不可以监听其子对象的变化
        //     store.save("task-list", this.list);
        // }
        list: {
            handler: function () {
                store.save("task-list", this.list);
            },
            deep: true
        }
    },
    computed: {
        unCheckedCount: function () {
            return this.list.filter(function (item) {
                return !item.isChecked;
            }).length;
        },
        checkedCount: function () {
            return this.list.filter(function (item) {
                return item.isChecked;
            }).length;
        }
    },
    methods: {
        addTodo: function (e) { //添加任务
            this.list.push({
                title: this.todo,
                name: this.todo,
                isChecked: false
            });
            this.todo = "";
        },
        active: function (n) {  //切换 menu
            this.idx = n;
            document.getElementsByClassName("active")[0].className = "";
            window.event.target.className = "active";
        },
        del: function (obj) { //删除任务
            var idx = list.indexOf(obj);
            if (idx != -1) { //判断当前操作的是哪个 menu
                list.splice(idx, 1);
            }
        },
        edit: function (obj) { //编辑
            this.editItem = obj;
            this.beforeName = obj.name;
        },
        blur: function (obj) { //失去光标保存
            this.editItem = "";
        },
        rollback: function (obj) {
            obj.name = this.beforeName;
            this.beforeName = "";
            this.editItem = ""; //退出编辑模式
        }
    },
    directives: {
        focus: { //创建获取焦点的指令
            update: function (el, binding) {
                if (binding.value) {
                    console.log(el, binding);
                    el.focus();
                }
            }
        }
    }
});