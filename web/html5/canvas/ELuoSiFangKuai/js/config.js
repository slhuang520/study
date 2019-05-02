/**
 * 常量
 * Created by DreamCatcher on 2017/7/29.
 */
(function(window) {
    "use strict";

    window.TetrisConfig = {
        rows: 20, //主画布的行数
        cols: 13, //主画布的列数
        speed: 1000, //方块移动下降的速度，等级不同，值不同
        constSpeed: 1000, //下降的基础速度
        intervalId: 0,
        blockSize: 30, //方块的大小
        config: {
            enableSound: true //是否打开声音
        },
        //游戏的状态
        status: {
            PLAYING: "playing",
            PAUSE: "pause",
            OVER: "over"
        }
    };

})(window);