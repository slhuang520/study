/**
 * Created by DreamCatcher on 2018/4/26.
 */
function createXHR () {
    var xhr = null;
    try {
        //Firefox, Opera8.0+, Safari, IE7+
        xhr = new XMLHttpRequest();
    } catch (e) {
        try {
            xhr = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
                xhr = null;
            }
        }
    }
    return xhr;
}

/*
   惰性函数
 */
function createXHR () {
    var xhr = null;
    if (XMLHttpRequest) {
        xhr = new XMLHttpRequest();
        createXHR = function () {
            return new XMLHttpRequest();
        }
    } else {
        try {
            xhr = new ActiveXObject("Msxml2.XMLHTTP");
            createXHR = function () {
                return new ActiveXObject("Msxml2.XMLHTTP");
            }
        } catch (e) {
            try {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
                createXHR = function () {
                    return new ActiveXObject("Microsoft.XMLHTTP");
                }
            } catch (e) {
                xhr = null;
                createXHR = function () {
                    return null;
                }
            }
        }
    }
    return xhr;
}
