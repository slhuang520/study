/**
 * Game 主方法
 * Created by DreamCatcher on 2017/7/27.
 */
(function(document) {
    "use strict";

    var gameInst;

    /**
     * 简单封闭Dom操作类
     * 参照JQuery的方式
     *
     * @param dom
     * @constructor
     */
    function DomObject(dom) {
        this.dom = dom;
    }

    /**
     * 给这个操作类添加一些大众的操作方法
     *
     * @type {{constructor: DomObject, get: DomObject.get, on: DomObject.on, css: DomObject.css}}
     */
    DomObject.prototype = {
        constructor: DomObject,
        /**
         * 获取当前的Dom对象
         *
         * @returns {*}
         */
        get: function() {
            return this.dom;
        },

        /**
         * 注册事件
         *
         * @param eventName
         * @param eventHandler
         */
        on: function(eventName, eventHandler) {
            this.get().addEventListener(eventName, eventHandler);
        },

        /**
         * 修改style样式
         *
         * @param styleKey
         * @param styleValue
         */
        css: function(styleKey, styleValue) {
            this.get().style[styleKey] =  styleValue;
        }
    };

    /**
     * 简捷化从页面上获取Dom对象
     *
     * @param selector
     * @param context
     * @returns {DomObject}
     */
    function $(selector, context) {
        return new DomObject((context || document).querySelector(selector));//querySelector JS5之后新加的一个功能
    }

    /**
     * 为页面上的控件添加事件
     *
     * @private
     */
    function _init() {
        // 【开始游戏】按钮
        $("#start_btn").on("click", function() {
            $("#start_container").css("display", "none");
            $("#game_container").css("display", "block");

            startGame();
        });

        // 开始界面【设置】按钮
        $("#setting_btn").on("click", function() {
            $("#setting_container").css("display", "block");
        });

        // 【暂停】按钮
        $("#game_pause_btn").on("click", function(e) {
            var el = e.target;
            var txt = el.innerText;
            if (txt == "暂停") {
                el.innerText = "继续";
                gameInst.pause();
            } else {
                el.innerText = "暂停";
                gameInst.resume();
            }
        });

        // 游戏界面【设置】按钮
        $("#game_setting_btn").on("click", function() {
            $("#setting_container").css("display", "block");
            gameInst.pause();
        });

        // 设置界面【关闭】按钮
        $("#close_btn").on("click", function () {
            $("#setting_container").css("display", "none");
            gameInst && gameInst.resume();
        });

        // 设置界面【关闭声音】Checkbox
        $("#close_sound_chk").on("change", function () {
            var enable = $("#close_sound_chk").get().checked;
            TetrisConfig.config.enableSound = !enable;
        })
    }

    /**
     * 开始游戏
     */
    function startGame() {
        // 先加载资源（七种不同颜色的小方块）
        ResourceManager.init();
        ResourceManager.onResourceLoaded = function() {
            // 然后再开始游戏，出大方块(由不同样式和颜色的小方块组成)
            gameInst = new Tetris();
            gameInst.startGame();
        };
    }

    // 页面文档加载完成后，启动游戏的初始化方法
    document.addEventListener('DOMContentLoaded', function(){
        _init();
    });
})(document);