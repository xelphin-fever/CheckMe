(()=>{var e={448:e=>{window,e.exports=function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);var o=[],r=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],a=["January","February","March","April","May","June","July","August","September","October","November","December"],i={t:"top",r:"right",b:"bottom",l:"left",c:"centered"};function l(){}var c=["click","focusin","keydown","input"];function s(e){c.forEach((function(t){e.addEventListener(t,e===document?C:j)}))}function d(e){return Array.isArray(e)?e.map(d):"[object Object]"===k(e)?Object.keys(e).reduce((function(t,n){return t[n]=d(e[n]),t}),{}):e}function u(e,t){var n=e.calendar.querySelector(".qs-overlay"),o=n&&!n.classList.contains("qs-hidden");t=t||new Date(e.currentYear,e.currentMonth),e.calendar.innerHTML=[m(t,e,o),h(t,e,o),f(e,o)].join(""),o&&window.requestAnimationFrame((function(){E(!0,e)}))}function m(e,t,n){return['<div class="qs-controls'+(n?" qs-blur":"")+'">','<div class="qs-arrow qs-left"></div>','<div class="qs-month-year">','<span class="qs-month">'+t.months[e.getMonth()]+"</span>",'<span class="qs-year">'+e.getFullYear()+"</span>","</div>",'<div class="qs-arrow qs-right"></div>',"</div>"].join("")}function h(e,t,n){var o=t.currentMonth,r=t.currentYear,a=t.dateSelected,i=t.maxDate,l=t.minDate,c=t.showAllDates,s=t.days,d=t.disabledDates,u=t.startDay,m=t.weekendIndices,h=t.events,f=t.getRange?t.getRange():{},v=+f.start,p=+f.end,y=q(new Date(e).setDate(1)),b=y.getDay()-u,g=b<0?7:0;y.setMonth(y.getMonth()+1),y.setDate(0);var w=y.getDate(),D=[],S=g+7*((b+w)/7|0);S+=(b+w)%7?7:0;for(var E=1;E<=S;E++){var x=(E-1)%7,k=s[x],M=E-(b>=0?b:7+b),C=new Date(r,o,M),j=h[+C],L=M<1||M>w,P=L?M<1?-1:1:0,A=L&&!c,Y=A?"":C.getDate(),N=+C==+a,O=x===m[0]||x===m[1],T=v!==p,F="qs-square "+k;j&&!A&&(F+=" qs-event"),L&&(F+=" qs-outside-current-month"),!c&&L||(F+=" qs-num"),N&&(F+=" qs-active"),(d[+C]||t.disabler(C)||O&&t.noWeekends||l&&+C<+l||i&&+C>+i)&&!A&&(F+=" qs-disabled"),+q(new Date)==+C&&(F+=" qs-current"),+C===v&&p&&T&&(F+=" qs-range-start"),+C>v&&+C<p&&(F+=" qs-range-middle"),+C===p&&v&&T&&(F+=" qs-range-end"),A&&(F+=" qs-empty",Y=""),D.push('<div class="'+F+'" data-direction="'+P+'">'+Y+"</div>")}var I=s.map((function(e){return'<div class="qs-square qs-day">'+e+"</div>"})).concat(D);return I.unshift('<div class="qs-squares'+(n?" qs-blur":"")+'">'),I.push("</div>"),I.join("")}function f(e,t){var n=e.overlayPlaceholder,o=e.overlayButton;return['<div class="qs-overlay'+(t?"":" qs-hidden")+'">',"<div>",'<input class="qs-overlay-year" placeholder="'+n+'" inputmode="numeric" />','<div class="qs-close">&#10005;</div>',"</div>",'<div class="qs-overlay-month-container">'+e.overlayMonths.map((function(e,t){return'<div class="qs-overlay-month" data-month-num="'+t+'">'+e+"</div>"})).join("")+"</div>",'<div class="qs-submit qs-disabled">'+o+"</div>","</div>"].join("")}function v(e,t,n){var o=t.el,r=t.calendar.querySelector(".qs-active"),a=e.textContent,i=t.sibling;(o.disabled||o.readOnly)&&t.respectDisabledReadOnly||(t.dateSelected=n?void 0:new Date(t.currentYear,t.currentMonth,a),r&&r.classList.remove("qs-active"),n||e.classList.add("qs-active"),y(o,t,n),n||D(t),i&&(p({instance:t,deselect:n}),t.first&&!i.dateSelected&&(i.currentYear=t.currentYear,i.currentMonth=t.currentMonth,i.currentMonthName=t.currentMonthName),u(t),u(i)),t.onSelect(t,n?void 0:new Date(t.dateSelected)))}function p(e){var t=e.instance.first?e.instance:e.instance.sibling,n=t.sibling;t===e.instance?e.deselect?(t.minDate=t.originalMinDate,n.minDate=n.originalMinDate):n.minDate=t.dateSelected:e.deselect?(n.maxDate=n.originalMaxDate,t.maxDate=t.originalMaxDate):t.maxDate=n.dateSelected}function y(e,t,n){if(!t.nonInput)return n?e.value="":t.formatter!==l?t.formatter(e,t.dateSelected,t):void(e.value=t.dateSelected.toDateString())}function b(e,t,n,o){n||o?(n&&(t.currentYear=+n),o&&(t.currentMonth=+o)):(t.currentMonth+=e.contains("qs-right")?1:-1,12===t.currentMonth?(t.currentMonth=0,t.currentYear++):-1===t.currentMonth&&(t.currentMonth=11,t.currentYear--)),t.currentMonthName=t.months[t.currentMonth],u(t),t.onMonthChange(t)}function g(e){if(!e.noPosition){var t=e.position.top,n=e.position.right;if(e.position.centered)return e.calendarContainer.classList.add("qs-centered");var o=e.positionedEl.getBoundingClientRect(),r=e.el.getBoundingClientRect(),a=e.calendarContainer.getBoundingClientRect(),i=r.top-o.top+(t?-1*a.height:r.height)+"px",l=r.left-o.left+(n?r.width-a.width:0)+"px";e.calendarContainer.style.setProperty("top",i),e.calendarContainer.style.setProperty("left",l)}}function w(e){return"[object Date]"===k(e)&&"Invalid Date"!==e.toString()}function q(e){if(w(e)||"number"==typeof e&&!isNaN(e)){var t=new Date(+e);return new Date(t.getFullYear(),t.getMonth(),t.getDate())}}function D(e){e.disabled||!e.calendarContainer.classList.contains("qs-hidden")&&!e.alwaysShow&&("overlay"!==e.defaultView&&E(!0,e),e.calendarContainer.classList.add("qs-hidden"),e.onHide(e))}function S(e){e.disabled||(e.calendarContainer.classList.remove("qs-hidden"),"overlay"===e.defaultView&&E(!1,e),g(e),e.onShow(e))}function E(e,t){var n=t.calendar,o=n.querySelector(".qs-overlay"),r=o.querySelector(".qs-overlay-year"),a=n.querySelector(".qs-controls"),i=n.querySelector(".qs-squares");e?(o.classList.add("qs-hidden"),a.classList.remove("qs-blur"),i.classList.remove("qs-blur"),r.value=""):(o.classList.remove("qs-hidden"),a.classList.add("qs-blur"),i.classList.add("qs-blur"),r.focus())}function x(e,t,n,o){var r=isNaN(+(new Date).setFullYear(t.value||void 0)),a=r?null:t.value;13===e.which||13===e.keyCode||"click"===e.type?o?b(null,n,a,o):r||t.classList.contains("qs-disabled")||b(null,n,a):n.calendar.contains(t)&&n.calendar.querySelector(".qs-submit").classList[r?"add":"remove"]("qs-disabled")}function k(e){return{}.toString.call(e)}function M(e){o.forEach((function(t){t!==e&&D(t)}))}function C(e){if(!e.__qs_shadow_dom){var t=e.which||e.keyCode,n=e.type,r=e.target,i=r.classList,l=o.filter((function(e){return e.calendar.contains(r)||e.el===r}))[0],c=l&&l.calendar.contains(r);if(!(l&&l.isMobile&&l.disableMobile))if("click"===n){if(!l)return o.forEach(D);if(l.disabled)return;var s=l.calendar,d=l.calendarContainer,m=l.disableYearOverlay,h=l.nonInput,f=s.querySelector(".qs-overlay-year"),p=!!s.querySelector(".qs-hidden"),y=s.querySelector(".qs-month-year").contains(r),g=r.dataset.monthNum;if(l.noPosition&&!c)(d.classList.contains("qs-hidden")?S:D)(l);else if(i.contains("qs-arrow"))b(i,l);else if(y||i.contains("qs-close"))m||E(!p,l);else if(g)x(e,f,l,g);else{if(i.contains("qs-disabled"))return;if(i.contains("qs-num")){var w=r.textContent,q=+r.dataset.direction,k=new Date(l.currentYear,l.currentMonth+q,w);if(q){l.currentYear=k.getFullYear(),l.currentMonth=k.getMonth(),l.currentMonthName=a[l.currentMonth],u(l);for(var C,j=l.calendar.querySelectorAll('[data-direction="0"]'),L=0;!C;){var P=j[L];P.textContent===w&&(C=P),L++}r=C}return void(+k==+l.dateSelected?v(r,l,!0):r.classList.contains("qs-disabled")||v(r,l))}i.contains("qs-submit")?x(e,f,l):h&&r===l.el&&(S(l),M(l))}}else if("focusin"===n&&l)S(l),M(l);else if("keydown"===n&&9===t&&l)D(l);else if("keydown"===n&&l&&!l.disabled){var A=!l.calendar.querySelector(".qs-overlay").classList.contains("qs-hidden");13===t&&A&&c?x(e,r,l):27===t&&A&&c&&E(!0,l)}else if("input"===n){if(!l||!l.calendar.contains(r))return;var Y=l.calendar.querySelector(".qs-submit"),N=r.value.split("").reduce((function(e,t){return e||"0"!==t?e+(t.match(/[0-9]/)?t:""):""}),"").slice(0,4);r.value=N,Y.classList[4===N.length?"remove":"add"]("qs-disabled")}}}function j(e){C(e),e.__qs_shadow_dom=!0}function L(e,t){c.forEach((function(n){e.removeEventListener(n,t)}))}function P(){S(this)}function A(){D(this)}function Y(e,t){var n=q(e),o=this.currentYear,r=this.currentMonth,a=this.sibling;if(null==e)return this.dateSelected=void 0,y(this.el,this,!0),a&&(p({instance:this,deselect:!0}),u(a)),u(this),this;if(!w(e))throw new Error("`setDate` needs a JavaScript Date object.");if(this.disabledDates[+n]||n<this.minDate||n>this.maxDate)throw new Error("You can't manually set a date that's disabled.");this.dateSelected=n,t&&(this.currentYear=n.getFullYear(),this.currentMonth=n.getMonth(),this.currentMonthName=this.months[n.getMonth()]),y(this.el,this),a&&(p({instance:this}),u(a));var i=o===n.getFullYear()&&r===n.getMonth();return i||t?u(this,n):i||u(this,new Date(o,r,1)),this}function N(e){return T(this,e,!0)}function O(e){return T(this,e)}function T(e,t,n){var o=e.dateSelected,r=e.first,a=e.sibling,i=e.minDate,l=e.maxDate,c=q(t),s=n?"Min":"Max";function d(){return"original"+s+"Date"}function m(){return s.toLowerCase()+"Date"}function h(){return"set"+s}function f(){throw new Error("Out-of-range date passed to "+h())}if(null==t)e[d()]=void 0,a?(a[d()]=void 0,n?(r&&!o||!r&&!a.dateSelected)&&(e.minDate=void 0,a.minDate=void 0):(r&&!a.dateSelected||!r&&!o)&&(e.maxDate=void 0,a.maxDate=void 0)):e[m()]=void 0;else{if(!w(t))throw new Error("Invalid date passed to "+h());a?((r&&n&&c>(o||l)||r&&!n&&c<(a.dateSelected||i)||!r&&n&&c>(a.dateSelected||l)||!r&&!n&&c<(o||i))&&f(),e[d()]=c,a[d()]=c,(n&&(r&&!o||!r&&!a.dateSelected)||!n&&(r&&!a.dateSelected||!r&&!o))&&(e[m()]=c,a[m()]=c)):((n&&c>(o||l)||!n&&c<(o||i))&&f(),e[m()]=c)}return a&&u(a),u(e),e}function F(){var e=this.first?this:this.sibling,t=e.sibling;return{start:e.dateSelected,end:t.dateSelected}}function I(){var e=this.shadowDom,t=this.positionedEl,n=this.calendarContainer,r=this.sibling,a=this;this.inlinePosition&&(o.some((function(e){return e!==a&&e.positionedEl===t}))||t.style.setProperty("position",null)),n.remove(),o=o.filter((function(e){return e!==a})),r&&delete r.sibling,o.length||L(document,C);var i=o.some((function(t){return t.shadowDom===e}));for(var l in e&&!i&&L(e,j),this)delete this[l];o.length||c.forEach((function(e){document.removeEventListener(e,C)}))}function $(e,t){var n=new Date(e);if(!w(n))throw new Error("Invalid date passed to `navigate`");this.currentYear=n.getFullYear(),this.currentMonth=n.getMonth(),u(this),t&&this.onMonthChange(this)}function R(){var e=!this.calendarContainer.classList.contains("qs-hidden"),t=!this.calendarContainer.querySelector(".qs-overlay").classList.contains("qs-hidden");e&&E(t,this)}t.default=function(e,t){var n=function(e,t){var n,c,s=function(e){var t=d(e);t.events&&(t.events=t.events.reduce((function(e,t){if(!w(t))throw new Error('"options.events" must only contain valid JavaScript Date objects.');return e[+q(t)]=!0,e}),{})),["startDate","dateSelected","minDate","maxDate"].forEach((function(e){var n=t[e];if(n&&!w(n))throw new Error('"options.'+e+'" needs to be a valid JavaScript Date object.');t[e]=q(n)}));var n=t.position,a=t.maxDate,c=t.minDate,s=t.dateSelected,u=t.overlayPlaceholder,m=t.overlayButton,h=t.startDay,f=t.id;if(t.startDate=q(t.startDate||s||new Date),t.disabledDates=(t.disabledDates||[]).reduce((function(e,t){var n=+q(t);if(!w(t))throw new Error('You supplied an invalid date to "options.disabledDates".');if(n===+q(s))throw new Error('"disabledDates" cannot contain the same date as "dateSelected".');return e[n]=1,e}),{}),t.hasOwnProperty("id")&&null==f)throw new Error("`id` cannot be `null` or `undefined`");if(null!=f){var v=o.filter((function(e){return e.id===f}));if(v.length>1)throw new Error("Only two datepickers can share an id.");v.length?(t.second=!0,t.sibling=v[0]):t.first=!0}var p=["tr","tl","br","bl","c"].some((function(e){return n===e}));if(n&&!p)throw new Error('"options.position" must be one of the following: tl, tr, bl, br, or c.');function y(e){throw new Error('"dateSelected" in options is '+(e?"less":"greater")+' than "'+(e||"max")+'Date".')}if(t.position=function(e){var t=e[0],n=e[1],o={};return o[i[t]]=1,n&&(o[i[n]]=1),o}(n||"bl"),a<c)throw new Error('"maxDate" in options is less than "minDate".');if(s&&(c>s&&y("min"),a<s&&y()),["onSelect","onShow","onHide","onMonthChange","formatter","disabler"].forEach((function(e){"function"!=typeof t[e]&&(t[e]=l)})),["customDays","customMonths","customOverlayMonths"].forEach((function(e,n){var o=t[e],r=n?12:7;if(o){if(!Array.isArray(o)||o.length!==r||o.some((function(e){return"string"!=typeof e})))throw new Error('"'+e+'" must be an array with '+r+" strings.");t[n?n<2?"months":"overlayMonths":"days"]=o}})),h&&h>0&&h<7){var b=(t.customDays||r).slice(),g=b.splice(0,h);t.customDays=b.concat(g),t.startDay=+h,t.weekendIndices=[b.length-1,b.length]}else t.startDay=0,t.weekendIndices=[6,0];"string"!=typeof u&&delete t.overlayPlaceholder,"string"!=typeof m&&delete t.overlayButton;var D=t.defaultView;if(D&&"calendar"!==D&&"overlay"!==D)throw new Error('options.defaultView must either be "calendar" or "overlay".');return t.defaultView=D||"calendar",t}(t||{startDate:q(new Date),position:"bl",defaultView:"calendar"}),u=e;if("string"==typeof u)u="#"===u[0]?document.getElementById(u.slice(1)):document.querySelector(u);else{if("[object ShadowRoot]"===k(u))throw new Error("Using a shadow DOM as your selector is not supported.");for(var m,h=u.parentNode;!m;){var f=k(h);"[object HTMLDocument]"===f?m=!0:"[object ShadowRoot]"===f?(m=!0,n=h,c=h.host):h=h.parentNode}}if(!u)throw new Error("No selector / element found.");if(o.some((function(e){return e.el===u})))throw new Error("A datepicker already exists on that element.");var v=u===document.body,p=n?u.parentElement||n:v?document.body:u.parentElement,b=n?u.parentElement||c:p,g=document.createElement("div"),D=document.createElement("div");g.className="qs-datepicker-container qs-hidden",D.className="qs-datepicker";var E={shadowDom:n,customElement:c,positionedEl:b,el:u,parent:p,nonInput:"INPUT"!==u.nodeName,noPosition:v,position:!v&&s.position,startDate:s.startDate,dateSelected:s.dateSelected,disabledDates:s.disabledDates,minDate:s.minDate,maxDate:s.maxDate,noWeekends:!!s.noWeekends,weekendIndices:s.weekendIndices,calendarContainer:g,calendar:D,currentMonth:(s.startDate||s.dateSelected).getMonth(),currentMonthName:(s.months||a)[(s.startDate||s.dateSelected).getMonth()],currentYear:(s.startDate||s.dateSelected).getFullYear(),events:s.events||{},defaultView:s.defaultView,setDate:Y,remove:I,setMin:N,setMax:O,show:P,hide:A,navigate:$,toggleOverlay:R,onSelect:s.onSelect,onShow:s.onShow,onHide:s.onHide,onMonthChange:s.onMonthChange,formatter:s.formatter,disabler:s.disabler,months:s.months||a,days:s.customDays||r,startDay:s.startDay,overlayMonths:s.overlayMonths||(s.months||a).map((function(e){return e.slice(0,3)})),overlayPlaceholder:s.overlayPlaceholder||"4-digit year",overlayButton:s.overlayButton||"Submit",disableYearOverlay:!!s.disableYearOverlay,disableMobile:!!s.disableMobile,isMobile:"ontouchstart"in window,alwaysShow:!!s.alwaysShow,id:s.id,showAllDates:!!s.showAllDates,respectDisabledReadOnly:!!s.respectDisabledReadOnly,first:s.first,second:s.second};if(s.sibling){var x=s.sibling,M=E,C=x.minDate||M.minDate,j=x.maxDate||M.maxDate;M.sibling=x,x.sibling=M,x.minDate=C,x.maxDate=j,M.minDate=C,M.maxDate=j,x.originalMinDate=C,x.originalMaxDate=j,M.originalMinDate=C,M.originalMaxDate=j,x.getRange=F,M.getRange=F}s.dateSelected&&y(u,E);var L=getComputedStyle(b).position;v||L&&"static"!==L||(E.inlinePosition=!0,b.style.setProperty("position","relative"));var T=o.filter((function(e){return e.positionedEl===E.positionedEl}));return T.some((function(e){return e.inlinePosition}))&&(E.inlinePosition=!0,T.forEach((function(e){e.inlinePosition=!0}))),g.appendChild(D),p.appendChild(g),E.alwaysShow&&S(E),E}(e,t);if(o.length||s(document),n.shadowDom&&(o.some((function(e){return e.shadowDom===n.shadowDom}))||s(n.shadowDom)),o.push(n),n.second){var c=n.sibling;p({instance:n,deselect:!n.dateSelected}),p({instance:c,deselect:!c.dateSelected}),u(c)}return u(n,n.startDate||n.dateSelected),n.alwaysShow&&g(n),n}}]).default}},t={};function n(o){var r=t[o];if(void 0!==r)return r.exports;var a=t[o]={exports:{}};return e[o](a,a.exports,n),a.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";function e(e,t){t.forEach((t=>{e.appendChild(t)}))}function t(e,t){for(let n=0;n<t.length;n++)e.setAttribute(t[n][0],t[n][1])}function o(e,n,o){let r=document.createElement("button");t(r,[["class","check-edit-btn"],["id",`${e}-btn-${n}`]]);let a=document.createElement("span");return t(a,[["class","material-icons md-36 check-box"]]),a.innerHTML=o,r.appendChild(a),r}const r=(()=>{let e=2;return{addNewCheck:(t,n,o,r,i,l,c,s)=>{let d={title:" "+t,checked:n,icon:o,tags:r,info:i,due:l,priority:c,project:s};a[e.toString()]=d,e++},returnCheckAt:e=>a[e.toString()],updateCheckFor:(e,t,n)=>{a[e.toString()][t]=n},mostRecentId:()=>e-1}})();let a={0:{title:"Pack Luggage",checked:!1,icon:"&#x1F4BC;",tags:["travel","plan"],info:"Notes...",due:"00/00/00",priority:"3",project:"trip"},1:{title:"Read Travel Book",checked:!1,icon:"&#x1F4D6;",tags:["travel","plan"],info:"Notes...",due:"00/00/00",priority:"2",project:"trip"}};const i=(()=>{let e=4;return{addNewProject:t=>{let n={title:t,icon:"&#xE061;",color:"black",info:"Double-Click to Edit Me (and the Title)",attribute:`x${e}-${t.toLowerCase()}`,removable:!0};l[e.toString()]=n,e++},returnProjectAt:e=>l[e.toString()],returnProperty:(e,t)=>l[e.toString()][t],updateProjectFor:(e,t,n)=>{l[e.toString()][t]=n},mostRecentId:()=>e-1}})();let l={0:{title:"All",icon:"&#xE156;",color:"black",info:"All To-Dos Are Listed Here",attribute:"x0-all",removable:!1},1:{title:"Today",icon:"&#xE8DF;",color:"black",info:"These are the To-Dos for Today",attribute:"x1-today",removable:!1},2:{title:"Trip",icon:"&#xE061;",color:"color:rgb(175, 134, 134);",info:"Double-Click to Edit Me (and the Title)",attribute:"x2-trip",removable:!0},3:{title:"Work",icon:"&#xE061;",color:"color:rgb(175, 134, 134);",info:"Double-Click to Edit Me (and the Title)",attribute:"x3-work",removable:!0}};const c=(()=>{let e=document.querySelector("#main-checklist-div"),t=document.querySelectorAll(".check-item-top"),n=document.querySelectorAll(".check-icon"),o=null;window.addEventListener("addedCheckItem",(function(e){r(),a()}));const r=()=>{console.log("updating variables"),t=document.querySelectorAll(".check-item-top"),n=document.querySelectorAll(".check-icon"),console.log(t)};function a(){t.forEach((e=>{e.addEventListener("click",i)}))}function i(e){let t=e.currentTarget.getAttribute("id");t=t[1];let n=document.querySelector(`#x${t[0]}-expand-div`);"none"==n.style.display?(null!=o&&(o.style.display="none"),o=n,n.style.display="block"):n.style.display="none"}return a(),{changeCheckItems:e=>{let t=document.querySelectorAll(".check-item");console.log(e),t.forEach((t=>{t.getAttribute("data-project")==e||"x0-all"==e?t.style.display="block":t.style.display="none"}))},deleteChecks:t=>{document.querySelectorAll(".check-item").forEach((n=>{n.getAttribute("data-project")==t&&e.removeChild(n)}))}}})(),s=(()=>{let e=document.querySelector("#added-projects-div");const n=document.querySelector("#add-project-div"),o=document.querySelector("#add-project-span");let r=document.querySelectorAll(".project-item"),a=document.querySelector("#delete-project-btn"),s="x2-trip";function d(e){let t=e.currentTarget.getAttribute("id")[1];document.querySelector("#main-title").textContent=i.returnProperty(t,"title"),document.querySelector("#main-info").textContent=i.returnProperty(t,"info"),s=i.returnProperty(t,"attribute"),c.changeCheckItems(s),a.style.display="block","x0-all"!=s&&"x1-today"!=s||(a.style.display="none")}return o.addEventListener("click",(function(){if(null==document.querySelector(".project-input-name")){console.log("input new project");let e=document.createElement("input");t(e,[["type","text"],["class","project-input-name"],["maxlength","13"],["placeholder","Project"]]),n.appendChild(e)}})),n.addEventListener("click",(function(e){e.stopPropagation()})),window.addEventListener("click",(function(){if(null!==document.querySelector(".project-input-name")){let o=document.querySelector(".project-input-name");!function(n){i.addNewProject(n);let o=(e=>{console.log("Create New Project");let n=document.createElement("h3");t(n,[["id",`${l[e].attribute}-h3`],["class","project-item"]]),n.textContent=l[e].title;let o=document.createElement("span");return t(o,[["class","material-icons md-36"]]),o.innerHTML=l[e].icon,n.prepend(o),n})(i.mostRecentId());e.appendChild(o),r=document.querySelectorAll(".project-item"),r.forEach((e=>e.addEventListener("click",d)))}(o.value),n.removeChild(o)}})),r.forEach((e=>e.addEventListener("click",d))),a.addEventListener("click",(function(){if("x0-all"!=s&&"x0-today"!=s){let t=document.querySelector(`#${s}-h3`);console.log(`${s}-h3`),console.log(t),e.removeChild(t),c.deleteChecks(s),document.querySelector("#x0-all-h3").click()}})),{getCurrentProject:()=>s}})();(()=>{let e=document.querySelector("#main-title-div"),t=document.querySelector("#main-title"),n=document.querySelector("#main-title-input"),o=document.querySelector("#main-info-div"),r=document.querySelector("#main-info"),a=document.querySelector("#main-info-input");e.addEventListener("click",v),t.addEventListener("dblclick",(e=>f(e,n,"title"))),o.addEventListener("click",v),r.addEventListener("dblclick",(e=>f(e,a,"info"))),window.addEventListener("click",(function(){if(1==l){l=!1;let e=m.value;m.value="",m.style.display="none",u.style.display="block",""!=e&&(console.log("new text: ",e),i.updateProjectFor(d,h,e),u.textContent=e,u==t&&p(c,e))}}));let l=!1,c="x2-trip",d=c[1],u=null,m=null,h=null;function f(e,t,n){l=!0,console.log("I double clicked on text"),e.currentTarget.style.display="none",c=s.getCurrentProject(),d=c[1];let o=i.returnProperty(d,n);t.placeholder=o,t.style.display="block",u=e.currentTarget,m=t,h=n}function v(e){e.stopPropagation()}const p=(e,t)=>{let n=document.querySelector(`#${e}-h3`),o=document.querySelector(`[id=${e}-h3] > span`);n.textContent=t,n.prepend(o)}})();var d=n(448),u=n.n(d);(()=>{console.log("form:");const n=document.querySelector("#form-div"),i=document.querySelector("#add-check-btn"),l=document.querySelector("#btn-close-form"),c=document.querySelector("#form-due-btn");i.addEventListener("click",(function(){d="&#x26AA;",console.log("show form"),n.style.display="block"})),l.addEventListener("click",(function(){n.style.display="none"})),u()(c);let d="&#x26AA;";document.querySelector("emoji-picker").addEventListener("emoji-click",(e=>{console.log(e.detail),console.log(e.detail.emoji.unicode),d=e.detail.emoji.unicode})),n.addEventListener("submit",(function(i){i.preventDefault();let l=document.forms.myForm["form-title"].value,c=document.forms.myForm["form-tags"].value.split(" "),u=document.forms.myForm["form-info"].value,m=document.forms.myForm["form-due-btn"].value,h=document.forms.myForm["form-priority"].value,f=s.getCurrentProject();r.addNewCheck(l,!1,d,c,u,m,h,f),n.style.display="none",(n=>{const r=document.querySelector("#main-checklist-div");let i=document.createElement("div");t(i,[["class","check-item"],["id",`x${n}-check-item`],["data-project",a[n].project],["style","display:block"]]);let l=document.createElement("div");t(l,[["class","check-item-top"],["id",`x${n}-check-item-top`]]);let c=document.createElement("div");t(c,[["class","check-item-expand"],["style","display:none"],["id",`x${n}-expand-div`]]),(()=>{let o=document.createElement("div");t(o,[["class","check-box-title-div"]]);let r=document.createElement("button");t(r,[["class","check-box-btn"]]);let i=document.createElement("span");t(i,[["class","material-icons md-36 check-box"]]),i.innerHTML="&#xE86C;",r.appendChild(i);let c=document.createElement("h4");t(c,[["class","check-title"],["id",`x${n}-title`]]),c.textContent=a[n].title;let s=document.createElement("div");t(s,[["class","check-tag-div"],["id",`x${n}-tag`]]),a[n].tags.forEach((e=>{let n=document.createElement("span");t(n,[["class","check-tag"]]),n.textContent="#"+e,s.appendChild(n)})),e(o,[r,c,s]);let d=document.createElement("h4");t(d,[["class","check-icon"],["id",`x${n}-icon`]]);let u=document.createElement("span");u.innerHTML=a[n].icon,d.appendChild(u),e(l,[o,d])})(),(()=>{let r=document.createElement("textarea");t(r,[["class","check-info"],["name","info"],["rows","8"],["cols","50"],["id",`x${n}-info`]]),r.textContent=a[n].info;let i=document.createElement("div");t(i,[["class","check-item-bottom"]]);let l=document.createElement("h5");l.textContent="Due: ";let s=document.createElement("span");t(s,[["class","check-due"],["id",`x${n}-due`]]),s.textContent=a[n].due,l.appendChild(s);let d=document.createElement("div");t(d,[["class","check-item-bottom-right"]]),e(d,[o(n,"icon","&#xE87C;"),o(n,"priority","&#xE16D;"),o(n,"due","&#xE916;"),o(n,"tag","&#xE54E;"),o(n,"pencil","&#xE3C9;")]),e(i,[l,d]),e(c,[r,i])})(),i.appendChild(l),i.appendChild(c),r.appendChild(i);var s=new CustomEvent("addedCheckItem");window.dispatchEvent(s)})(r.mostRecentId().toString())}))})()})()})();