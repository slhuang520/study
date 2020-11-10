// require("babel-register"); //自动编译
// import "core-js"; //引入 polyfill
// import "regenerator-runtime/runtime";
const STATUS_PENDING = "pending";
const STATUS_RESOLVED = "resolved";
const STATUS_REJECTED = "rejected";
class MyPromise {
    constructor(fn) {
        this.catchAble = false;
        this.isRejected = false;
        this.state = STATUS_PENDING;
        this.handlers = [];
        this.frontVal;
        setTimeout(() => {
            fn(this.resolve.bind(this), this.reject.bind(this));
        });
    }

    then(resolve, reject) {
        this.handlers.push({resolve,reject});
        return this;
    }

    resolve(value){
        if (value && typeof value.then === "function") { //是否返回的是一个 Promise 对象
            value.handlers.push(...this.handlers.splice(0));
            return;
        }

        this.frontVal = value;
        if (this.state === STATUS_PENDING) {
            this.state = STATUS_RESOLVED;
        }
        this.deal();
    }

    reject(value) {
        if (value && typeof value.then === "function") {
            value.handlers.push(...this.handlers.splice(0));
            return;
        }

        this.frontVal = value;
        this.state = STATUS_REJECTED;
        this.deal();
    }

    catch(fun) {
        this.handlers.push({
            resolve: undefined,
            reject: fun
        });
        this.catchAble = true;
    }

    deal() {
        let funObj = this.findFn(),
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

        if (typeof fn === "function"){
            this.resolve(fn(this.frontVal)); //为何这里直接调用resolve？而不区分reject？是因为reject处理之后，后续的then还需要继续执行
        } else {
            this.resolve(fn || this.frontVal);
        }
    }

    findFn() {
        if (!this.handlers.length) {
            return;
        }

        let funObj = this.handlers.shift();
        if (this.isRejected) {
            if (typeof funObj.resolve !== "undefined") {
                return this.findFn();
            }
            this.isRejected = false;
        }
        return funObj;
    }
}

export default MyPromise;