/**
 * 管理资源文件
 * Created by DreamCatcher on 2017/7/29.
 */
(function( window ) {
    "use strict";

    var cacheMap = new Map(); // 用于存储资源的 Map 对象， ES6中的一个对象
    var resourceTotalCount = 1; // 资源总数量
    var currentLoaded = 0; //当前加载的资源数量

    var init = function () {
        var image = new Image();
        image.src = "./img/blocks.png";
        image.onload = function() {
            cacheMap.set("blocks", image);
            _onImageLoaded();
        }
    };

    function _onImageLoaded() {
        currentLoaded ++;
        if (currentLoaded == resourceTotalCount && typeof window.ResourceManager.onResourceLoaded == "function") {
            window.ResourceManager.onResourceLoaded();
        }
    }

    var getResource = function (key) {
        return cacheMap.get(key);
    };

    window.ResourceManager = {
        getResource: getResource,
        init: init,
        onResourceLoaded: null // 资源加载完成的回调
    };
})(window);