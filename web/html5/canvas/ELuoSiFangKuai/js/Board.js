/**
 * 操作界面，通过 Board 操作 Canvas 对象
 * Created by DreamCatcher on 2017/7/29.
 */
(function(window) {
    "use strict";

    /**
     * 游戏操作界面
     *
     * @param gameInst
     * @constructor
     */
    function Board(gameInst) {
        this.gameInst = gameInst;
        this.blockSize = TetrisConfig.blockSize; //块大小
        this.rows = TetrisConfig.rows; //当前操作界面可以放多少行的方块
        this.cols = TetrisConfig.cols; //当前操作界面可以放多少列的方块
        this.canvas = new Canvas("canvas_game", this.cols * this.blockSize, this.rows * this.blockSize);
        this.context = this.canvas.context; //Canvas context
        this.boardList = []; //记录已经堆积的方块在当前界面的位置
        this.shape = new Shape(); //初始化一个方块
        this.shape.setPosition(this.rows, this.cols, true); //设置方块的位置

        this._init();
    }

    Board.prototype = {
        constructor: Board,

        /**
         * 操作界面初始化
         *
         * @private
         */
        _init: function() {
            this._buildGrid(); //网格初始化
            this._buildGridData(); //Data数据初始伦

            this.shape.draw(this.context); //显示当前方块
            var that = this;
            setTimeout(function () {
                that._buildNextShape(); //同时，显示下一个方块
            });
        },

        /**
         * 初始化Data数据
         *
         * @private
         */
        _buildGridData: function() {
            for (var i = 0; i < this.rows; i++) {
                this.boardList[i] = [];
                for (var j = 0; j < this.cols; j++) {
                    this.boardList[i][j] = 0;
                }
            }
        },

        /**
         * 绘制网格
         *
         * @private
         */
        _buildGrid: function() {
            this.context.strokeStyle = "green";
            this.context.lineWidth = 0.5;

            /*var i;
             for (i = 0; i < this.rows; i++) {
             this.context.moveTo(0, this.blockSize * i);
             this.context.lineTo(this.canvas.width, this.blockSize * i);
             }
             for (i = 0; i < this.cols; i++) {
             this.context.moveTo(this.blockSize * i, 0);
             this.context.lineTo(this.blockSize * i, this.canvas.height);
             }
             this.context.stroke();*/

            for (var i = 0; i < this.rows; i++) {
                for (var j = 0; j < this.cols; j++) {
                    this.context.strokeRect(this.blockSize * j, this.blockSize * i, this.blockSize, this.blockSize);
                }
            }

            // 缓存网格
            this.gridImageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
        },

        /**
         * 初始化下一个方块
         *
         * @private
         */
        _buildNextShape: function () {
            this.nextShape = new Shape();
            //下一个方块的位置中，x|y坐标可以是小数
            this.nextShape.setPosition(this.gameInst.nextShape.rows, this.gameInst.nextShape.cols, false); //居中显示
            this.gameInst.nextShape.render(this.nextShape);
        },

        /**
         * 图像翻转
         * 清除之前的，重新画出当前的
         */
        tick: function() {
            if (this.validMove(0, 1)) {
                this.shape.y++;
            } else {
                this._addShapeToBoardList(); //不能移动之后，记录当前的方块
                if (this.gameInst.status == "over") {
                    this.gameInst.endGame();
                    return;
                }
                clearInterval(TetrisConfig.intervalId);
                var that = this;
                TetrisConfig.intervalId = setInterval(function() {
                    that.tick();
                }, TetrisConfig.speed);
                this._clearFullBlocks(); //删除满格的行
                this.shape = this.nextShape; //将之前初始化的下一个方块显示在主界面
                this.shape.setPosition(this.rows, this.cols, true); //设置在主界面显示的位置，注意这里的x|y坐标不能有小数
                this._buildNextShape(); //更新下一个方块
            }
            this.refresh();
            this.shape.draw(this.context);
        },

        /**
         * 刷新画布
         */
        refresh: function() {
            this.canvas.clear();
            this.context.putImageData(this.gridImageData, 0 ,0); //使用缓存的网格
            this._drawBlocks(); //画出之前已经堆积的方块
        },

        /**
         * 验证是否可以移动
         *
         * @param moveX
         * @param moveY
         * @returns {boolean}
         */
        validMove: function(moveX, moveY) {
            //检查下一步的位置
            var nextX = this.shape.x + moveX;
            var nextY = this.shape.y + moveY;
            for (var row = 0; row < this.shape.layout.length; row++) {
                for (var col = 0; col < this.shape.layout[row].length; col++) {
                    if (this.shape.layout[row][col]) {
                        if (typeof this.boardList[nextY + row] === "undefined" //找不到行
                            || typeof this.boardList[nextY + row][nextX + col] === "undefined" //找不到列
                            || this.boardList[nextY + row][nextX + col] //当前方格已经有值
                            || nextX + col < 0 //超出左边界
                            || nextX + col > 15 //超出右边界
                            || nextY + row > 20) { //超出下边界
                            return false;
                        }
                    }
                }
            }
            return true;
        },

        /**
         * 记录当前的方块
         */
        _addShapeToBoardList: function() {
            for (var row = 0; row < this.shape.layout.length; row++) {
                for (var col = 0; col < this.shape.layout[row].length; col++) {
                    if (this.shape.layout[row][col]) {
                        var boardY = this.shape.y + row;
                        var boardX = this.shape.x + col;
                        if (this.boardList[boardY][boardX]) {
                            this.gameInst.status = "over";
                            return;
                        } else {
                            this.boardList[boardY][boardX] = this.shape.colorType; //保存当前的方块与颜色
                        }
                    }
                }
            }
        },

        /**
         * 画出之前所有的方块
         */
        _drawBlocks:function() {
            for (var row = 0; row < this.rows; row++) {
                for (var col = 0; col < this.cols; col++) {
                    if (this.boardList[row][col]) {
                        this.shape.block.draw(this.context, row, col, this.boardList[row][col]); //带着原有的颜色
                    }
                }
            }
        },

        /**
         * 消除满列的行
         */
        _clearFullBlocks: function() {
            var line = 0;
            for (var row = this.rows - 1; row >= 0; row--) {
                var filled = this.boardList[row].filter(function(item) {
                    return item > 0;
                });

                if (filled.length == this.cols) {
                    this.boardList.splice(row, 1); //移除一行
                    this.boardList.unshift(this._createEmptyRow()); //添加一行空的
                    line++;
                    row++;
                }
            }

            var score = line * 100 * line; //行数 * 单选得分 * 倍数
            var totalScore = this.gameInst.score.addScore(score); //当前总得分
            var curLevel = this.gameInst.level.checkLevel(totalScore); //判断是否升级了
            if(curLevel) {
                //升级后，更新下降的速度
                TetrisConfig.speed = Math.floor(TetrisConfig.constSpeed * (1 - (curLevel - 1) / 10));
            }
            this.gameInst.maxScore.checkScore(totalScore); //判断历史最高得分
        },

        /**
         * 创建一个空行
         *
         * @returns {Array}
         */
        _createEmptyRow: function() {
            var emptyRow = [];
            for (var col = 0; col < this.cols; col++) {
                emptyRow.push(0);
            }
            return emptyRow;
        }
    };

    window.Board = Board;
})(window);