Fumanchu
========

###NB! WORK IN PROGRESS!

Fumanchu.js is a [Mustache.js](/janl/mustache.js/) extension. It behaves like Mustache.js, but does a lot more.

It can… 

* [register templates](#register)
* [register helpers](#register)
* use registered templates as [mixins/partials](#mixin)
* [collect elements](#collection) directly by setting attributes in the template



##fumanchu( template [, data, partials] )

####fumanchu( template )
**template** A string containing a template

	fumanchu("<h1>Hello World!</h1>");
	
Will return a document fragment with containing the h1 element, _not_ as a string

####OR


####fumanchu( templateId )

**templateId** A string containing a template ID for a [registered template](#register)

	fumanchu("myTemplate");
	
####OR even

####fumanchu( template, data, partials )

**template** A string containing a template OR a template ID 

**data** A plain object containing data to pair with the template

**partials** An object containing templates or just strings to mixin

	var data = { title : "Hello World!", text : "Foo bar baz"};
	
	fumanchu("<h1>{{title}}</h1><p>{{text}}</p>",);
	
This will result in:

	<h1>Hello World!</h1>
	<p>Foo bar baz</p>

####return document fragmant

fumanchu will return a document fragment containing a method, [`appendTo( selector )`](#appendTo), and [collected elements](#collection), 



##fumanchu.register (namespace)

####fumanchu.register.template( id, template )

**name** A string containing the template id

**template** A string containing the Mustache template

	fumanchu.register.template( "title", "<h1>{{title}}</h1>" );
	
	fumanchu( "title", { title : "Hello World!" } );
	
**NOTE:** It's also possible to write templates inline in the HTML document, and then have fumanchu to pick them up with fumanchu.init()

####fumanchu.register.helper( id, function )

**name** A string containing the helper id

**function** The helper function

	fumanchu.register.helper( "foo", function(){ … } );

####fumanchu.register.helpers( helpersObj )

**helpersObj** An object containing keys (helperId) and functions (helper)


	fumanchu.register.helpers({ foo : function(){ … }, bar : function(){ … } });



<a id="init"></a>
##init( )

####fumanchu.init( [selector] )

**selector** Optional. A string containing a selector expression. Defaults to `'script[type="text/fumanchu-template"]'`

Fumanchu will use the selector to search the DOM for templates, and register them automaticly.

HTML:

	<script id=	"myTemplate" type="text/fumanchu-template">
		<h1>{{title}}</h1>
	</script>

Javascript:

	fumanchu.init(); // pickup templates
	
	fumanchu( "myTemplate", { title : "Hello World!" } ).appendTo( "body" );

**NOTE:** The document has to be loaded / ready before using `.init()`


<a id="collection"></a>
##Collecting elements

Collecting elements is very handy, and can be done directly from the template like this:

HTML:

	...
	<script id="myTemplate" type="text/fumanchu-template">
		<h1 data-collect-as="title">{{title}}</h1>
		<ul>
			{{#list}}
				<li data-collect-as="list" data-collect-type="array">{{.}}</li>
			{{/list}}
		</ul>
	</script>
	...
	
Script:

	var data = {
		title : "Hello World!",
		list : ["foo","bar","baz"]
	}
	
	fumanchu.init(); // pickup inline templates
	
	var result = fumanchu( "myTemplate", data ).appendTo( "body" );
	
	console.log(result.title) // Contains the h1 element
	console.log(list) // Contains a list of li elements 
	

**NOTE:** data-collect* attributes will be removed from the rendered html.


<a id="appendTo"></a>
##appendTo( )

####fumanchu( … ).appendTo( selector )

**selector** A string containing a CSS selector

Will append the elements in the returned document fragment to the first element matched by the selector.

	fumanchu( "<h1>{{title}}</h1>", { title : "Hello World!" } ).appendTo( "body" );
	
####return empty document fragment
This method will return an empty document fragment, still containing the [collected elements](#collection).

<a name="mixin"></a>
## Mixin / Partials

By registering several templates you can insert one template in another.

	var data = { title : "Hello World!", text : "Foo bar baz"};

	fumanchu.register.template( "title", "<h1>{{title}}</h1>" )
	
	fumanchu("{{> title}}<p>{{text}}</p>",data);
	
This will result in:

	<h1>Hello World!</h1>
	<p>Foo bar baz</p>
