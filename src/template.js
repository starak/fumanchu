/*!
 * Template Loader, a Require.js plugin to require fumanchu-template dependencies, by Ståle Raknes, 2012
 * Template loader uses text plugin https://github.com/requirejs/text
 * Available via the MIT or new BSD license.
 * More about fumanchu.js http://github.com/starak/fumanchu
 */

 /*

    Usage:

    require.config({
        paths: {
            fumanchu : "path/to/fumanchu",
            tmpl : "path/to/plugin"
        }
    });

   define(["tmpl!filename!templatename"],function(){...})

  */

define(function (){

    "use strict";

    return {

        version: '0.1',

        load: function( name, req, done, config ) {

            var arrName = name.split("!"),
                tName = arrName[0],
                rName = arrName[1];

            if(!rName){

                console.error("Error loading template! Missing template name.\n" +
                    "  Usage: define( [ 'tmpl!filename!templatename' ], function(){...} ");
                done();
                return;

            }

            req( [ "fumanchu", "text!" + tName ], function( fumanchu, template ) {

                // Do not bother with the work if it's a build
                if (config.isBuild) {
                    done();
                    return;
                }

                // Register the loaded template
                if(typeof rName === "string"){
                    fumanchu.register.template( rName, template.replace(/\{\{#([^\/\}]+)\/\}\}/,"{{#$1}}{{/$1}}") );
                }

                done(template);

            });

        }

    }

});