({
	paths:{
		fumanchu : "../../../src/fumanchu",
		mustache : "../../external/mustache",
		text : "../../external/text",
		css : "../../../src/css",
		tmpl : "../../../src/template",
	},
	packages: [
		{ name : "menu", location : "modules/menu", main : "menu" }
	],
	name : "app",
	out : "app-built.js"
})