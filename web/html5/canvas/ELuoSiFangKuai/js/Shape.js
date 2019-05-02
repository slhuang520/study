/**
 * 方块
 * Created by DreamCatcher on 2017/7/29.
 */
(function(window) {
    "use strict";

    //出现的方块，有不同的形状
    var shapeLayouts = [
        [[0, 1, 0], [1, 1, 1]],
        [[1, 1, 1, 1]],
        [[1, 1], [1, 1]],
        [[0, 1], [1, 1], [1, 0]],
        [[1, 0], [1, 1], [0, 1]],
        [[1, 0, 1], [1, 1, 1]],
        [[0, 1], [1, 1]],
        [[1, 1]],
        [[1, 1], [1, 0], [1, 0]],
        [[1, 1], [0, 1], [0, 1]]
    ];
    var colorCount = 7; //总共有7种颜色

    function random(minVal, maxVal) {
        return minVal + Math.floor(Math.random() * maxVal);
    }

    /**
     * 每一个大方块里面小方块的颜色是一样的
     *
     * @constructor
     */
    function Shape() {
        this.x = 0;
        this.y = 0;
        this.colorType = random(1, colorCount); //随机生成一种颜色
        this.block = new Block(this.colorType);
        this.layout = shapeLayouts[random(0, shapeLayouts.length)]; //随机产生一种形状
    }

    Shape.prototype = {
        constructor: Shape,

        /**
         * 绘出形状
         *
         * @param context
         * @param size
         */
        draw: function (context, size) {
            for (var row = 0; row < this.layout.length; row++) {
                for (var col = 0; col < this.layout[row].length; col++) {
                    if (this.layout[row][col]) {
                        this.block.draw(context, this.y + row, this.x + col, undefined, size);
                    }
                }
            }
        },

        /**
         * 变形
         *
         * @param board
         * @returns {boolean}
         */
        rotate: function(board) {
            var newLayout = [], row;
            for (row = 0; row < this.layout[0].length; row++) {
                newLayout[row] = [];
                for (var col = 0; col < this.layout.length; col++) {
                    newLayout[row][col] = this.layout[this.layout.length - 1 - col][row];
                }
            }

            // Check right
            var newLayoutWidth = newLayout[0].length;
            if (this.x + newLayoutWidth - 1 > TetrisConfig.cols - 1) {// this.x 占一个位置
                for (row = 0; row < newLayout.length; row++) {
                    if (newLayout[row][0] && board.boardList[this.y + row][TetrisConfig.cols - newLayoutWidth]) {
                        return false;
                    }
                }
            }

            // Check middle and left
            for (row = 0; row < newLayout.length; row++) {
                if (newLayout[row][newLayoutWidth - 1] && board.boardList[this.y + row][this.x + newLayoutWidth - 1]) {
                    return false;
                }
            }

            this.layout = newLayout;
            this._setLayout();
            return true;
        },

        /**
         * 调整大方块的形状
         *
         * @private
         */
        _setLayout: function() {
            if (this.x < 0) {
                this.x = 0;
            }
            if (this.y < 0) {
                this.y = 0;
            }
            if (this.x + this.layout[0].length > TetrisConfig.cols) {
                this.x = TetrisConfig.cols - this.layout[0].length;
            }
            if (this.y + this.layout.length > TetrisConfig.rows) {
                this.y = TetrisConfig.rows - this.layout.length;
            }
        },

        /**
         * 设置大方块的位置
         *
         * @param rows
         * @param cols
         * @param ignoreRows 在主画布上面显示的时候，不考虑行，并且行的起始位置始终是0
         */
        setPosition: function (rows, cols, ignoreRows) {
            var col = (cols - this._getMaxCol()) / 2; //这里可以是小数;
            if (ignoreRows) {
                col = Math.floor(col);
                this.y = 0;
            } else {
                this.y = (rows - this._getMaxRow()) / 2;
            }
            this.x = col;
        },

        /**
         * 获取当前 layout 的列的最大值
         *
         * @returns {number}
         * @private
         */
        _getMaxCol: function () {
            var max = 0 ;
            for (var row = 0; row < this.layout.length; row++) {
                max = Math.max(max, this.layout[row].length);
            }
            return max;
        },

        /**
         * 最大的行数
         *
         * @private
         */
        _getMaxRow: function () {
            return this.layout.length;
        }
    };

    window.Shape = Shape;
})(window);