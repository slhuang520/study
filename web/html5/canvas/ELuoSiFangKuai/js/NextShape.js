/**
 * 下一个方块
 * Created by DreamCatcher on 2017/8/2.
 */
(function (window) {
    "use strict";

    /**
     * 下一个方块
     *
     * @constructor
     */
    function NextShape() {
        this.canvas = new Canvas("canvas_next_shape", 100, 70);
        this._init();
    }

    NextShape.prototype = {
        constructor: NextShape,

        _init: function () {
            this.rows = 4; //最多有4行
            this.cols = 6; //最多有6列
        },

        render: function (shape) {
            this.canvas.clear();
            shape.draw(this.canvas.context, 17);
        }
    };

    window.NextShape = NextShape;
})(window);