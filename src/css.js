/*!
 * CSS Loader, a Require.js plugin to require css dependencies, by Ståle Raknes, 2012
 * Css loader uses text plugin https://github.com/requirejs/text
 * Available via the MIT or new BSD license.
 */

define(function (){

    "use strict";

    return {

        version: '0.1',

        load: function( name, req, onLoad ,config ) {

            req(['text!' + name], function(cssText) {

                // Do not bother with the work if a build and text will
                // not be inlined.
                if (config.isBuild) {
                    onLoad();
                    return;
                }

                var styleElem;

                styleElem = document.createElement('style');
                styleElem.type = 'text/css';

                if (styleElem.styleSheet){
                    styleElem.styleSheet.cssText = cssText;
                }else{
                    styleElem.appendChild( document.createTextNode( cssText ) );
                }

                document.getElementsByTagName("head")[0].appendChild( styleElem );

                onLoad(styleElem);

            });

        }

    }

});