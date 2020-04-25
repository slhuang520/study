import Promise from "./MyPromise.js";

class TestMyPromise {
    constructor() {

    }

    doSomeThing() {
        return new Promise(function (resolve, reject) {
            resolve(66);
            // reject(777);
        }).then().then(123);
    }

    test() {
        this.doSomeThing()
            .then(function (val) {
                console.log("first:", val);
                return 88;
            }, function (val) {
                console.log(val, "reject");
                return 588;
            }).then(function (val) {
            console.log("second:", val);
            return new Promise(function (resolve, reject) {
                console.log("inner promise");
                resolve(555);
            }).then().then(function (val) {
                console.log(val, "***");
                return new Promise(function (resolve, reject) {
                    console.log("inner inner promise");
                    resolve(555111);
                }).then().then(function (val) {
                    console.log(val, "111***");
                });
            });
        }).then(function (val) {
            console.log("third:", val);
        });
    }
}
console.log(1);
let testPromise = new TestMyPromise();
testPromise.test();
console.log(2);