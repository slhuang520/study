/**
 * 当前级别
 * Created by DreamCatcher on 2017/8/1.
 */
(function (window) {
    "use strict";

    /**
     * 等级列表
     */
    var levelArr = (function () {
        var arr = [0];
        for (var i = 0; i < 9; i++) {
            arr.push(Math.pow(2, i) * 10000);
        }
        return arr;
    })();

    function Level() {
        this.canvas = new Canvas("canvas_level", 100, 70);
        this.level = 1;

        this._init();
    }

    Level.prototype = {
        constructor: Level,
        _init: function () {
            this._render();
        },
        _render: function () {
            this.canvas.drawText("Level " + this.level);
        },

        /**
         * 判断是否可以升级
         *
         * @param score
         * @returns {number}
         */
        checkLevel: function (score) {
            if (score > levelArr[this.level]) {
                this.level++;
                this._render();
                return this.level;
            }
        }
    };

    window.Level = Level;
})(window);