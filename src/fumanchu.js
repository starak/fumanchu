
/*!
 * Fumanchu 0.0.6, a Mustache extension by Ståle Raknes, 2012
 * http://github.com/starak/fumanchu
 */

(function ( root, factory ) {

    if (typeof define === "function") {

        // Mustashe.js must be in the paths or in the root of baseUrl
        define( ["mustache"], factory ); // AMD

    } else if( typeof root.Mustache === "object" ) {

        root.fumanchu = factory( root.Mustache ); // <script>

    } else{

        var error =  new Error("Fumanchu dependency error!");
        window.fumanchu = function(){ throw error; };
        throw error;

    }

}( this, function( Mustache ){

    "use strict";

    // Settings
    var collectTypeAttribute = "data-collect-type",
        collectAsAttribute = "data-collect-as",
        defaultTemplateSelector = 'script[type="text/fumanchu-template"]',

    // Containers
        templates = {},
        helpers = {};

    /**
     * A shortcut to append html to DOM.
     * 
     *      fumanchu( "templatename", data ).appendTo( ".mySelector" );
     *
     * @method appendTo
     * @return the empty document fragment (still containing collected elements)
     */
    function appendTo( fragment, query ){

        document.querySelector( query || "body").appendChild( fragment );

        return fragment;

    }

    /**
     * We want mustache to return html elements and not a String
     * To do this, we need to have one single root element to return,
     * witch we do with a document fragment.
     *
     * Document fragment does not support innerHTML, so this is a workaround
     *
     * @method parseStr
     * @private
     * @param {String} html  HtmlString
     * @return DocumentFragment
     */
    function parseStr( html ) {

        var fragment = document.createDocumentFragment(),
            div = document.createElement( 'div' ),
            collection = {};

        // Convert html string to elements
        div.innerHTML = html;

        // Get elements to collect
        var returnElements = div.querySelectorAll( "[" + collectAsAttribute + "]" );

        // Collect elements to return
        var length = returnElements.length;
        for( var i = 0; i < length; i++ ){

            var rel = returnElements[ i ];

            var type = rel.getAttribute( collectTypeAttribute );
            var name = rel.getAttribute( collectAsAttribute );

            if( type === "array" ){

                if( !collection[ name ] ){

                    collection[ name ] = [];

                }else{

                    if( typeof collection[ name ].push !== "function" ){

                        // Already declared as an element
                        console.error( "Error in fumanchu collection! Duplicate declaration: '" + name + "'." );

                        continue;
                    }

                }

                collection[ name ].push( rel );

            }else if( !collection[ name ] ){

                collection[ name ] = rel;

            }else{

                // Already declared
                console.error( "Error in fumanchu collection! Duplicate declaration: '" + name + "'." );
                continue;

            }

            rel.removeAttribute( collectTypeAttribute );
            rel.removeAttribute( collectAsAttribute );

        }

        // Move elements to document fragment
        while ( div.firstChild ) {

            fragment.appendChild( div.firstChild );

        }

        // Fetch collection to document fragment
        fragment.collection = collection; // DEPRECATED

        // Fetch collection to document fragment (NEW)
        for( var el in collection ){

            if( collection.hasOwnProperty( el ) ){

                fragment[el] = collection[ el ];

            }

        }

        // Add method
        fragment.appendTo = function( query ){

            return appendTo( fragment, query );

        };

        return fragment;

    }

    /**
     * Use template by name, if any, or using the string as template
     * Converts the string returned from mustache to a DocumentFragment
     *
     * @method fumanchu
     *
     * @param {String} template     Template id or template string
     * @param {Object} objVar       Data object
     * @param {Object} [partials]   Partials/templates
     *
     * @return DocumentFragment
     **/
    function fumanchu( template, data, partials ) {

        // Check whether or not 'template' is an existing template name
        template = templates[ template ] || template;
        partials = partials || {};

        var h,t;

        // Add helpers to objVar (if the key does not exist in objVar already)
        for( h in helpers ){

            if(helpers.hasOwnProperty(h)){

                if(!data[h]){

                    data[h] = helpers[h];

                }

            }

        }

        

        // Add registrated templates to partials
        for( t in templates ){

            if(templates.hasOwnProperty(t)){

                if(!partials[t]){ // Do not override existing partiale

                    partials[t] = templates[t];

                }

            }

        }

        // return parsed html from mustache result
        return parseStr( Mustache.render( template, data, partials ) );

    }

    // @namespace
    fumanchu.register = {

        /**
         * Register templates with this method
         *
         * @method template
         * @param name      String Template name/id
         * @param template  String The template itself
         */
        template : function( name, template ){

            // Fix not-mustache-supported self-closing sections
            templates[name] = template.replace(/\{\{#([^\/\}]+)\/\}\}/g,"{{#$1}}{{/$1}}");

        },

        /**
         * Register helpers with this method
         *
         * @method helper
         * @param name  String helper name/id
         * @param fn    Function The helper
         */
        helper : function( name, fn){

            helpers[name] = fn;

        },

        /**
         * Register helpers with this method
         *
         * @method helpers
         * @param obj  Object - Containing helper(s)
         */
        helpers : function( obj ){

            for( var i in obj ){

                if( obj.hasOwnProperty( i ) ){

                    this.helper( i, obj[ i ] );

                }

            }

        }
    };

    /**
     *  Used to pickup and register templates from the document
     *  with given query selector
     *
     * @method
     *
     * @param [query]         String  Defaults to .mTemplate
     * @return Array with templates
     */
    fumanchu.init = function( query ){

        query = query || defaultTemplateSelector;
        var mTemplates = document.querySelectorAll( query ) || [];

        for ( var i = 0; i < mTemplates.length; i++ ){
            var t = mTemplates[ i ];

            // Get the template and fix not-mustache-supported self-closing sections
            templates[ t.id ] = t.innerHTML.replace( /\{\{#([^\/\}]+)\/\}\}/g, "{{#$1}}{{/$1}}" );
        }

        return templates;

    };

    // Expose
    fumanchu.version = "0.0.6";

    return fumanchu;

}));