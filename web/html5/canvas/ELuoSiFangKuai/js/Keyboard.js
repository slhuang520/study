/**
 * 键盘控制
 * Created by DreamCatcher on 2017/7/29.
 */
(function(window) {
    "use strict";

    var keys = {
        37: "left",
        38: "top",
        39: "right",
        40: "down"
    };

    /**
     * 键盘
     *
     * @constructor
     */
    function Keyboard() {
        this.board;
    }

    Keyboard.prototype = {
        constructor: Keyboard,
        init: function(board) {
            this.board = board;
            var that = this;

            //注册 Keyboard 事件
            document.addEventListener("keydown", function(e) {
                that._pressKeyDown(e);
            })
        },

        _pressKeyDown: function(e) {
            //游戏暂停或是结束时，取消键盘事件
            if (this.board.gameInst.status != "playing") {
                return;
            }
            var keyType = keys[e.keyCode];
            if (keyType) {
                this._press(keyType);
            }
        },

        _press: function(keyType) {
            var refresh = false;
            switch (keyType) {
                //变形
                case "top":
                    if (this.board.validMove(0, 0)) {
                        //还得判断变形后，是否有效，无效的话，不刷新
                        refresh = this.board.shape.rotate(this.board);
                    }
                    break;
                //右移
                case "right":
                    if (this.board.validMove(1, 0)) {
                        this.board.shape.x++;
                        refresh = true;
                    }
                    break;
                //加速下降
                case "down":
                    if (this.board.validMove(0, 1)) {
                        this.board.shape.y++;
                        refresh = true;
                    }
                    break;
                //左移
                case "left":
                    if (this.board.validMove(-1, 0)) {
                        this.board.shape.x--;
                        refresh = true;
                    }
                    break;
            }
            if (refresh) {
                this.board.refresh();
                this.board.shape.draw(this.board.context);
                if (keyType == "down") { //快速下降
                    var that = this;
                    clearInterval(TetrisConfig.intervalId);
                    TetrisConfig.intervalId = setInterval(function() {
                        that.board.tick();
                    });
                }
            }
        }
    };

    window.Keyboard = Keyboard;
})(window);