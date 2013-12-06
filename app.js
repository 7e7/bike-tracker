var Bike = Backbone.Model.extend({})
var Bikes = Backbone.Collection.extend({ model:Bike })

var Router = Backbone.Router.extend({
    routes:{
        'bikes/:id':'getBike'
    }
})
var BikeListView = Backbone.View.extend({
    initialize: function(){
        this.render();
    },
    template: _.template(["<h1>Bikes</h1><ul class='bike_list'>",
          "<% items.each(function(item) { %>",
            "<%= itemTemplate(item) %>",
          "<% }); %>",
        "</ul>"
        ].join('')),
    itemTemplate:_.template("<li><a href='#<%= cid %>'><%= attributes.name %></a></li>"),
    render: function() {
        $(this.el).empty().append(this.template({
          items: App.bikes,
          itemTemplate: this.itemTemplate
        }));
    },
    el: $('.bikes'),
    events:{
        "click a":"showBike",
        
    },
    showBike:function(ev){
        ev.preventDefault();
        bv.render(ev.target.hash.substring(1));
    }
})
var BikeView = Backbone.View.extend({
    initialize:function(){},
    render:function(id){ $(this.el).empty().append( this.template({ bike: App.bikes.get(id) })) },
    template: _.template(['<h1><%= bike.attributes.name %></h1><dl>',
        '<dt>Make</dt><dd><%= bike.attributes.make %></dd>',
        '<dt>Model</dt><dd><%= bike.attributes.model %></dd>',
        '<dt>Year</dt><dd><%= bike.attributes.year %></dd>',
    '</dl>'].join('')),
    el:$('.bike')
}) 

App={
    bikes: new Bikes([
        {"name":"The Dale", "make":"Cannondale", "model": "CAAD10 Ultegra", "year":2014},
        {"name":"Rocket Ship", "make":"Trek", "model": "1.5", "year":2011},
        {"name":"Batmobile", "make":"Trek", "model": "7.2", "year":2012},
        {"name":"Cross", "make":"Focus", "model": "Mares AX 3.0", "year":2013}
    ]),
    init:function(){
        blv = new BikeListView({}), 
        bv=new BikeView({});
        
        var router = new Router;
        router.on('route:getBike',function(id){
            console.log('this route is looking for the bike with id '+id)
        })
        
        Backbone.history.start();
    }
};

App.init();