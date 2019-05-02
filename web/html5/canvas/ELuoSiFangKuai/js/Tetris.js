/**
 * 俄罗斯方块游戏对象
 * Created by DreamCatcher on 2017/7/29.
 */
(function(window) {
    "use strict";

    /**
     * 游戏对象
     *
     * @constructor
     */
    function Tetris() {
        this._sound;
        this.status = TetrisConfig.status.PLAYING;
        this.board = new Board(this); //游戏界面
        this.nextShape = new NextShape(); //下一个方块
        this.score = new Score(); //当前得分
        this.timer = new Timer(); //当前使用时间
        this.level = new Level(); //当前等级
        this.maxScore = new MaxScore(); //最高得分
        new Keyboard().init(this.board); //注册 Keyboard 事件
    }

    Tetris.prototype = {
        constructor : Tetris,

        /**
         * 初始公声音
         * 使用外部的一个开源组件 Howl 来播放声音
         *
         * @private
         */
        _initSound: function(){
            this._sound = new Howl({
                src: ["audio/bg.wav"],
                loop: true,
                volume: 0.3
            });
            this._playSound();
        },

        /**
         * 判断当前设置是否允许播放声音
         *
         * @private
         */
        _playSound: function () {
            if (TetrisConfig.config.enableSound) {
                this._sound.play();
            }
        },

        /**
         * 根据当前的速度，让方块开始向下移动
         *
         * @private
         */
        _startTick: function() {
            var that = this;
            // 每格一秒跳动一次
            TetrisConfig.intervalId = setInterval(function() {
                that.board.tick();
            }, TetrisConfig.speed)
        },

        /**
         * 开始游戏时，初始化声音，并让方块向下移动
         */
        startGame: function() {
            this._initSound();
            this._startTick();
        },

        /**
         * 停止方块向下移动
         *
         * @private
         */
        _stopTick: function() {
            clearInterval(TetrisConfig.intervalId);
        },

        /**
         * 结束游戏
         */
        endGame: function() {
            this._sound.stop();
            this.timer.stop();
            this._stopTick();
            alert("Game over");
        },

        /**
         * 暂停游戏
         */
        pause: function() {
            // 如果当前游戏已经结束，则无效
            if(this.status == TetrisConfig.status.OVER) {
                return;
            }
            // 暂停音乐
            this._sound.pause();

            // 暂停keyboard 事件
            this.status = TetrisConfig.status.PAUSE;

            // 暂停tick
            this._stopTick();

            // 暂停Timer
            this.timer.pause();
        },

        /**
         * 重新开始游戏
         */
        resume: function() {
            // 如果当前游戏已经结束，则无效
            if(this.status == TetrisConfig.status.OVER) {
                return;
            }
            this._playSound();
            this.status = TetrisConfig.status.PLAYING;
            this._startTick();
            this.timer.resume();
        }
    };

    window.Tetris = Tetris;
})(window);