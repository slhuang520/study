/**
 * 小区块
 * Created by DreamCatcher on 2017/7/29.
 */
(function(window) {
    "use strict";

    /**
     * 小区块
     *
     * @param type
     * @constructor
     */
    function Block(type) {
        this.blockType = type;
        this.size = 30;
        this.originalSize = 32;
        this.sprite = window.ResourceManager.getResource("blocks");
    }

    Block.prototype = {
        constructor: Block,

        /**
         * 根据不同的颜色，画出不同的小方块，带有大小和在画布中的位置
         *
         * @param context
         * @param row
         * @param col
         * @param colorType
         * @param size
         */
        draw : function (context, row, col, colorType, size) {
            size = size || this.size;
            context.drawImage(this.sprite, ((colorType || this.blockType) - 1) * this.originalSize, 0, this.originalSize, this.originalSize, col * size, row * size, size, size);
        }
    };

    window.Block = Block;
})(window);