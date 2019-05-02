/**
 * Created by DreamCatcher on 2017/9/24.
 */
/*
function tco(f) {
    var value;
    var active = false;
    var accumulated = [];

    return function accumulator() {
        accumulated.push(arguments);
        if (!active) {
            active = true;
            while (accumulated.length) {
                value = f.apply(this, accumulated.shift());
            }
            active = false;
            return value;
        }
    };
}

var sum = tco(function(x, y) {
    if (y > 0) {
        return sum(x + 1, y - 1)
    }
    else {
        return x
    }
});

sum(1, 100000)*/


/*
function sum(x, y) {
    if (y > 0) {
        return sum(x + 1, y - 1);
    } else {
        return x;
    }
}

sum(1, 100000);
*/

//console.log(`abc d  dd + ${new Date()}`);

/*var go = function*(){
    yield 1;
    yield 2;
    yield 3;
};

console.log([...go()]) // [1, 2, 3]

console.log(Array.from([1, , 2, , 3], n => n || 0))

console.log(Array.of(1, 2, 3, 4).includes(3));
//console.log("asdf".contains(3));*/


/*
class Math {
    @log
    add(a, b) {
        return a + b;
    }
}

function log(target, name, descriptor) {
    let oldValue = descriptor.value;
    descriptor.value = function () {
        console.log(`Calling "${name}" with( "${arguments}" )`);
        return oldValue.apply(null, arguments);
    };
    return descriptor;
}

let math = new Math();
math.add(1, 2);
*/


/*var __proto__ = "variable";

var obj1 = { __proto__ };
console.log(Object.getPrototypeOf(obj1) === Object.prototype);
console.log(obj1.hasOwnProperty("__proto__"));
console.log(obj1.__proto__ === "variable");

var obj2 = { __proto__() { return "hello"; } };
console.log(obj2.__proto__() === "hello");

var obj3 = { ["__prot" + "o__"]: 17 };
console.log(obj3.__proto__ === 17);*/

/*

class Polygon {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.name = "Polygon";
    }

    get area() {
        return this.square || this.width * this.height;
    }

    set area(square) {
        this.square = square;
    }

    sayName() {
        console.log(this.name);
    }
}

class Square extends Polygon{
    constructor(length) {
        super(length, length);
        this.name = "Square";
    }

    set area(square) {
        this.square = square;
        this.width = this.height =  Math.sqrt(square);
    }
}

let a = new Polygon(2, 3);
a.sayName();
console.log(a.width, a.height, a.square, a.name);

let b = new Square(5);
b.area = 16;
b.sayName();
console.log(b.width, b.height, b.square, b.name);
*/


'use strict';
var obj = {
    i: 10,
    b: () => console.log(this.i, this),
    c: function() {
        console.log( this.i, this)
    }
}
obj.b();
//undefined {}

obj.c();
// 10 { i: 10, b: [Function: b], c: [Function: c] }
