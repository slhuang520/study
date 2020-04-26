"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.function.bind");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

require("core-js/modules/web.timers");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// require("babel-register"); //自动编译
// import "core-js"; //引入 polyfill
// import "regenerator-runtime/runtime";
var STATUS_PENDING = "pending";
var STATUS_RESOLVED = "resolved";
var STATUS_REJECTED = "rejected";

var MyPromise = /*#__PURE__*/function () {
  function MyPromise(fn) {
    var _this = this;

    _classCallCheck(this, MyPromise);

    this.catchAble = false;
    this.isRejected = false;
    this.state = STATUS_PENDING;
    this.handlers = [];
    this.frontVal;
    setTimeout(function () {
      fn(_this.resolve.bind(_this), _this.reject.bind(_this));
    });
  }

  _createClass(MyPromise, [{
    key: "then",
    value: function then(resolve, reject) {
      this.handlers.push({
        resolve: resolve,
        reject: reject
      });
      return this;
    }
  }, {
    key: "resolve",
    value: function resolve(value) {
      if (value && typeof value.then === "function") {
        var _value$handlers;

        //是否返回的是一个 Promise 对象
        (_value$handlers = value.handlers).push.apply(_value$handlers, _toConsumableArray(this.handlers));

        this.handlers = [];
        return;
      }

      this.frontVal = value;

      if (this.state === STATUS_PENDING) {
        this.state = STATUS_RESOLVED;
      }

      this.deal();
    }
  }, {
    key: "reject",
    value: function reject(value) {
      if (value && typeof value.then === "function") {
        var _value$handlers2;

        (_value$handlers2 = value.handlers).push.apply(_value$handlers2, _toConsumableArray(this.handlers));

        this.handlers = [];
        return;
      }

      this.frontVal = value;
      this.state = STATUS_REJECTED;
      this.deal();
    }
  }, {
    key: "catch",
    value: function _catch(fun) {
      this.handlers.push({
        resolve: undefined,
        reject: fun
      });
      this.catchAble = true;
    }
  }, {
    key: "deal",
    value: function deal() {
      var funObj = this.findFn(),
          fn;

      if (!funObj) {
        return;
      }

      if (this.state === STATUS_RESOLVED) {
        fn = funObj.resolve;
      } else if (this.state === STATUS_REJECTED) {
        fn = funObj.reject;
      }

      if ((!fn || typeof fn !== "function") && this.state === STATUS_REJECTED) {
        if (this.catchAble) {
          this.isRejected = true;
          return this.deal();
        }

        throw new Error("Exist Un-catched Error!");
      }

      this.state = STATUS_RESOLVED;

      if (typeof fn === "function") {
        this.resolve(fn(this.frontVal));
      } else {
        this.resolve(fn || this.frontVal);
      }
    }
  }, {
    key: "findFn",
    value: function findFn() {
      if (!this.handlers.length) {
        return;
      }

      var funObj = this.handlers.shift();

      if (this.isRejected) {
        if (typeof funObj.resolve !== "undefined") {
          return this.findFn();
        }

        this.isRejected = false;
      }

      return funObj;
    }
  }]);

  return MyPromise;
}();

var _default = MyPromise;
exports["default"] = _default;