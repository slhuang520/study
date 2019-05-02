/**
 * 画布对象
 * Created by DreamCatcher on 2017/7/29.
 */
(function(window) {
    "use strict";

    /**
     * Canvas 操作类
     *
     * @param CanvasId canvas 对象的ID
     * @param width canvas 对象的宽度
     * @param height canvas 对象的高度
     */
    function Canvas(canvasId, width, height) {
        this.canvasId = canvasId;
        this.el = window.document.getElementById(this.canvasId);
        if (!this.el) {
            throw new Error("Must provided a right canvas's id.");
        }
        this.context = this.el.getContext("2d");
        this.width = width || window.innerWidth;
        this.height = height || window.innerHeight;
        this._init();
    }

    Canvas.prototype = {
        constructor: Canvas,

        _init: function () {
            // 设置 canvas 的宽度|高度
            this.el.width = this.width;
            this.el.height = this.height;
        },

        /**
         * 清理画布
         *
         * @param fromX
         * @param fromY
         * @param toX
         * @param toY
         */
        clear: function(fromX, fromY, toX, toY) {
            fromX = fromX || 0;
            fromY = fromY || 0;
            toX = toX || this.width;
            toY = toY || this.height;
            this.context.clearRect(fromX, fromY, toX, toY);
        },

        /**
         * 写文字，每次先清空画布
         *
         * @param text
         * @param x
         * @param y
         */
        drawText: function(text, x, y) {
            this.clear(0, 0);
            this.context.font = "25px Arial";
            this.context.fillStyle = "purple";
            this.context.textAlign = "center";

            this.context.fillText(text, x === undefined ? (this.width / 2) : x, y === undefined ? 45 : y);
        }
    };

    window.Canvas = Canvas;
})(window);