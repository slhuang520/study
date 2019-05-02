/**
 * 游戏时间
 * Created by DreamCatcher on 2017/8/1.
 */
(function (window) {
    "use strict";

    /**
     * 当前游戏已经过去的时间
     *
     * @constructor
     */
    function Timer() {
        this.canvas = new Canvas("canvas_timer", 100, 70);
        this.time = 0;
        this.timeId = 0;
        
        this._init();
    }

    Timer.prototype = {
        constructor: Timer,

        _init: function () {
            this._render();
            this._startTimer();
        },
        _render: function () {
            this.canvas.drawText(this._format(this.time));
        },
        _startTimer: function () {
            var that = this;
            this.timeId = setInterval(function () {
                that.time++;
                that._render();
            }, 1000)
        },

        /**
         * 格式化时间
         *
         * @param second
         * @returns {string}
         * @private
         */
        _format: function (second) {
            var hours = Math.floor(second / 3600);
            if (hours < 10) {
                hours = "0" + hours;
            }
            second = second - hours * 3600;
            var minutes = Math.floor(second / 60);
            if (minutes < 10) {
                minutes = "0" + minutes;
            }
            second = second - minutes * 60;
            if (second < 10) {
                second = "0" + second;
            }
            return hours + ":" + minutes + ":" + second;
        },
        pause: function () {
            clearInterval(this.timeId);
        },
        resume: function () {
            this._startTimer();
        },
        stop: function () {
            this.pause();
        }
    };

    window.Timer = Timer;
})(window);