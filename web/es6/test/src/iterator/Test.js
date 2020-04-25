import M from "./MiddleAware";

const cut = 5; //中止开关
const arr = [];

for (let count = 0; count < 8; count++ ){
    arr.push(next => {
        console.log(count);
        if (count !== cut){
            next();
        }
    });
}

M(arr);


/**********************************************
 *  如上这种 迭代器 的使用方式，可以使用在比较  *
 *  多的链式调用之中，比如：                   *
 *       validate form ->                     *
 *         validate token ->                  *
 *           check token expire ->            *
 *             login ->                       *
 *               redirect page ->             *
 *   其中有一个不成功，后续不进行               *
 **********************************************/