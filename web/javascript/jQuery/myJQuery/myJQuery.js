/**
 * Created by HuangSL on 2017/3/19.
 */
(function(){

    // 备份原来已经存在的重名对象
    var _jQuery = window.jQuery, _$ = window.$;

    // 暴露给外部使用的接口
    var jQuery = window.jQuery = window.$ = function(selector) {
        //return jQuery.fn.init(); //这样的话，每一个 jQuery 对象指向相同的地址
        return new jQuery.fn.init(selector); //但这样的话，得不到 jQuery 原型中的属性或方法，需要点①中的处理
    };

    // 处理原型对象
    jQuery.fn = jQuery.prototype = {
        init : function(selector) {
            selector = selector || document;

            // 处理 jQuery 参数，如果传进来的是一个 Dom 对象时，直接返回当前 jQuery 对象: Handle $(DOMElement)
            if ( selector.nodeType ) {
                this[0] = selector;
                this.length = 1;
                return this;
            }

            // 处理 HTML 元素
            if (typeof selector == "string") {

                var ele;
                // 以 ID 查询 : Handel $("#id")
                if ("#" == selector.substr(0, 1)) {
                    ele = [document.getElementById(selector.substr(1))];

                    // 以 Class 查询
                } else if ("." == selector.substr(0, 1)) {
                    ele = document.getElementsByClassName(selector.substr(1));

                    // 以 Name 查询
                } else {
                    ele = document.getElementsByTagName(selector);
                }

                Array.prototype.push.apply(this, ele);
            } else if (typeof  selector == "function") {
                //document.onload.apply(selector, this);
                // selector.call(document, jQuery);
                window.addEventListener('load', selector);
            }

            return this;
        },
        version : "1.0.0",
        length :0,
        size : function() {
            return this.length;
        }
    };

    // 点①：将 init 的原型指向 jQuery.fn
    jQuery.fn.init.prototype = jQuery.fn;

    // 实现继承
    jQuery.extend = jQuery.fn.extend = function() {
        var target = arguments[0] || {};

        // 目前只做给 jQuery 本身添加方法
        if (arguments.length == 1) {
            for (var prop in target) { // 目前只做浅拷贝
                this[prop] = target[prop];
            }
        } else {
            //TODO
        }
    };

    // 添加静态方法
    jQuery.extend({
        trim : function(text) {
            return (text||"").replace(/^\s+|\s+$/g, "");
        },

        // 处理冲突
        noConflict : function() {
            window.$ = _$;
            window.jQuery = _jQuery;
            return jQuery;
        }
    });

    // 添加实例方法
    jQuery.fn.extend({
        get : function(num) {
            num = num || 0;
            return this[num];
        },
        each : function(fn) {
            if (typeof fn == "function") {
                for (var i = 0; i < this.length; i++) {
                    fn(i, this[i]);
                }
            }

            return this;
        },
        css : function() {
            var len = arguments.length;
            if (len == 1) {
                return this[0].style[arguments[0]];
            } else if (len == 2 && arguments[0] && arguments[1]) {
                var name = arguments[0];
                var value = arguments[1];
                this.each(function(index, ele) {
                    ele.style[name] = value;
                });
            } else {
                //TODO
            }
            return this;
        }
    });

})();
