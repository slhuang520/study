/**
 * 最高得分
 * Created by DreamCatcher on 2017/8/1.
 */
(function (window) {
    "use strict";

    /**
     * 最高得分、
     *
     * @constructor
     */
    function MaxScore() {
        this.canvas = new Canvas("canvas_max_score", 100, 70);
        this.maxScore = 0;

        this._init();
    }

    MaxScore.prototype = {
        constructor: MaxScore,
        _init: function () {
            this.maxScore = this._getScore(); //每次进入游戏时，加载之前的最高得分
            this._render();
        },
        _render: function () {
            this.canvas.drawText(this.maxScore);
        },
        _getScore: function () {
            return window.localStorage.getItem("max_score") || 0;
        },

        /**
         * 将最高得分保存在本地的缓存中
         *
         * @param score
         * @private
         */
        _setScore: function (score) {
            window.localStorage.setItem("max_score", this.maxScore);
        },

        /**
         * 判断是否需要更新最高得分
         *
         * @param score
         */
        checkScore: function (score) {
            if (score > this.maxScore) {
                this.maxScore = score;
                this._render();
                this._setScore(this.maxScore);
            }
        }
    };

    window.MaxScore = MaxScore;
})(window);