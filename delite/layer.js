define("liaison/delite/WidgetBindingTarget",["decor/Observable","delite/register","../ObservablePath","../BindingTarget","../DOMBindingTarget"],function(a,b,c,d){"use strict";function e(a){if(i[a])return i[a];var b=a.replace(/^[a-z]|-[a-zA-Z]/g,function(a){return a.charAt(a.length-1).toUpperCase()}),c=i[a]={p:"_"+a+"Attr",s:"_set"+b+"Attr",g:"_get"+b+"Attr"};return c}var f={},g=[],h=/^_(.*)$/,i={},j=function(){function b(a){(this.source||f).setValue&&this.source.setValue(a)}return function(){var e=g.slice.call(arguments);d.apply(this,e),this.targetProperty=(h.exec(e[1])||g)[1]||e[1],this.object.set||(this.object.set=a.prototype.set),this.hw=new c.Observer(this.object,this.targetProperty),"function"!=typeof this.hw.remove&&(this.hw.remove=this.hw.close),this.hw.open(b,this),this.object.own(this.hw)}}();j.prototype=Object.create(d.prototype),j.prototype.remove=j.prototype.close=function(){this.hw&&(this.hw.remove(),this.hw=null),d.prototype.remove.apply(this,arguments)},Object.defineProperty(j.prototype,"value",{get:function(){return this.object[this.targetProperty]},set:function(a){this.object.set(this.targetProperty,a),this.hw.deliver()},enumerable:!0,configurable:!0});var k=[];return"undefined"!=typeof Element&&k.push(HTMLScriptElement,HTMLInputElement,HTMLSelectElement,HTMLTextAreaElement,HTMLUnknownElement,HTMLElement),"undefined"!=typeof HTMLTemplateElement&&k.unshift(HTMLTemplateElement),k.forEach(function(a){var c=a.prototype.bind;a.prototype.bind=function(){function a(a){if(a){var b=e(a);return b.p in this||b.g in this||b.s in this||(this.owns||f)[a]}}function d(a){if("function"==typeof this.render){var b=h.exec(a),c=b?b[1]:a;if(this.alwaysUseWidgetAttribute||a in this)return a;for(var d in this)if(d.toLowerCase()===c.toLowerCase())return(b?"_":"")+d}}return function(e,f){b.upgrade(this),this.startup&&!this._started&&this.startup();var g=this.bindings&&this.bindings[e];if(!g){var h=d.call(this,e);g=a.call(this,h)&&new j(this,h)}return g&&g.bind(f)||c.call(this,e,f)}}()}),j}),define("liaison/delite/createRenderer",["decor/Observable","../DOMTreeBindingTarget"],function(a){"use strict";var b=[].forEach,c=function(c){function d(){return this.instanceData}return function(){this.set||(this.set=a.prototype.set);var e=this.ownerDocument.createElement("template");e.innerHTML=c,e.upgradeToTemplate(),e.createBindingSourceFactory=this.createBindingSourceFactory,Object.defineProperty(e,"instanceData",{get:d.bind(this)}),this.instanceData&&(e._instanceData=this.instanceData),this.appendChild(this.own(e.instantiate(this))[0].content),b.call(this.querySelectorAll("[data-attach-point]"),function(a){var b=a.getAttribute("data-attach-point");b&&(this[b]=a)},this)}};return c.load=function(a,b,d){b(["requirejs-text/text!"+a],function(a){d(c(a))})},c}),define("liaison/delite/templateBinderExtension",["delite/register","../features","../schedule","../templateBinder","../DOMTreeBindingTarget","./WidgetBindingTarget"],function(a,b,c,d){"use strict";function e(a){this.childNodes.forEach(function(a){for(var b,c=a.ownerDocument.createNodeIterator(a,NodeFilter.SHOW_ELEMENT,null,!1);b=c.nextNode();)"function"==typeof b.render&&b.destroy()}),a.apply(this,f.call(arguments,1))}var f=[].slice;if(!b("document-register")&&"undefined"!=typeof Node){var g=d.importNode;d.importNode=function(){var b=g.apply(this,arguments);return b.nodeType===Node.ELEMENT_NODE&&(a.upgrade(b),b.startup&&!b._started&&c(b.startup.bind(b))),b}}if(!b("polymer-createInstance")){var h=["undefined"!=typeof HTMLTemplateElement?HTMLTemplateElement:HTMLUnknownElement,HTMLScriptElement];"undefined"!=typeof Element&&h.push(Element),"undefined"!=typeof SVGElement&&h.push(SVGElement),h.forEach(function(a){var b=a.prototype.instantiate;a.prototype.instantiate=function(){var a=b.apply(this,arguments);return a.remove=e.bind(a,a.remove),a}})}return d}),define("liaison/delite/widgets/RadioButton",["dcl/dcl","decor/Observable","delite/register","./Widget"],function(a,b,c,d){function e(a,b,c){return a.addEventListener(b,c),{remove:a.removeEventListener.bind(a,b,c)}}var f=a(d,{baseClass:"d-l-radiobutton",current:"",render:function(){var a=this.value;this.type="radio",a!==this.value&&(this.value=a),this.own(e(this,"change",this.onChange.bind(this)))},checkedChanged:function(a){a&&b.prototype.set.call(this,"current",this.value)},valueChanged:function(a){this.checked&&b.prototype.set.call(this,"current",a)},currentChanged:function(a){b.prototype.set.call(this,"checked",this.value+""==a+"")},onChange:function(){this.checked&&b.prototype.set.call(this,"current",this.value)}});return c("d-l-radiobutton",[HTMLInputElement,f])}),define("liaison/delite/widgets/Widget",["dcl/dcl","decor/Observable","delite/Widget","../../computed","../../wrapper","../../ObservablePath","../../templateBinder","../templateBinderExtension"],function(a,b,c,d,e,f,g){var h="{{",i=/^(.+)Changed$/,j=a(c,{attribs:null,attachPointsAttribs:null,preventDispatchValuesAtInitialization:!1,preRender:a.before(function(){this.set||(this.set=b.prototype.set),this.own.apply(this,d.apply(this))}),postRender:a.after(function(){var a=[],b=[this],c=["function"==typeof this.attribs?this.attribs():this.attribs],d="function"==typeof this.attachPointsAttribs?this.attachPointsAttribs():this.attachPointsAttribs;for(var e in d)this[e]&&(b.push(this[e]),c.push(d[e]));b.forEach(function(b,d){var e=c[d];for(var f in e)(e[f]+"").indexOf(h)>=0?a.push(b,f,e[f],void 0):b.setAttribute(f,e[f])}),g.assignSources.call(this,this,a,this.createBindingSourceFactory),this.own.apply(this,g.bind(a));var j;for(var k in this)if((j=i.exec(k))&&"function"==typeof this[k]){var l=this.own(new f.Observer(this,j[1]))[0].open(this[k],this);this.preventDispatchValuesAtInitialization||this[k](l)}})});return j});
//# sourceMappingURL=layer.map
require.config({
	"packages": [
		{
			"name": "liaison/delite",
			"location": "liaison-build/delite"
		},
		{
			"name": "decor",
			"location": "decor-build"
		},
		{
			"name": "delite",
			"location": "delite-build"
		}
	]
});
define("liaison-build/delite/layer", ["decor-build/layer","delite-build/layer"], function(){});