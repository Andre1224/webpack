!function(){"use strict";function e(e,n){for(var t=0;t<n.length;t++){var o=n[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}console.log("Hello JavaScript");var n=function(){function n(e){!function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,n),this.name=e}var t,o;return t=n,(o=[{key:"setName",value:function(e){this.name=e}}])&&e(t.prototype,o),n}();console.log(new n("peter"))}();