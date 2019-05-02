/**
 * Created by Administrator on 2016/5/12.
 */
/*$(document).ajaxSend(function(e, XHR, options){
    XHR.setRequestHeader("Access-Control-Allow-Origin: http://localhost:8080/BackboneServer/");
    XHR.setRequestHeader("Access-Control-Allow-Methods: GET POST");
});*/
var BasePage = Backbone.View.extend({
    hide : function(){
        this.$el.hide();
    },
    show : function(){
        this.$el.show();
    }
});

var BaseModel = Backbone.Model.extend({

    // Model 中 ID 对应的 DB 中的 id 属性
    idAttribute : "id",
    //这是一个公用方法，以后的每个模块只需要覆盖这个 objectClass 属性就可以调用不同的后台模块
    objectClass : "",
    urlBase : function(){
        return "http://localhost:8080/BackboneServerWS/" + this.objectClass
    },

    toJSON : function (options) {
        console.log(this.changedAttributes());
        console.log(this.attributes);
        if (options && options.onlyChanged) {
            return this.changedAttributes();
        } else {
            return _.clone(this.attributes);
        }
    }
});

var BaseCollection = Backbone.Collection.extend({
    //params : '',
    //initialize : function(options){
    //    if (options) {
    //        this.params = options.params;
    //    }
    //},
    url : function(){
        //if (this.params) {
        //    return this.model.prototype.urlBase() + this.params;
        //} else {
            return  this.model.prototype.urlBase();
        //}
    }
});

var BaseCollectionView = Backbone.View.extend({
    //每一个 collection 中的子 item 对象
    subView : null,
    _initialize : function(){
        this.listenTo(this.collection, "reset", this.render);
        this.listenTo(this.collection, "add", this.addOne);
    },
    createSubview : function(model){
        var viewClass = this.subView || Backbone.View;
        var v = new viewClass({ model : model});
        this._views.push(v);
        return v;
    },
    addOne : function(model){
        console.log(model);
        console.log(1);
        this.$el.append(this.createSubview(model).render().$el);
    },
    render : function(){
        var that = this;
        _.each(this._views, function(subview){
            subview.remove().off();
        });
        this._views = [];
        if (!this.collection) {
            return this;
        }
        this.collection.each(function(model){
            that.addOne(model);
        });
    }
});