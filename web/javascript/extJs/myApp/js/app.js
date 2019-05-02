/**
 * Created by DreamCatcher on 2018/5/6.
 */
Ext.onReady(function () {
    /*Ext.create("Ext.Panel", {
        renderTo: "helloWorldPanel",
        height: 200,
        width: 600,
        title: "hello word",
        html: "First"
    });*/

    Ext.define('Person', {
        getName: function() {
            alert("my name");
        }
    });
    Ext.define('CanSing', {
        sing: function() {
            alert("I'm on the highway to hell...");
        }
    });

    Ext.define('Musician', {
        extend: 'Person',

        mixins: {
            a: 'CanSing'
        }
    });
    var m = Ext.create("Musician", {});
    //m.canSing();
    m.sing();
    console.log(m);
});
