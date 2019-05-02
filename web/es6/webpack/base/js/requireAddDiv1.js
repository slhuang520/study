/**
 * Created by DreamCatcher on 2017/11/1.
 */
require("!style-loader!css-loader!../css/index.css");
//require("./addDiv1.js");
var div = document.createElement("div");
div.innerHTML = "Added second div.";
document.body.appendChild(div);


var div2 = document.createElement("div");
div2.innerHTML = "Added second div2.";
document.body.appendChild(div2);