describe("new contact view", function(){
  beforeEach(function(){
    // this.collection = new app.ContactCollection();
    var store = {};
    spyOn(localStorage, 'getItem').and.callFake(function (key) {
      return store[key];
    });
    spyOn(window.localStorage, 'setItem').and.callFake(function (key, value) {
      return store[key] = value + '';
    });
    spyOn(window.localStorage, 'clear').and.callFake(function () {
      store = {};
    });
    spyOn(window.localStorage,'removeItem').and.callFake(function (key, value) {
      delete store.key;
    });
    loadFixtures("app.html");
    this.appView = new app.AppView();
  });
  it("should contain app view element to be defined",function(){
    expect(this.appView.$el.html()).toContain("Add New Contact");
  });
  it("should render form on clicking add new contact",function(){
    $(".new-contact").trigger("click");
    expect(this.appView.$el.html()).toContainElement('form');
  });
  it("should focus on name field on clicking new contact",function(){
    $(".new-contact").trigger("click");
    expect(this.appView.$el.find("input[name='name']")).toBeFocused();
  });
  it("should add new contact back again on clicking cancel",function(){
    $(".new-contact").trigger("click");
    $(".cancel").trigger("click");
    expect(this.appView.$el.html()).toContain("Add New Contact");
  });
  it("should save the contact clicking entering content and saving",function(){
    $(".new-contact").trigger("click");
    $("input[name='name']").val("Nisanth Chunduru");
    $("input[name='phone']").val("888888888");
    $("input[name='email']").val("nisanthch@gmail.com");
    $("textarea[name='address']").val("Vijaywada, Andhra Pradesh");
    $(".contact-form").trigger("submit");
    this.collection = app.contactCollection;
    expect(this.collection.pluck("name")).toContain("Nisanth Chunduru");
  });
  it("should show the saved contact",function(){
    $(".new-contact").trigger("click");
    $("input[name='name']").val("Nisanth Chunduru");
    $("input[name='phone']").val("888888888");
    $("input[name='email']").val("nisanthch@gmail.com");
    $("textarea[name='address']").val("Vijaywada, Andhra Pradesh");
    $(".contact-form").trigger("submit");
    this.collection = app.contactCollection;
    expect(this.appView.$el.html()).toContain("Nisanth");
  });
});
