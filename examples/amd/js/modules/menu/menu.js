define( [ 'fumanchu', 'tmpl!./menu.html!menu', 'css!./menu.css' ],function( fumanchu ){

	var data = {

		items : [

			{ text : "Home",   cls : "home"  },
			{ text : "Item 2", cls : "item2" },
			{ text : "Item 3", cls : "item3" },
			{ text : "Item 4", cls : "item4" }

		]

	};

	var menu = fumanchu( "menu", data ).appendTo( "body" );

	menu.items.forEach(function(el){

		el.addEventListener("click", function(){

			console.log("%s was clicked ",el.getAttribute("data-id"),el);

		}, false );

	});

	return menu;

});