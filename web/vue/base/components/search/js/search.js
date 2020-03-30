Vue.component("customer-search", {
    props: ["btn", "items"], // 给自定义组件，添加属性
    data: function () { // 注意这里的 data 不能是一个对象，对象会被所有组件所共享
        return {
            showList: false, // 默认下拉列表是关闭的
            val: ""
        }
    },
    methods: {
        // 选中下拉列表时
        select: function (obj) {
            this.showList = false;
            this.val = obj.name;
        }
    },
    template: "<section>\n" +
    "        <h1>Customer Search</h1>\n" + // 这个无用
    "        <header>\n" +
    "            <input type=\"text\"" +
    "               @focus=\"showList=!showList\"" + //获取焦点时，打开下拉列表
    "               v-model=\"val\"/>\n" + // 给输入框绑定选中的值
    "            <button>{{btn}}</button>\n" +
    "        </header>\n" +
    "        <ul class=\"list\" v-show=\"showList\">\n" + // 展示列表数据
    "            <li @click=\"select(obj)\" v-for=\"obj in items\" value=\"obj.id\">{{obj.name}}</li>\n" +
    "        </ul>\n" +
    "    </section>"
});
var vue = new Vue({
    el: "#app",
    data: {
        items: [ //动态添加数据
            {id: 1, name: "html + css"},
            {id: 2, name: "html5 + css3"},
            {id: 3, name: "javascript"},
            {id: 4, name: "angular"},
            {id: 5, name: "react"},
            {id: 6, name: "vue"},
            {id: 7, name: "jquery"},
            {id: 8, name: "nodejs"},
            {id: 9, name: "backbone"}
        ]
    }
});