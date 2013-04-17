define( [ 'fumanchu', 'tmpl!./menu.html!menu', 'css!./menu.css',

    'svg!./gfx/home.svg!home_icon', // this one i give a name, for the demo
    'svg!./gfx/heart.svg',
    'svg!./gfx/cog.svg',
    'svg!./gfx/html5.svg'

],function( fumanchu ){

	"use strict";

    function insertIcon(){
        return function(data, render){
            return render("{{> " + render(data) + "}}");
        }
    }

    fumanchu.register.helper("insertIcon",insertIcon);

	var data = {

		items : [

			{ text : "Home",   cls : "home", icon : "home_icon" }, // <-- with the given name
			{ text : "Item 2", cls : "item2", icon : "heart.svg" },
			{ text : "Item 3", cls : "item3", icon : "cog.svg" },
			{ text : "Item 4", cls : "item4", icon : "html5.svg" }

		]

	};

	var menu = fumanchu( "menu", data ).appendTo( "body" );

	menu.items.forEach(function(el){

		el.addEventListener("click", function(){

			console.log( "%s was clicked ", el.getAttribute( "data-id" ) );

		}, false );

	});

    function setCurrent(){

        (menu.ul.querySelector(".current") || menu.ul).classList.remove("current");
        var el = menu.ul.querySelector( "." + location.hash.toString().replace(/#/g,"") );
        el && el.classList.add( "current" );

    }

    window.addEventListener("hashchange",setCurrent,false);

    setCurrent();

    window.fumanchu = fumanchu;

	return menu;

});