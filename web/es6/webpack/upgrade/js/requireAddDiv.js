import val from "./variables";
import src from "../images/C.jpg";

require("../css/index.css");
const div = document.createElement("div");
div.innerHTML = val.values;
document.body.appendChild(div);
alert(__("label")); //使用 __ 引入 resource 文言


// 使用 js 添加图片
let img = document.createElement("img");
img.src = src;
let imgDiv = document.createElement("div");
imgDiv.appendChild(img);
document.body.appendChild(imgDiv);
