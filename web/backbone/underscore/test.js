/**
 * Created by Administrator on 2016/7/4.
 */
//each
//console.log(_.each([1, 2, 3], alert)); //1 2 3
_.each({one: 1, two: 2, three: 3}, function(value, key){console.log(key + ":" + value)});// one:1 two:2 three:3

//map 返回一个数数组
console.log(_.map([1, 2, 3], function(num) { return num * 3})); //[3, 6, 9]
console.log(_.map({one: 1, two: 2, three: 3}, function(value, key){return value * 3})); //[3, 6, 9]
console.log(_.map({one: 1, two: 2, three: 3}, function(value, key){return key + 3})); //["one3", "two3", "three3"]
console.log(_.map([[1, 2], [3, 4]], _.first)); //[1, 3]

//reduce 把list中元素归结为一个单独的数值
console.log(_.reduce([1, 2, 3], function(memo, num) { return memo + num}, 0)); //6
console.log(_.reduce([1, 2, 3], function(memo, num) { return memo + num}, 10)); //16

//reduceRight  从右侧开始组合的元素
var list = [[0, 1], [2, 3], [4, 5]];
var flat = _.reduceRight(list, function(a, b) { return a.concat(b); }, []);
console.log(flat); //[4, 5, 2, 3, 0, 1]
flat = _.reduce(list, function(a, b) { return a.concat(b); }, []);
console.log(flat); //[0, 1, 2, 3, 4, 5]

//find 返回第一个找到的值
var even = _.find([1, 2, 3, 4, 5, 6], function(num){ return num % 3 == 0; });
console.log(even); //3

//filter 查找所有满足条件的值
var evens = _.filter([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; });
console.log(evens); //[2, 4, 6]