/**
 * Created by Administrator on 2016/7/26.
 */
console.log("-----------number_2_String-----------");
//1 数值转换成字符串
//1.1 自动类型转换
var n2s = 1 + "";
console.log(n2s); //'1'
console.log(typeof n2s); //'string'

//1.2 函数转换
//1.2.1 toString()
//1.2.1.1 带参数(参数：表示以什么进制输出)
var n2s_2 = 1234;
console.log(n2s_2.toString(2));  //'10011010010'
console.log(n2s_2.toString(8));  //'2322'
console.log(n2s_2.toString(10)); //'1234'
console.log(n2s_2.toString(16)); //'4d2'

//1.2.1.2 不带参数
console.log(n2s_2.toString());   //'1234'

// 1.3 String(value)
console.log(String(n2s_2));      //'1234'
console.log(String(true));       //'true'

console.log("-----------string_2_number-----------");
//2 字符串转换成数值
//2.1 parseInt(str)
var s2n = "1234";
console.log(parseInt(s2n));   //1234
console.log(parseInt(false)); //NaN

//2.2 parseFloat(str)
console.log(parseFloat(s2n)); //1234
console.log(parseFloat(true));//NaN

//2.3 Number(str)
console.log(Number(s2n));     //1234

//2.4 自动类型转换
console.log("123" - 0);      //123

console.log("-----------Number-----------");
//3 Number(bool) => Boolean 转换成 Number
console.log(Number(true));   //1
console.log(Number(false));  //0

console.log("-----------boolean-----------");
// 4 转换成 Boolean
// 4.1 Boolean(value)
console.log(Boolean(1));    //true
console.log(Boolean(0));    //false
console.log(Boolean("1")); //true
console.log(Boolean("0")); //true
console.log(Boolean(""));  //false
console.log(Boolean(" ")); //true
console.log(Boolean(String.empty));  //false
console.log(Boolean({}));  //true
console.log(Boolean(new String()));  //true

// 4.2 !! 将任意类型转换成 Boolean
console.log(!!1);   //true
console.log(!!0);   //false
console.log(!!"");  //false
console.log(!!" "); //true

console.log("-----------instanceof-----------");
//5 instanceof 检测对象的类型
var str = new String(123);
console.log(str instanceof String); //true
console.log("123" instanceof String); //false

var obj = {a:1, b:2};
console.log(obj);
delete obj.a;
console.log(obj);

console.log("-----------&&-----------");
console.log(1 && 2);       //2
console.log("a" && 2);     //2
console.log({} && "a");    //'a'
console.log({} && {});     //Object {}
console.log(false && {}); //false
console.log(true && {});  //Object {}
console.log(null && 1);   //null
console.log(1 && null);   //null
console.log("a" && NaN);  //NaN
console.log(NaN && 2);    //NaN
console.log(undefined && 2);    //undefined
console.log(2 && undefined);    //undefined
console.log(NaN && undefined);    //NaN

console.log("-------------Array-------------");
var arr = new Array(2);
console.log(arr[0]);

console.log("-------------函数自改变-------------");
function a() {
    console.log("aaaa");
    a = function() {
        console.log("bbb");
    }
}
a();
a();

console.log("-------------闭包1-------------");
var fun1 = function() {
    var n = 0;
    return function() {
        return n++;
    }
};
var fun2 = fun1();
console.log(fun2());
console.log(fun2());
console.log(fun2());
console.log(fun2());

console.log("-------------闭包2-------------");
function fun3() {
    var n = 0;
    var fun4 = function() {
        return n++;
    };
    return fun4;
}
var fun5 = fun3();
console.log(fun5());
console.log(fun5());
console.log(fun5());
console.log(fun5());

console.log("-------------闭包3-------------");
function fun6() {
    var arr = [];
    var n = 3;
    for (var i = 0; i < n; i++) {
        arr[i] = i; //arr[i] 是一个固定数值
    }
    return arr;
}
var arr1 = fun6();
console.log(arr1[0]);
console.log(arr1[1]);
console.log(arr1[2]);

console.log("-------------闭包4-------------");
function fun7() {
    var arr = [];
    var n = 0;
    for (var i = 0; i < 3; i++) {
        arr[i] = n++;  //arr[i] 是一个固定数值
    }
    return arr;
}
var arr2 = fun7();
console.log(arr2[0]);
console.log(arr2[1]);
console.log(arr2[2]);

console.log("-------------闭包5-------------");
function fun8() {
    var arr = [];
    var i;
    for (i = 0; i < 3; i++) {
        arr[i] = function() { //arr[i] 是一个固定数值
            return i;
        }();
    }
    return arr;
}
var arr3 = fun8();
console.log(arr3[0]);
console.log(arr3[1]);
console.log(arr3[2]);

console.log("-------------闭包6-------------");
function fun9() {
    var arr = [];
    var i;
    for (i = 0; i < 3; i++) {
        arr[i] = function() {
            return i;  //arr[i] 是一个变量
        };
    }
    return arr;
}
var arr4 = fun9();
console.log(arr4[0]()); //同时指向闭包中的 i
console.log(arr4[1]()); //同时指向闭包中的 i
console.log(arr4[2]()); //同时指向闭包中的 i

console.log("-------------闭包7-------------");
function fun10() {
    var arr = [];
    var i;
    for (i = 0; i < 3; i++) {
        arr[i] = (function(x){
            return function() {   //arr[i] 是一个函数
                return x;
            }
        })(i);
    }
    return arr;
}
var arr5 = fun10();
console.log(arr5[0]()); //指向闭包中的 x
console.log(arr5[1]()); //指向闭包中的 x
console.log(arr5[2]()); //指向闭包中的 x

console.log("-------------caller-------------");
function A() {
    return A.caller;
}
function B() {
    return A();
}
console.log(B());// function B()
console.log(A());// null

console.log("-------------callee-------------");
(function(x) {
    if (x < 3) {
        console.log(x);
        arguments.callee(++x);
    }
})(0);

console.log("-------------prototype-------------");
function Star(name) {
    this.name = name;
}
function Moon(age) {
    this.age = age;
}
console.log(Moon.prototype);
console.log(Moon.constructor);
var moon = new Moon(12);
console.log(moon.prototype);
console.log(moon.constructor);

console.log("\n");
Moon.prototype = Star;
console.log(Moon.prototype);
console.log(Moon.constructor);
var moon = new Moon(12);
console.log(moon.prototype);
console.log(moon.constructor == Function);//true
moon.constructor = Moon;
console.log(moon.constructor);

console.log("\n");
Moon.prototype = new Star("A");
console.log(Moon.prototype);
console.log(Moon.constructor);
var moon = new Moon(12);
console.log(moon.prototype);
console.log(moon.constructor == Function);

console.log("-------------反转字符串-------------");
function reverseStr (str) {
    return Array.prototype.reverse.apply(str.split("")).join("");
}
console.log(reverseStr("huang"));
console.log(reverseStr("huangshulin"));

function arrMax(arr) {
    return Math.max.apply(null, arr);
}
console.log(arrMax([1,2,3,4,5]));
/*
console.log("-------------原型链继承_实例继承-------------");
//缺点：将不是共用的属性也继承下来了
//一边形
function Shape(length){
    this.name = "Shape";
    this.length = length;
    this.toString = function() {
        return this.name;
    }
}
//两边形
function TwoDShape(){
    this.name = "TwoDShape";
}
TwoDShape.prototype = new Shape(111);//length 不共通
TwoDShape.prototype.constructor = TwoDShape;
//三边形
function Triangle(width, height){
    this.width = width;
    this.height = height;
    this.name = "Triangle";
    this.getArea = function() {
        return this.width*this.height/2;
    }
}
Triangle.prototype = new TwoDShape();
Triangle.prototype.constructor = Triangle;

var shape = new Shape(100);
console.log(shape.name); //'Shape'
console.log(shape.length);//100
console.log(shape.toString());//'Shape'

var twoDShape = new TwoDShape();
console.log(twoDShape.name);//'TwoDShape'
console.log(twoDShape.length);//111
console.log(twoDShape.toString());//'TwoDShape'

var triangle = new Triangle(5, 10);
console.log(triangle.name);//'Triangle'
console.log(triangle.length);//111
console.log(triangle.getArea());//25
console.log(triangle.toString());//'Triangle'
*/
/*
console.log("-------------原型链继承_原型继承-------------");
//缺点：如果父类与子类存在相同属性，则父类对该属性的修改会影响到子类
//一边形
function Shape(length){
    this.length = length;
}
Shape.prototype.name = "Shape";
Shape.prototype.toString = function() {
    return this.name;
};
//两边形
function TwoDShape(){}
TwoDShape.prototype = Shape.prototype;//只继承原型中共通的属性
TwoDShape.prototype.constructor = TwoDShape;
TwoDShape.prototype.name = "TwoDShape";//这个属性需要定义下在原型改变之后，不然会被原型中的覆盖
//三边形
function Triangle(width, height){
    this.width = width;
    this.height = height;
}
Triangle.prototype = TwoDShape.prototype;
Triangle.prototype.constructor = Triangle;
Triangle.prototype.name = "Triangle";
Triangle.prototype.getArea = function() {
    return this.width*this.height/2;
};

var shape = new Shape(100);
console.log(shape.name);//'Triangle';
console.log(shape.length);//100
console.log(shape.toString());//'Triangle';

var twoDShape = new TwoDShape();
console.log(twoDShape.name);//'Triangle';
console.log(twoDShape.toString());//'Triangle';

var triangle = new Triangle(5, 10);
console.log(triangle.name);//'Triangle';
console.log(triangle.getArea());//25
console.log(triangle.toString());//'Triangle';
*/
/*
console.log("-------------原型链继承_对象原型继承-------------");
//使用中间对象转换
//一边形
function Shape(length){
    this.length = length;
}
Shape.prototype.name = "Shape";
Shape.prototype.toString = function() {
    return this.name;
};
//两边形
function TwoDShape(){}
var F = function(){};
F.prototype = Shape.prototype;
TwoDShape.prototype = new F();
TwoDShape.prototype.constructor = TwoDShape;
TwoDShape.prototype.name = "TwoDShape";//这个属性需要定义下在原型改变之后，不然会被原型中的覆盖
//三边形
function Triangle(width, height){
    this.width = width;
    this.height = height;
}
var E = function(){};
E.prototype = TwoDShape.prototype;
Triangle.prototype = new E();
Triangle.prototype.constructor = Triangle;
Triangle.prototype.name = "Triangle";
Triangle.prototype.getArea = function() {
    return this.width*this.height/2;
};

var shape = new Shape(100);
console.log(shape.name);//'Shape';
console.log(shape.length);//100
console.log(shape.toString());//'Shape';

var twoDShape = new TwoDShape();
console.log(twoDShape.name);//'TwoDShape';
console.log(twoDShape.toString());//'TwoDShape';

var triangle = new Triangle(5, 10);
console.log(triangle.name);//'Triangle';
console.log(triangle.getArea());//25
console.log(triangle.toString());//'Triangle';
*/
/*
console.log("-------------原型链继承_继承所有相同的方法-------------");
//一边形
function Shape(length){
    this.length = length;
}
Shape.prototype.name = "Shape";
Shape.prototype.toString = function() {
    var result = [];
    if (this.constructor.uber) {//uber属性：指向父类原型。
        result[result.length] = this.constructor.uber.toString();
    }
    result[result.length] = this.name;
    return result.join(", ");
};
//两边形
function TwoDShape(){}
var F = function(){};
F.prototype = Shape.prototype;
TwoDShape.prototype = new F();
TwoDShape.prototype.constructor = TwoDShape;
TwoDShape.uber = Shape.prototype;//js本身并没有这个属性。“uber”是某些人在模拟class时用来表示super的
TwoDShape.prototype.name = "TwoDShape";

var shape = new Shape(100);
console.log(shape.name);//'Shape';
console.log(shape.length);//100
console.log(shape.toString());//'Shape';

var twoDShape = new TwoDShape();
console.log(twoDShape.name);//'TwoDShape';
console.log(twoDShape.toString());//'Shape, TwoDShape';
*/
console.log("-------------原型链继承_继承封装-------------");
function extend(Child, Parent){
    var F = function(){};
    F.prototype = Parent.prototype;
    Child.prototype = new F();
    Child.prototype.constructor = Child;
    Child.uber = Parent.prototype;
}
//一边形
function Shape(length){
    this.length = length;
}
Shape.prototype.name = "Shape";
Shape.prototype.toString = function() {
    var result = [];
    if (this.constructor.uber) {//uber属性：指向父类原型。
        result[result.length] = this.constructor.uber.toString();
    }
    result[result.length] = this.name;
    return result.join(", ");
};
//两边形
function TwoDShape(){}
extend(TwoDShape, Shape);
TwoDShape.prototype.name = "TwoDShape";

//三边形
function Triangle(width, height){
    this.width = width;
    this.height = height;
}
extend(Triangle, TwoDShape);
Triangle.prototype.name = "Triangle";
Triangle.prototype.getArea = function() {
    return this.width*this.height/2;
};

var shape = new Shape(100);
console.log(shape.name);//'Shape';
console.log(shape.length);//100
console.log(shape.toString());//'Shape';

var twoDShape = new TwoDShape();
console.log(twoDShape.name);//'TwoDShape';
console.log(twoDShape.toString());//'Shape, TwoDShape';

var triangle = new Triangle(5, 10);
console.log(triangle.name);//'Triangle';
console.log(triangle.getArea());//25
console.log(triangle.toString());//'Shape, TwoDShape, Triangle';

console.log("-------------JS的解析与执行过程-------------");
var a = 1;
function test() {
    console.log(a);
    var a = 5; //明有冲突，变量覆盖了之前的全局变量a，但只是声明，初始值为 undefined
}
//这是为什么？
test();//undefined
/*
console.log("-------------用声明的方式创建的函数与函数表达式的区别-------------");
_f(); //FF
_g(); //base.js:491 Uncaught TypeError: _g is not a function
function _f(){
    console.log("FF");
}
var _g = function(){
    console.log("GG");
};
*/

console.log("-------------变量声明冲突-------------");
console.log(conflict);
function conflict(){
    console.log(123);
}
function conflict() {
    console.log('Two');
}

console.log("-------------函数的执行阶段-------------");
function test_fun(a, b){
    console.log(a);
    console.log(b); //2

    var b = 100; //会忽略
    function a() { //会覆盖
        console.log(123);
    }
}
test_fun(1, 2);

/*
var a = 1;
function t(){
    console.log(a);
    var a = 4;
}
t();
console.log(aa);
var aa = 1;
console.log(aa); //1
var aa = 100;
console.log(aa); //100
*/
console.log("-------------闭包-减少全局变量-------------");
function cal(){
    var base = 0;
    function adder() {
        base++;
        console.log(base);
    }
    return adder;
}
var add = cal();
add();
add();
add();

function fu1() {
    var a = 1;
    function fu2() { // fu2需要使用 fu1 中的变量，如果不这样写，a 变量需要放到全局变量中，才能共同使用
        console.log(a);
    }
    window.f2 = fu2;
}
fu1();
f2();

console.log("-------------闭包-减少传递给函数的参数数量-------------");
function calFactory(base){
    base = base || 0;
    return function(max) {
        var total = 0;
        for (var i = 1; i <= max; i++) {
            total = total + i;
        }
        return total + base;
    }
}
var fun1 = calFactory(2);
console.log(fun1(3));//8
console.log(fun1(2));//5
var fun1 = calFactory(4);
console.log(fun1(3));//10
console.log(fun1(2));//7

console.log("-------------闭包-封装-------------");
(function() {
    var m = 0;
    function getM(){ //实现对m的封装
        return m; //使用闭包
    }
    function setM(val){
        m = val;
    }
    window.g = getM;
    window.s = setM;
})();
s(3);
console.log(g());















