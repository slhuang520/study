var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");

var WIDTH = document.documentElement.clientWidth;
var HEIGHT = document.documentElement.clientHeight;
//document.click();
window.onclick = document.onclick = function (e) {
    //launchFullscreen(document.documentElement); // 整个网页
    //launchFullscreen(document.getElementById("myCanvas")); // 某个页面元素
    fullScreen();
    WIDTH = window.screen.width;
    HEIGHT = window.screen.height;
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
};
// document.onkeypress=function(e) {
//     var keynum = window.event ? e.keyCode : e.which; //获取键盘码
//     var keychar = String.fromCharCode(keynum);//获取键盘吗对应的字符
//     alert(keynum);
// }
//监听退出全屏事件
window.onresize = function(e) {
    WIDTH = window.screen.width;
    HEIGHT = window.screen.height;
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    if (isFullscreenForNoScroll()) {
        var evt = e || window.event;
        evt.cancelBubble = true;
        evt.returnValue = false;
        if(evt.preventDefault) evt.preventDefault();
        if(evt.stopPropagation) evt.stopPropagation();
        console.log(111111111111)
        return false;
    }
};
function isFullscreenForNoScroll(){
    var explorer = window.navigator.userAgent.toLowerCase();
    if(explorer.indexOf('chrome')>0){//webkit
        if ((document.body.scrollHeight - 3) === window.screen.height && document.body.scrollWidth === window.screen.width) {
            console.log("全屏");
            return true;
        } else {
            console.log("不全屏");
            return false;
        }
    }else{//IE 9+  fireFox
        if (window.outerHeight === window.screen.height && window.outerWidth === window.screen.width) {
            console.log("全屏");
            return true;
        } else {
            console.log("不全屏");
            return false;
        }
    }
}


// function checkFull() {
//     var isFull = document.fullscreenEnabled       ||
//     document.mozFullScreenEnabled    ||
//     document.webkitFullscreenEnabled ||
//     document.msFullscreenEnabled || false;
//
//     return isFull;
// }

//屏蔽鼠标右键、Ctrl+N、Shift+F10、F11、F5刷新、退格键
document.oncontextmenu = function(e) {
    window.event.returnValue = false;
}; //屏蔽鼠标右键
window.onhelp = function() {
    window.event.cancelBubble = true;
    window.event.returnValue = false;
    if(window.event.preventDefault) window.event.preventDefault();
    if(window.event.stopPropagation) window.event.stopPropagation();
    return false;
}; //屏蔽F1帮助
/*window.onkeydown = document.onkeydown = document.documentElement.onkeydown = function(e) {
    var evt = e || window.event;
    var currKey = evt.keyCode||evt.which||evt.charCode;
    //alert(currKey);
    if ((evt.altKey) && ((currKey == 37) || //屏蔽 Alt+ 方向键 ←
            (currKey == 39))) //屏蔽 Alt+ 方向键 →
    {
        alert("不准你使用ALT+方向键前进或后退网页！");
        //event.returnValue = false;
        evt.cancelBubble = true;
        evt.returnValue = false;
        if(evt.preventDefault) evt.preventDefault();
        if(evt.stopPropagation) evt.stopPropagation();
    }
    /!* 注：这还不是真正地屏蔽 Alt+ 方向键，
    因为 Alt+ 方向键弹出警告框时，按住 Alt 键不放，
    用鼠标点掉警告框，这种屏蔽方法就失效了。以后若
    有哪位高手有真正屏蔽 Alt 键的方法，请告知。*!/
    if ((currKey == 8) || //屏蔽退格删除键
        (currKey == 27) || //屏蔽ESC.不成功
        (currKey == 112) || //屏蔽 F1
        (currKey == 113) || //屏蔽 F2
        (currKey == 114) || //屏蔽 F3
        (currKey == 115) || //屏蔽 F4
        (currKey == 116) || //屏蔽 F5
        (currKey == 117) || //屏蔽 F6
        (currKey == 118) || //屏蔽 F7
        (currKey == 119) || //屏蔽 F8
        (currKey == 120) || //屏蔽 F9
        (currKey == 121) || //屏蔽 F10
        (currKey == 122) || //屏蔽 F11
        //(currKey == 123) || //屏蔽 F12
        (evt.ctrlKey && currKey == 82) || //Ctrl + R
        (evt.ctrlKey && currKey == 78) || //Ctrl+n
        (evt.shiftKey && currKey == 121) || ////屏蔽 shift+F10
        (evt.srcElement.tagName == "A" && evt.shiftKey) || ////屏蔽 shift 加鼠标左键新开一网页
        (evt.altKey && currKey == 115) ////屏蔽Alt+F4
    ){
        evt.keyCode = 0;
        evt.cancelBubble = true;
        evt.returnValue = false;
        if(evt.preventDefault) evt.preventDefault();
        if(evt.stopPropagation) evt.stopPropagation();
    }
};*/
window.onkeydown = function (e) {
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if(e && e.keyCode == 122){//捕捉F11键盘动作
        e.preventDefault();  //阻止F11默认动作
        var el = document.documentElement;
        var rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullScreen;//定义不同浏览器的全屏API
        //执行全屏
        if (typeof rfs != "undefined" && rfs) {
            rfs.call(el);
        } else if(typeof window.ActiveXObject != "undefined"){
            var wscript = new ActiveXObject("WScript.Shell");
            if (wscript!=null) {
                wscript.SendKeys("{F11}");
            }
        }
        //监听不同浏览器的全屏事件，并件执行相应的代码
        document.addEventListener("webkitfullscreenchange", function(evt) {//
            if (document.webkitIsFullScreen) {
                //全屏后要执行的代码
            }else{
                //退出全屏后执行的代码
                evt.keyCode = 0;
                evt.cancelBubble = true;
                evt.returnValue = false;
                if(evt.preventDefault) evt.preventDefault();
                if(evt.stopPropagation) evt.stopPropagation();
            }
        }, false);

        document.addEventListener("fullscreenchange", function(evt) {
            if (document.fullscreen) {
                //全屏后执行的代码
            }else{
                evt.keyCode = 0;
                evt.cancelBubble = true;
                evt.returnValue = false;
                if(evt.preventDefault) evt.preventDefault();
                if(evt.stopPropagation) evt.stopPropagation();
                //退出全屏后要执行的代码
            }
        }, false);

        document.addEventListener("mozfullscreenchange", function(evt) {
            if (document.mozFullScreen) {
                //全屏后要执行的代码
            }else{
                //退出全屏后要执行的代码
                evt.keyCode = 0;
                evt.cancelBubble = true;
                evt.returnValue = false;
                if(evt.preventDefault) evt.preventDefault();
                if(evt.stopPropagation) evt.stopPropagation();
            }
        }, false);

        document.addEventListener("msfullscreenchange", function(evt) {
            if (document.msFullscreenElement) {
                //全屏后要执行的代码
            }else{
                //退出全屏后要执行的代码
                evt.keyCode = 0;
                evt.cancelBubble = true;
                evt.returnValue = false;
                if(evt.preventDefault) evt.preventDefault();
                if(evt.stopPropagation) evt.stopPropagation();
            }
        }, false)
    }
};

// setTimeout(function() {
//     // IE
//     if(document.all) {
//         document.click();
//     }
//     // 其它浏览器
//     else {
//         var e = document.createEvent("MouseEvents");
//         e.initEvent("click", true, true);
//         document.dispatchEvent(e);
//     }
// }, 1000);

function fullScreen() {

    var el = document.documentElement;

    var rfs = el.requestFullScreen || el.webkitRequestFullScreen ||

        el.mozRequestFullScreen || el.msRequestFullScreen;

    if(typeof rfs != "undefined" && rfs) {

        rfs.call(el);

    } else if(typeof window.ActiveXObject != "undefined") {

        //for IE，这里其实就是模拟了按下键盘的F11，使浏览器全屏

        var wscript = new ActiveXObject("WScript.Shell");

        if(wscript != null) {

            wscript.SendKeys("{F11}");

        }

    }
}
//window.screen.availHieght = "100%";
//window.screen.availWidth = "100%";

// //fullScreen(canvas);
// if (document.documentElement.requestFullscreen) {
//     document.documentElement.requestFullscreen();
// } else if (document.documentElement.webkitRequestFullScreen) {
//     document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
// } else if (document.documentElement.mozRequestFullScreen) {
//     document.documentElement.mozRequestFullScreen();
// } else {
//     //
// }
// 判断各种浏览器，找到正确的方法
function launchFullscreen(element) {
    if(element.requestFullscreen) {
        element.requestFullscreen();
    } else if(element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if(element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if(element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
}
// 启动全屏!
launchFullscreen(document.documentElement); // 整个网页
launchFullscreen(document.getElementById("myCanvas")); // 某个页面元素

canvas.width = WIDTH;
canvas.height = HEIGHT;

// function fullScreen(element) {
//     if(element.requestFullScreen) {
//         element.requestFullScreen();
//     } else if(element.webkitRequestFullScreen ) {
//         element.webkitRequestFullScreen();
//     } else if(element.mozRequestFullScreen) {
//         element.mozRequestFullScreen();
//     }
// }

var config = {
    speedMin: -7,
    speedMax: 7,
    ballMin: 10,
    ballMax: 20,
    ballCount: 30
};

/**
 * function to generate random number
 *
 * @param max
 * @param min
 * @returns {*}
 */
function random (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * define Ball constructor
 *
 * @param x
 * @param y
 * @param velX
 * @param velY
 * @param color
 * @param size
 */
function Ball (x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
}

/**
 * define Ball draw method
 */
Ball.prototype.draw = function () {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
};

/**
 * define Ball update method
 */
Ball.prototype.update = function () {
    if ((this.x + this.size) >= WIDTH) {
        this.velX = -this.velX;
    }
    if ((this.x - this.size) <= 0) {
        this.velX = -this.velX;
    }

    if ((this.y + this.size) >= HEIGHT) {
        this.velY = -this.velY;
    }
    if ((this.y - this.size) <= 0) {
        this.velY = -this.velY;
    }

    this.x += this.velX;
    this.y += this.velY;
};

/**
 * define Ball collision detection
 */
Ball.prototype.collisionDetect = function () {
    for (var j = 0; j < balls.length; j++) {
        var ball = balls[j];
        if (this !== ball) { // be care of this line, we can't compare one with itself
            var dxv = this.x + this.velX - (ball.x + ball.velX); //detect the next step which will updated
            var dyv = this.y + this.velY - (ball.y + ball.velY);
            var distance = Math.sqrt(dxv * dxv + dyv * dyv);

            if (distance <= this.size + ball.size) {
                ball.color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';

                // rebound the balls when collision
                var dvx = this.velX - ball.velX;
                var dvy = this.velY - ball.velY;
                var dx = this.x - ball.x; // but when update just use this step
                var dy = this.y - ball.y;
                var xx_yy = dx * dx + dy * dy;
                var v_dvx = (dvx * dx * dx + dvy * dx * dy) / xx_yy;
                var v_dvy = (dvy * dy * dy + dvx * dx * dy) / xx_yy;
                this.velX = checkSpeed(this.velX - v_dvx);
                this.velY = checkSpeed(this.velY - v_dvy);
                ball.velX = checkSpeed(ball.velX + v_dvx);
                ball.velY = checkSpeed(ball.velY + v_dvy);
            }
        }
    }
};

/**
 * validate the speed
 *
 * @param speed
 * @returns {*}
 */
function checkSpeed (speed) {
    if (speed > config.speedMax) {
        speed = config.speedMax;
    } else if (speed < config.speedMin) {
        speed = config.speedMin;
    }
    return speed;
}

// define array to store balls
var balls = [];

/**
 * draw the balls loops
 */
function loop () {
    ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    while (balls.length < config.ballCount) {
        var b_var = createBall();
        var ball = new Ball(
            b_var.x,
            b_var.y,
            random(config.speedMin, config.speedMax),
            random(config.speedMin, config.speedMax),
            "rgb(" + random(0, 255) + "," + random(0, 255) + "," + random(0, 255) + ")",
            b_var.r
        );
        balls.push(ball);
    }

    for (var i = 0; i < balls.length; i++) {
        balls[i].draw();
        balls[i].collisionDetect(); //detect before update
        balls[i].update();
    }

    // run again and again to realize the effect of the animation
    requestAnimationFrame(loop);
}

var createdBalls = [];

/**
 * ensure the created ball will not collision
 *
 * @returns {{x: *, y: *, r: *}}
 */
function createBall () {
    var x = random(0, WIDTH);
    var y = random(0, HEIGHT);
    var r = random(config.ballMin, config.ballMax);
    for (var i = 0; i < createdBalls.length; i++) {
        var dx = createdBalls[i].x - x;
        var dy = createdBalls[i].y - y;
        var distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < createdBalls[i].r + r) {
            return createBall();
        }
    }
    var ball = {
        x: x,
        y: y,
        r: r
    };
    createdBalls.push(ball);
    return ball;
}


loop();
