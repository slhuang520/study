/**
 * Created by Administrator on 2017/3/19.
 */
    $(function(){
        /*// $("div li").on({
        //     mouseenter: function() {
        //         $(this).text("Click me!");
        //     },
        //     click: function() {
        //         $(this).text("Why did you click me?");
        //     }
        // });
        //效果是一样的
        var div = $("div");
        div.on("mouseenter", "li", function() {
            $(this).text("Click me!");
        });
        div.on("click", "li", function() {
            $(this).text("Why did you click me?");
        });*/

        console.log($);
        var jq = $.noConflict();
        console.log(jq);
        console.log(jq("div"));
    });
