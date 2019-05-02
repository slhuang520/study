/**
 * Created by DreamCatcher on 2018/8/19.
 */
/**
 * 1.ready
 * 2.selector
 * 3.each()
 * 4.deferred
 * */
$(function () {
    var def = $.Deferred();
    def
        .always(function (...val) {
            console.log(this);
            console.log(val);
            console.log("always: " + val + " status: " + def.state());
        })
        .done(function (val) {
            console.log("done: " + val + " status: " + def.state());
        })
        .done(function (val) {
            console.log("done: " + val + " status: " + def.state());
            return "dfds";
        })
        .pipe(function (pipe) {
            console.log("pipe: " + pipe + " status: " + def.state());
        })
        .then(function (val) {
            console.log("then: " + val + " status: " + def.state());
        })
        .then(function (val) {
            console.log("then: " + val + " status: " + def.state());
        })
        .fail(function (err) {
            console.log("fail: " + err + " status: " + def.state());
        })
        .catch(function (e) {
            console.log("catch: " + e + " status: " + def.state());
        })
        .progress(function (p) {
            console.log("progress> " + p);
        });
    def.notify('notify').notify('notify1').resolveWith({a:1, b:2}, [3,4,5,6,{c:3}]);
    // def.notify('notify').notify('notify1').reject('reject');
});
//{a: 1, b: 2}
//(5) [3, 4, 5, 6, 7]
//always: 3,4,5,6,7 status: resolved
//done: 3 status: resolved
//pipe: 3 status: resolved
//then: undefined status: resolved
//progress> notify
//progress> notify1
