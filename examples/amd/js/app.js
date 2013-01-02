require.config({
	paths:{
		fumanchu : 	"../../../src/fumanchu",
		mustache : 	"../../external/mustache",
		text : 		"../../external/text",
		css : 		"../../../src/css",
		tmpl : 		"../../../src/template"
	},
	packages: [
		{ name : "menu", location : "modules/menu", main : "menu" },
		{ name : "content", location : "modules/content", main : "content" }
	]
});


require( [ "menu", "content", "css!../css/common.css" ], function( menu, content ){

	// This example supports IE9+, thow fumanchu supports IE8+ (Standard mode)

} );