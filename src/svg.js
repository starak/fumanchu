/*!
 * SVG Loader, a Require.js plugin to require .svg dependencies, by Ståle Raknes, 2013
 * SVG loader uses text plugin https://github.com/requirejs/text
 * Available via the MIT or new BSD license.
 * More about fumanchu.js http://github.com/starak/fumanchu
 */

/*

 Usage:

 require.config({
     paths: {
         mustache : "path/to/mustache",
         fumanchu : "path/to/fumanchu",
         text :     "path/to/plugin",
         svg :      "path/to/plugin"
     }
 });

 define(["svg!./path/to/svgfile[!templatename]"],function(fumanchu){...});

 'templatename' is optional, defaults to filename

 exapmle:

 define(["svg!./gfx/myIcon.svg!my_icon]"],function(fumanchu){
    fumanchu("Here is my icon : {{> my_icon}}")
 });

    OR

 define(["svg!./gfx/myIcon.svg]"],function(fumanchu){
    fumanchu("Here is my icon : {{> myIcon.svg}}")
 });

 */

define(function (){

    "use strict";

    return {

        version: '0.1',

        load: function( name, req, done, config ) {

            var arrName = name.split("!"),
                fullPath = arrName[0],
                customName = arrName[1];

            req( [ "fumanchu", "text!" + fullPath ], function( fumanchu, svg ) {

                // Do not bother with the work if it's a build
                if ( config.isBuild ) { done(); return; }

                var fileName = fullPath.split("/");

                var templateName = customName || fileName[ fileName.length - 1 ];

                // Register the loaded svg
                fumanchu.register.template( templateName, svg );

                done( svg );

            });

        }

    }

});