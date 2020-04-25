// require("babel-register"); //自动编译
// import "core-js"; //引入 polyfill
// import "regenerator-runtime/runtime";
const STATUS_PENDING = "pending";
const STATUS_RESOLVED = "resolved";
const STATUS_REJECTED = "rejected";
class MyPromise {
    constructor(fn) {
        this.handlers = {
            resolve: [],
            reject: []
        };
        this.frontVal;
        setTimeout(() => {
            fn(this.resolve.bind(this), this.reject.bind(this));
        });
    }

    then(resolve, reject) {
        this.handlers.resolve.push(resolve);
        this.handlers.reject.push(reject);
        return this;
    }

    resolve(value){
        if (value && typeof value.then === "function") {
            value.handlers.resolve.push(...this.handlers.resolve);
            value.handlers.reject.push(...this.handlers.reject);
            this.handlers = {
                resolve: [],
                reject: []
            };
            return value.then();
        }
        this.frontVal = value;
        if (MyPromise.state === STATUS_PENDING) {
            MyPromise.state = STATUS_RESOLVED;
        }
        this.deal();
    }

    reject(value) {
        if (value && typeof value.then === "function") {
            value.handlers.resolve.push(...this.handlers.resolve);
            value.handlers.reject.push(...this.handlers.reject);
            this.handlers = {
                resolve: [],
                reject: []
            };
            return value.then();
        }

        this.frontVal = value;
        MyPromise.state = STATUS_REJECTED;
        this.deal();
    }

    deal() {
        let handlers,
            len;

        if (MyPromise.state === STATUS_RESOLVED) {
            handlers = this.handlers.resolve;
        } else if (MyPromise.state === STATUS_REJECTED) {
            handlers = this.handlers.reject;
        }
        len = handlers.length;

        if (!len){
            return;
        }

        if (typeof handlers[0] === "function") {
            this.resolve(handlers.shift()(this.frontVal));
        } else {
            this.resolve(handlers.shift() || this.frontVal);
        }
    }
}
MyPromise.state = STATUS_PENDING;

export default MyPromise;