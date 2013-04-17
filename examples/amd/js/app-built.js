/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */

/*!
 * Fumanchu, a Mustache extension by Ståle Raknes, 2012
 * http://github.com/starak/fumanchu
 */

/*!
 * Template Loader, a Require.js plugin to require fumanchu-template dependencies, by Ståle Raknes, 2012
 * Template loader uses text plugin https://github.com/requirejs/text
 * Available via the MIT or new BSD license.
 * More about fumanchu.js http://github.com/starak/fumanchu
 */

/**
 * @license RequireJS text 2.0.3 Copyright (c) 2010-2012, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/requirejs/text for details
 */

/*!
 * CSS Loader, a Require.js plugin to require css dependencies, by Ståle Raknes, 2012
 * Css loader uses text plugin https://github.com/requirejs/text
 * Available via the MIT or new BSD license.
 */

/*!
 * SVG Loader, a Require.js plugin to require .svg dependencies, by Ståle Raknes, 2012
 * SVG loader uses text plugin https://github.com/requirejs/text
 * Available via the MIT or new BSD license.
 * More about fumanchu.js http://github.com/starak/fumanchu
 */

(function(e,t){typeof exports=="object"&&exports?module.exports=t:typeof define=="function"&&define.amd?define("mustache",t):e.Mustache=t})(this,function(){function u(e,t){return RegExp.prototype.test.call(e,t)}function a(e){return!u(r,e)}function l(e){return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function h(e){return String(e).replace(/[&<>"'\/]/g,function(e){return c[e]})}function p(e){this.string=e,this.tail=e,this.pos=0}function d(e,t){this.view=e,this.parent=t,this.clearCache()}function v(){this.clearCache()}function m(e){var t=e[3],n=t,r;while((r=e[4])&&r.length)e=r[r.length-1],n=e[3];return[t,n]}function g(e){function n(e,n,r){if(!t[e]){var i=g(n);t[e]=function(e,t){return i(e,t,r)}}return t[e]}var t={};return function(t,r,i){var s="",o,u;for(var a=0,f=e.length;a<f;++a){o=e[a];switch(o[0]){case"#":u=i.slice.apply(i,m(o)),s+=t._section(o[1],r,u,n(a,o[4],i));break;case"^":s+=t._inverted(o[1],r,n(a,o[4],i));break;case">":s+=t._partial(o[1],r);break;case"&":s+=t._name(o[1],r);break;case"name":s+=t._escaped(o[1],r);break;case"text":s+=o[1]}}return s}}function y(e){var t=[],n=t,r=[],i,s;for(var o=0;o<e.length;++o){i=e[o];switch(i[0]){case"#":case"^":i[4]=[],r.push(i),n.push(i),n=i[4];break;case"/":if(r.length===0)throw new Error("Unopened section: "+i[1]);s=r.pop();if(s[1]!==i[1])throw new Error("Unclosed section: "+s[1]);r.length>0?n=r[r.length-1][4]:n=t;break;default:n.push(i)}}s=r.pop();if(s)throw new Error("Unclosed section: "+s[1]);return t}function b(e){var t,n,r=[];for(var i=0;i<e.length;++i)t=e[i],n&&n[0]==="text"&&t[0]==="text"?(n[1]+=t[1],n[3]=t[3]):(n=t,r.push(t));return r}function w(e){if(e.length!==2)throw new Error("Invalid tags: "+e.join(" "));return[new RegExp(l(e[0])+"\\s*"),new RegExp("\\s*"+l(e[1]))]}var e={};e.name="mustache.js",e.version="0.7.1",e.tags=["{{","}}"],e.Scanner=p,e.Context=d,e.Writer=v;var t=/\s*/,n=/\s+/,r=/\S/,i=/\s*=/,s=/\s*\}/,o=/#|\^|\/|>|\{|&|=|!/,f=Array.isArray||function(e){return Object.prototype.toString.call(e)==="[object Array]"},c={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;"};e.escape=h,p.prototype.eos=function(){return this.tail===""},p.prototype.scan=function(e){var t=this.tail.match(e);return t&&t.index===0?(this.tail=this.tail.substring(t[0].length),this.pos+=t[0].length,t[0]):""},p.prototype.scanUntil=function(e){var t,n=this.tail.search(e);switch(n){case-1:t=this.tail,this.pos+=this.tail.length,this.tail="";break;case 0:t="";break;default:t=this.tail.substring(0,n),this.tail=this.tail.substring(n),this.pos+=n}return t},d.make=function(e){return e instanceof d?e:new d(e)},d.prototype.clearCache=function(){this._cache={}},d.prototype.push=function(e){return new d(e,this)},d.prototype.lookup=function(e){var t=this._cache[e];if(!t){if(e===".")t=this.view;else{var n=this;while(n){if(e.indexOf(".")>0){var r=e.split("."),i=0;t=n.view;while(t&&i<r.length)t=t[r[i++]]}else t=n.view[e];if(t!=null)break;n=n.parent}}this._cache[e]=t}return typeof t=="function"&&(t=t.call(this.view)),t},v.prototype.clearCache=function(){this._cache={},this._partialCache={}},v.prototype.compile=function(t,n){var r=this._cache[t];if(!r){var i=e.parse(t,n);r=this._cache[t]=this.compileTokens(i,t)}return r},v.prototype.compilePartial=function(e,t,n){var r=this.compile(t,n);return this._partialCache[e]=r,r},v.prototype.compileTokens=function(e,t){var n=g(e),r=this;return function(e,i){if(i)if(typeof i=="function")r._loadPartial=i;else for(var s in i)r.compilePartial(s,i[s]);return n(r,d.make(e),t)}},v.prototype.render=function(e,t,n){return this.compile(e)(t,n)},v.prototype._section=function(e,t,n,r){var i=t.lookup(e);switch(typeof i){case"object":if(f(i)){var s="";for(var o=0,u=i.length;o<u;++o)s+=r(this,t.push(i[o]));return s}return i?r(this,t.push(i)):"";case"function":var a=this,l=function(e){return a.render(e,t)},c=i.call(t.view,n,l);return c!=null?c:"";default:if(i)return r(this,t)}return""},v.prototype._inverted=function(e,t,n){var r=t.lookup(e);return!r||f(r)&&r.length===0?n(this,t):""},v.prototype._partial=function(e,t){!(e in this._partialCache)&&this._loadPartial&&this.compilePartial(e,this._loadPartial(e));var n=this._partialCache[e];return n?n(t):""},v.prototype._name=function(e,t){var n=t.lookup(e);return typeof n=="function"&&(n=n.call(t.view)),n==null?"":String(n)},v.prototype._escaped=function(t,n){return e.escape(this._name(t,n))},e.parse=function(r,u){function g(){if(v&&!m)while(d.length)h.splice(d.pop(),1);else d=[];v=!1,m=!1}r=r||"",u=u||e.tags;var f=w(u),c=new p(r),h=[],d=[],v=!1,m=!1,E,S,x,T;while(!c.eos()){E=c.pos,x=c.scanUntil(f[0]);if(x)for(var N=0,C=x.length;N<C;++N)T=x.charAt(N),a(T)?d.push(h.length):m=!0,h.push(["text",T,E,E+1]),E+=1,T==="\n"&&g();E=c.pos;if(!c.scan(f[0]))break;v=!0,S=c.scan(o)||"name",c.scan(t);if(S==="=")x=c.scanUntil(i),c.scan(i),c.scanUntil(f[1]);else if(S==="{"){var k=new RegExp("\\s*"+l("}"+u[1]));x=c.scanUntil(k),c.scan(s),c.scanUntil(f[1]),S="&"}else x=c.scanUntil(f[1]);if(!c.scan(f[1]))throw new Error("Unclosed tag at "+c.pos);h.push([S,x,E,c.pos]);if(S==="name"||S==="{"||S==="&")m=!0;S==="="&&(u=x.split(n),f=w(u))}return h=b(h),y(h)};var E=new v;return e.clearCache=function(){return E.clearCache()},e.compile=function(e,t){return E.compile(e,t)},e.compilePartial=function(e,t,n){return E.compilePartial(e,t,n)},e.compileTokens=function(e,t){return E.compileTokens(e,t)},e.render=function(e,t,n){return E.render(e,t,n)},e.to_html=function(t,n,r,i){var s=e.render(t,n,r);if(typeof i!="function")return s;i(s)},e}()),function(e,t){if(typeof define=="function")define("fumanchu",["mustache"],t);else{if(typeof e.Mustache!="object"){var n=new Error("Fumanchu dependency error!");throw window.fumanchu=function(){throw n},n}e.fumanchu=t(e.Mustache)}}(this,function(e){function u(e,t){return document.querySelector(t||"body").appendChild(e),e}function a(e){var t=document.createDocumentFragment(),i=document.createElement("div"),s={};i.innerHTML=e;var o=i.querySelectorAll("["+r+"]"),a=o.length;for(var f=0;f<a;f++){var l=o[f],c=l.getAttribute(n),h=l.getAttribute(r);if(c==="array"){if(!s[h])s[h]=[];else if(typeof s[h].push!="function"){console.error("Error in fumanchu collection! Duplicate declaration: '"+h+"'.");continue}s[h].push(l)}else{if(!!s[h]){console.error("Error in fumanchu collection! Duplicate declaration: '"+h+"'.");continue}s[h]=l}l.removeAttribute(n),l.removeAttribute(r)}while(i.firstChild)t.appendChild(i.firstChild);t.collection=s;for(var p in s)s.hasOwnProperty(p)&&(t[p]=s[p]);return t.appendTo=function(e){return u(t,e)},t}function f(e){return e.replace(/\{\{#([^\/\}]+)\/\}\}/g,"{{#$1}}{{/$1}}")}function l(t,n,r){t=s[t]||f(t),r=r||{},n=n||{};var i,u;for(i in o)o.hasOwnProperty(i)&&(n[i]||(n[i]=o[i]));for(u in s)s.hasOwnProperty(u)&&(r[u]||(r[u]=s[u]));return a(e.render(t,n,r))}var t="0.1.0",n="data-collect-type",r="data-collect-as",i='script[type="text/fumanchu-template"]',s={},o={};return l.register={template:function(e,t){s[e]=f(t)},helper:function(e,t){o[e]=t},helpers:function(e){for(var t in e)e.hasOwnProperty(t)&&this.helper(t,e[t])}},l.init=function(e){e=e||i;var t=document.querySelectorAll(e)||[];for(var n=0;n<t.length;n++){var r=t[n];s[r.id]=f(r.innerHTML)}return s},l.version=t,l}),define("tmpl",[],function(){return{version:"0.1",load:function(e,t,n,r){var i=e.split("!"),s=i[0],o=i[1];if(!o){console.error("Error loading template! Missing template name.\n  Usage: define( [ 'tmpl!filename!templatename' ], function(){...} "),n();return}t(["fumanchu","text!"+s],function(e,t){if(r.isBuild){n();return}typeof o=="string"&&e.register.template(o,t.replace(/\{\{#([^\/\}]+)\/\}\}/,"{{#$1}}{{/$1}}")),n(t)})}}}),define("text",["module"],function(e){var t,n,r=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"],i=/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,s=/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,o=typeof location!="undefined"&&location.href,u=o&&location.protocol&&location.protocol.replace(/\:/,""),a=o&&location.hostname,f=o&&(location.port||undefined),l=[],c=e.config&&e.config()||{};t={version:"2.0.3",strip:function(e){if(e){e=e.replace(i,"");var t=e.match(s);t&&(e=t[1])}else e="";return e},jsEscape:function(e){return e.replace(/(['\\])/g,"\\$1").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r").replace(/[\u2028]/g,"\\u2028").replace(/[\u2029]/g,"\\u2029")},createXhr:c.createXhr||function(){var e,t,n;if(typeof XMLHttpRequest!="undefined")return new XMLHttpRequest;if(typeof ActiveXObject!="undefined")for(t=0;t<3;t+=1){n=r[t];try{e=new ActiveXObject(n)}catch(i){}if(e){r=[n];break}}return e},parseName:function(e){var t=!1,n=e.indexOf("."),r=e.substring(0,n),i=e.substring(n+1,e.length);return n=i.indexOf("!"),n!==-1&&(t=i.substring(n+1,i.length),t=t==="strip",i=i.substring(0,n)),{moduleName:r,ext:i,strip:t}},xdRegExp:/^((\w+)\:)?\/\/([^\/\\]+)/,useXhr:function(e,n,r,i){var s,o,u,a=t.xdRegExp.exec(e);return a?(s=a[2],o=a[3],o=o.split(":"),u=o[1],o=o[0],(!s||s===n)&&(!o||o.toLowerCase()===r.toLowerCase())&&(!u&&!o||u===i)):!0},finishLoad:function(e,n,r,i){r=n?t.strip(r):r,c.isBuild&&(l[e]=r),i(r)},load:function(e,n,r,i){if(i.isBuild&&!i.inlineText){r();return}c.isBuild=i.isBuild;var s=t.parseName(e),l=s.moduleName+"."+s.ext,h=n.toUrl(l),p=c.useXhr||t.useXhr;!o||p(h,u,a,f)?t.get(h,function(n){t.finishLoad(e,s.strip,n,r)},function(e){r.error&&r.error(e)}):n([l],function(e){t.finishLoad(s.moduleName+"."+s.ext,s.strip,e,r)})},write:function(e,n,r,i){if(l.hasOwnProperty(n)){var s=t.jsEscape(l[n]);r.asModule(e+"!"+n,"define(function () { return '"+s+"';});\n")}},writeFile:function(e,n,r,i,s){var o=t.parseName(n),u=o.moduleName+"."+o.ext,a=r.toUrl(o.moduleName+"."+o.ext)+".js";t.load(u,r,function(n){var r=function(e){return i(a,e)};r.asModule=function(e,t){return i.asModule(e,a,t)},t.write(e,u,r,s)},s)}};if(c.env==="node"||!c.env&&typeof process!="undefined"&&process.versions&&!!process.versions.node)n=require.nodeRequire("fs"),t.get=function(e,t){var r=n.readFileSync(e,"utf8");r.indexOf("﻿")===0&&(r=r.substring(1)),t(r)};else if(c.env==="xhr"||!c.env&&t.createXhr())t.get=function(e,n,r){var i=t.createXhr();i.open("GET",e,!0),c.onXhr&&c.onXhr(i,e),i.onreadystatechange=function(t){var s,o;i.readyState===4&&(s=i.status,s>399&&s<600?(o=new Error(e+" HTTP status: "+s),o.xhr=i,r(o)):n(i.responseText))},i.send(null)};else if(c.env==="rhino"||!c.env&&typeof Packages!="undefined"&&typeof java!="undefined")t.get=function(e,t){var n,r,i="utf-8",s=new java.io.File(e),o=java.lang.System.getProperty("line.separator"),u=new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(s),i)),a="";try{n=new java.lang.StringBuffer,r=u.readLine(),r&&r.length()&&r.charAt(0)===65279&&(r=r.substring(1)),n.append(r);while((r=u.readLine())!==null)n.append(o),n.append(r);a=String(n.toString())}finally{u.close()}t(a)};return t}),define("text!menu/menu.html",[],function(){return'<div class="menu">\n	<ul data-collect-as="ul">\n		{{#items}}\n			<li data-collect-as="items" data-collect-type="array" data-id="{{cls}}" class="{{cls}}">\n				<a href="#{{cls}}">{{#insertIcon}}{{icon}}{{/insertIcon}} {{text}}</a>\n			</li>\n		{{/items}}\n	</ul>\n</div>'}),define("css",[],function(){return{version:"0.1",load:function(e,t,n,r){t(["text!"+e],function(e){if(r.isBuild){n();return}var t;t=document.createElement("style"),t.type="text/css",t.styleSheet?t.styleSheet.cssText=e:t.appendChild(document.createTextNode(e)),document.getElementsByTagName("head")[0].appendChild(t),n(t)})}}}),define("text!menu/menu.css",[],function(){return".menu {\n	position: absolute;\n	bottom: 0;\n	left: 0;\n	width: 100%;\n	height: 50px;\n	text-align: center;\n	background-color: #222;\n}\n\n.menu ul {\n	list-style: none;\n	margin: 0;\n	padding: 0;\n}\n\n.menu ul li {\n	display: inline;\n	font-size: 12px;\n}\n\n.menu ul li a {\n	padding:5px;\n	color:#aaa;\n	text-decoration: none;\n    display: inline-block;\n    width:50px;\n\n}\n\n.menu ul li a svg {\n    width: 22px;\n    height: 22px;\n    fill: #aaa;\n    display: block;\n    margin: 0 auto 2px;\n}\n\n.menu ul li.current a{\n    color: #fff;\n}\n\n.menu ul li.current a svg{\n    fill: #fff;\n}"}),define("svg",[],function(){return{version:"0.1",load:function(e,t,n,r){var i=e.split("!"),s=i[0],o=i[1];t(["fumanchu","text!"+s],function(e,t){if(r.isBuild){n();return}var i=s.split("/"),u=o||i[i.length-1];e.register.template(u,t),n(t)})}}}),define("text!menu/gfx/home.svg",[],function(){return'<?xml version="1.0" encoding="utf-8"?> <!-- Generator: IcoMoon.io --> <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"> <svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><path d="M 512.00,295.222 L 256.00,96.509 L 0.00,295.223 L 0.00,214.204 L 256.00,15.491 L 512.00,214.205 ZM 448.00,288.00 L 448.00,480.00 L 320.00,480.00 L 320.00,352.00 L 192.00,352.00 L 192.00,480.00 L 64.00,480.00 L 64.00,288.00 L 256.00,144.00 Z" ></path></svg>'}),define("text!menu/gfx/heart.svg",[],function(){return'<?xml version="1.0" encoding="utf-8"?> <!-- Generator: IcoMoon.io --> <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"> <svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><path d="M 512.00,179.078 C 512.00,222.259 493.391,261.093 463.755,288.00 L 464.00,288.00 L 304.00,448.00 C 288.00,464.00 272.00,480.00 256.00,480.00 C 240.00,480.00 224.00,464.00 208.00,448.00 L 48.00,288.00 L 48.245,288.00 C 18.609,261.093 0.00,222.259 0.00,179.078 C 0.00,97.849 65.849,32.00 147.078,32.00 C 190.259,32.00 229.093,50.609 256.00,80.245 C 282.907,50.609 321.741,32.00 364.922,32.00 C 446.15,32.00 512.00,97.849 512.00,179.078 Z" ></path></svg>'}),define("text!menu/gfx/cog.svg",[],function(){return'<?xml version="1.0" encoding="utf-8"?> <!-- Generator: IcoMoon.io --> <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"> <svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><path d="M 466.895,305.125c-26.863-46.527-10.708-106.152, 36.076-133.244l-50.313-87.146c-14.375,8.427-31.088,13.259-48.923,13.259 c-53.768,0.00-97.354-43.873-97.354-97.995L 205.752-0.001 c 0.133,16.705-4.037,33.641-12.979,49.126 c-26.862,46.528-86.578,62.351-133.431,35.379L 9.03,171.65c 14.485,8.236, 27.025,20.294, 35.943,35.739 c 26.819,46.454, 10.756,105.96-35.854,133.112l 50.313,87.146c 14.325-8.348, 30.958-13.127, 48.70-13.127 c 53.598,0.00, 97.072,43.596, 97.35,97.479l 100.627,0.00 c-0.043-16.537, 4.136-33.285, 12.983-48.609 c 26.818-46.453, 86.388-62.297, 133.207-35.506l 50.313-87.145C 488.222,332.506, 475.766,320.49, 466.895,305.125z M 256.00,359.666 c-57.254,0.00-103.668-46.412-103.668-103.667c0.00-57.254, 46.413-103.667, 103.668-103.667c 57.254,0.00, 103.666,46.413, 103.666,103.667 C 359.665,313.254, 313.254,359.666, 256.00,359.666z" ></path></svg>'}),define("text!menu/gfx/html5.svg",[],function(){return'<?xml version="1.0" encoding="utf-8"?> <!-- Generator: IcoMoon.io --> <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"> <svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><path d="M 30.269,0.00l 41.072,460.815L 255.719,512.00l 184.862-51.262L 481.731,0.00L 30.269,0.00 z M 392.315,150.714l-0.195,0.00 L 176.045,150.714 l 5.151,57.875 L 387.18,208.589 l-15.521,173.505L 255.99,414.182l-0.115,0.039l-0.077,0.00 l-0.061,0.00 l-115.786-32.127l-7.915-88.756l 56.747,0.00 l 4.024,45.116 l 62.931,16.958l 0.139-0.039l 62.967-16.996l 6.535-73.275L 129.509,265.102 L 114.262,94.202l 283.107,0.00 L 392.315,150.714z" ></path></svg>'}),define("menu/menu",["fumanchu","tmpl!./menu.html!menu","css!./menu.css","svg!./gfx/home.svg!home_icon","svg!./gfx/heart.svg","svg!./gfx/cog.svg","svg!./gfx/html5.svg"],function(e){function t(){return function(e,t){return t("{{> "+t(e)+"}}")}}function i(){(r.ul.querySelector(".current")||r.ul).classList.remove("current");var e=r.ul.querySelector("."+location.hash.toString().replace(/#/g,""));e&&e.classList.add("current")}e.register.helper("insertIcon",t);var n={items:[{text:"Home",cls:"home",icon:"home_icon"},{text:"Item 2",cls:"item2",icon:"heart.svg"},{text:"Item 3",cls:"item3",icon:"cog.svg"},{text:"Item 4",cls:"item4",icon:"html5.svg"}]},r=e("menu",n).appendTo("body");return r.items.forEach(function(e){e.addEventListener("click",function(){console.log("%s was clicked ",e.getAttribute("data-id"))},!1)}),window.addEventListener("hashchange",i,!1),i(),window.fumanchu=e,r}),define("menu",["menu/menu"],function(e){return e}),define("text!content/content.html",[],function(){return'{{#views}}\n	<div id="{{id}}" class="view">\n		<h1>{{title}}</h1>\n		{{{content}}}\n	</div>\n{{/views}}'}),define("text!content/content.css",[],function(){return"div.view {\n	position: absolute;\n	top:0;\n	left:0;\n	right:0;\n	bottom:50px;\n	overflow: auto;\n	box-sizing: border-box;\n	padding:20px;\n	display:none;\n	font-size: 12px;\n	line-height: 1.5;\n    max-width: 100%;\n}\n\ndiv.view h1 {\n	margin:0 0 .5em;\n	font-weight: normal;\n}\n\ndiv.view p {\n	margin:0 0 1em;\n}\n\ndiv:target {\n	display: block;\n}"}),define("content/content",["fumanchu","tmpl!./content.html!content","css!./content.css"],function(e){var t={views:[{id:"home",title:"Home",content:"<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p><p>Ut enim ad minim veniam,  quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p><p> Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p><p> Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>"},{id:"item2",title:"Item 2",content:"<p>Ut enim ad minim veniam,  quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p><p> Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p><p> Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>"},{id:"item3",title:"Item 3",content:"<p> Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p><p> Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p><p>Ut enim ad minim veniam,  quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>"},{id:"item4",title:"Item 4",content:"<p> Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p><p>Ut enim ad minim veniam,  quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p><p> Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>"}]},n=e("content",t).appendTo("body");return location.hash="",location.hash=t.views[0].id,n}),define("content",["content/content"],function(e){return e}),define("text!../css/common.css",[],function(){return"body{\n	background-color: #333;\n	color:#fff;\n	font: 100% Helvetica, Arial, sans-serif;\n}\n"}),require.config({paths:{fumanchu:"../../../src/fumanchu",mustache:"../../external/mustache",text:"../../external/text",css:"../../../src/css",svg:"../../../src/svg",tmpl:"../../../src/template"},packages:[{name:"menu",location:"modules/menu",main:"menu"},{name:"content",location:"modules/content",main:"content"}]}),require(["menu","content","fumanchu","css!../css/common.css"],function(e,t,n){}),define("app",function(){});