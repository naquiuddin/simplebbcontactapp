// $(document).ready(function(){
  var app = {};
 app.Contact = Backbone.Model.extend({});
 app.ContactCollection = Backbone.Collection.extend({
    model: app.Contact,
    localStorage: new Store("backbone-contacts")
  });
 app.contactCollection = new app.ContactCollection
 app.ContactView = Backbone.View.extend({
    tag: "div",
    className: "col-md-3 contact",
    template: _.template($("#contact").html()),
    templateForm: _.template($("#contact-form").html()),
    events: {
      "click .edit": "renderEdit",
      "submit form": "updateContact",
      "click .delete": "removeContact",
      "click .cancel" : "render"
    },
    initialize: function(){
    },
    render: function(){
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },
    renderEdit: function(e){
      e.preventDefault();
      this.$el.html(this.templateForm(this.model.toJSON()));
      return this;
    },
    updateContact: function(e){
      e.preventDefault();
      var model = {};
      model.name = $('[name="name"]').val();
      model.phone = $('[name="phone"]').val();
      model.email = $('[name="email"]').val();
      model.address = $('[name="address"]').val();
      this.model.save(model);
      this.render();
    },
    removeContact: function(e){
      e.preventDefault();
      this.model.destroy();
      this.remove();
    }

  })
 app.NewContact = Backbone.View.extend({
   tag: "div",
   className: "col-md-3 contact",
   template: _.template($("#new-contact").html()),
   templateForm: _.template($("#contact-form").html()),
   events: {
     "submit form": "saveContact",
     "click a": "renderForm",
     "click .cancel" : "render"
   },
   saveContact: function(e){
     e.preventDefault();
     var model = {};
     model.name = $('[name="name"]').val();
     model.phone = $('[name="phone"]').val();
     model.email = $('[name="email"]').val();
     model.address = $('[name="address"]').val();
     e.target.reset();
     this.save(model);
    //  return this;
  },
  save: function(model) {
    app.contactCollection.create(model);
  },
   renderForm: function(){
     this.$el.html(this.templateForm());
     this.$el.find("input[name='name']").focus();
   },
   render: function(){
     this.$el.html(this.template());
     return this;
   }
 });
 app.AppView =  Backbone.View.extend({
     el: ".app",
     tagName: "div",
     initialize: function() {
      var self = this;
      app.contactCollection.on("add",this.addOne,this);
      app.contactCollection.on("reset",this.render, this);
      app.contactCollection.fetch({
        success : function(){
          self.render();
        }
      });
    },
    newContact: function(){
      newContactView = new app.NewContact();
      this.$el.append(newContactView.render().el);
    },
    addOne: function(contactModel){
      var contactView = new app.ContactView({model:contactModel});
      this.$el.append(contactView.render().el);
    },
    render: function(){
      this.$el.html("");
      this.newContact()
      app.contactCollection.each(this.addOne,this);
    }
  });
 appa = new app.AppView();
// });
