/**
 * 得分
 * Created by DreamCatcher on 2017/8/1.
 */
(function (window) {
    "use strict";

    /**
     * 当前得分
     *
     * @constructor
     */
    function Score() {
        this.canvas = new Canvas("canvas_score", 100, 70);
        this.score = 0;

        this._init();
    }

    Score.prototype = {
        constructor: Score,
        _init: function () {
            this._render();
        },
        _render: function () {
            this.canvas.drawText(this.score);
        },

        /**
         * 累积分数
         * 需要返回当前得分，用以判断是否升级，是否是最高分
         *
         * @param value
         * @returns {number|*}
         */
        addScore: function (value) {
            this.score += value;
            this._render();
            return this.score;
        }
    };

    window.Score = Score;
})(window);