/**
 * Created by Administrator on 2016/5/12.
 */
var IssueModel = BaseModel.extend({
    objectClass : "personServer/person"
});

var IssueCollection = BaseCollection.extend({
    model : IssueModel
});

var IssueItemView = Backbone.View.extend({
    tagName : "a",
    className : "list-group-item",
    _template : _.template($("#issue-item-temp").html()),
    attributes : {
        href : "#"
    },
    initialize : function(){
        //在 destroy 的同时，调用 remove 事件，这样会刷新页面
        this.listenTo(this.model, "destroy", this.remove);
        this.listenTo(this.model, "change", this.render);
    },
    events : {
        //添加删除事件
        "click .del-icon" : "doDel"
    },
    render : function(){
        var json = this.model.toJSON();
        //使用模板方法，模板中的表达式会自动调用 model 对象的属性
        this.$el.html(this._template(json));
        this.$el.attr("href", "#issue/" + json.id);
        var that = this;
        this.$el.hover(function(){
            //当鼠标移动到每一个 item 时，显示删除符号
            that.$el.css("position","relative");
            that.$el.append("<div class='del-icon'></div>");
            that.$el.find(".del-icon").hover(function(){
                $(this).css("opacity","1");
            },function(){
                $(this).css("opacity","0.5");
            });
        },function(){
            //当每一个 item 失去光标时，移除删除符号
            that.$el.find(".del-icon").remove();
        });
        return this;
    },
    doDel : function (e) {
        e.preventDefault();
        this.model.destroy();//这里同时也会影响到 collection
    }
});

var IssueCollectionView = BaseCollectionView.extend({
    subView : IssueItemView,
    initialize : function(){
        this._initialize();
    }
});


var IssueListView = BasePage.extend({
    el : '#issue-list',
    initialize : function(options){
        //this.issueCollection = new IssueCollection({
        //    params : options.param,
        //});
        this.issueCollection = new IssueCollection();
        this.issueCollectionView = new IssueCollectionView({
            collection : this.issueCollection,
            el : "#issue-list-item"
        });
        //this.issueCollection.url = "http://localhost:8080/BackboneServer/personServlet?method=list";
        this.issueCollection.fetch({ reset : true });
    }
});
var IssueEditView = BasePage.extend({
    el : '#issue-edit',

    initialize : function(options){
        this.router = options.router;
        this.collection = options.collection;
    },
    events : {
        "click #edit-btn-save" : "doSaveEdit"
    },

    show : function(model) {
        if (model) {
            this.model = model;
            this.render();
        }
        this.$el.show();
    },
     render : function(){
         var json = this.model.toJSON();
         this.$el.find("#title_edit").val(json.name);
         this.$el.find("#password_edit").val(json.password);
         if ("男" == json.sex) {
             this.$el.find("#boy_edit").attr("checked","checked");
         } else {
             this.$el.find("#girl_edit").attr("checked","checked");
         }
     },

    doSaveEdit : function(e){
        e.preventDefault();
        var pName = this.$el.find("#title_edit").val();
        var pPass = this.$el.find("#password_edit").val();
        var pSex = this.$el.find("input[name='sex']:checked").val();

        this.model.set({
            name : pName,
            password : pPass,
            sex : pSex
        });
        console.log("this.model.isNew()");
        console.log(this.model.isNew());
        console.log("this.model.isNew()");
        //var that = this;
        //this.collection.update(this.model);
        //this.model.save({
        //    name: pName,
        //    password: pPass,
        //    sex: pSex
        //},{
        //    patch : true
        //});
        var that = this;
        this.model.save(null, {
            onlyChanged : true
            //success : function(){
            //    that.collection.fetch({reset : true});//这里需要重新获取一次
            //}
        });
        this.router.navigate("" , {trigger : true});
    }
});
var IssueCreateView = BasePage.extend({
    el : '#issue-create',
    events : {
        "click #btn-save" : "doSave"
    },
    initialize : function(options){
        this.router = options.router;
        this.collection = options.collection;
        //this.collection.params = null;
    },
    doSave : function(e) {
        e.preventDefault();
        var pName = this.$el.find("#title").val();
        var pPass = this.$el.find("#password").val();
        var pSex = this.$el.find("input[type='radio']:checked").val();

        var newModel = new IssueModel({
            //id : "",//这里 Id 需要存在，就算为空
            name : pName,
            password : pPass,
            sex : pSex
            //method : 'add'
        });
        //this.collection.params = "?method=add";
        //var that = this;
        //var t = this.collection.create(newModel, {wait: true, success : function(model, resp){
        //    that.collection.fetch({reset : true});//这里需要重新获取一次
        //}});
        //this.collection.create(newModel, {wait: true,success: function(){
        //    that.router.navigate('', {trigger:true});
        //}});

        this.collection.create(newModel, {wait: true});
        //newModel.save(); //这样列表页面不会刷新当前数据
        this.router.navigate('', {trigger:true});
    }

});

var AppRouter = Backbone.Router.extend({

    initialize : function(){
        //this.issueListView = new IssueListView({
        //    param : "?method=list"
        //});
        this.issueListView = new IssueListView();
        this.issueEditView = new IssueEditView({
            router : this,
            collection : this.issueListView.issueCollection
        });
        this.issueCreateView = new IssueCreateView({
            router : this,
            collection : this.issueListView.issueCollection
        });
    },

    hiddenAllPage : function(){
        this.issueListView.hide();
        this.issueEditView.hide();
        this.issueCreateView.hide();
    },

    routes : {
        'issue' : 'issueCreate',
        'issue/:id' : 'issueEdit',
        '' : 'issueList'
    },

    issueEdit : function(id) {
        console.log(id);
        this.hiddenAllPage();
        var issue = this.issueListView.issueCollection.find(function(model){
            return model.id == id;
        });
        this.issueEditView.show(issue);
    },
    issueCreate : function(){
        this.hiddenAllPage();
        this.issueCreateView.show();
    },
    issueList : function() {
        this.hiddenAllPage();
        this.issueListView.show();
    }

});

var appRouter = new AppRouter();
Backbone.history.start();