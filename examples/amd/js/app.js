require.config({
	paths:{
		fumanchu : "../../../src/fumanchu",
		mustache : "../../external/mustache",
		text : "../../external/text",
		css : "../../../src/css",
		tmpl : "../../../src/template",
	},
	packages: [
		{ name : "menu", location : "modules/menu", main : "menu" }
	]
});


require([ "menu", "css!../css/common.css" ],function(menu){

	

});