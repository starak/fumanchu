require.config({
	paths:{
		fumanchu : 	"../../../src/fumanchu",
		mustache : 	"../../external/mustache",
		text : 		"../../external/text",
		css : 		"../../../src/css",
        svg : 		"../../../src/svg",
		tmpl : 		"../../../src/template"
	},
	packages: [
		{ name : "menu", location : "modules/menu", main : "menu" },
		{ name : "content", location : "modules/content", main : "content" }
	]
});


require( [ "menu", "content", "fumanchu", "css!../css/common.css" ], function( menu, content, fumanchu ){



} );