(()=>{var e={448:e=>{window,e.exports=function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);var r=[],o=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],a=["January","February","March","April","May","June","July","August","September","October","November","December"],i={t:"top",r:"right",b:"bottom",l:"left",c:"centered"};function c(){}var l=["click","focusin","keydown","input"];function s(e){l.forEach((function(t){e.addEventListener(t,e===document?C:j)}))}function d(e){return Array.isArray(e)?e.map(d):"[object Object]"===k(e)?Object.keys(e).reduce((function(t,n){return t[n]=d(e[n]),t}),{}):e}function u(e,t){var n=e.calendar.querySelector(".qs-overlay"),r=n&&!n.classList.contains("qs-hidden");t=t||new Date(e.currentYear,e.currentMonth),e.calendar.innerHTML=[h(t,e,r),m(t,e,r),f(e,r)].join(""),r&&window.requestAnimationFrame((function(){E(!0,e)}))}function h(e,t,n){return['<div class="qs-controls'+(n?" qs-blur":"")+'">','<div class="qs-arrow qs-left"></div>','<div class="qs-month-year">','<span class="qs-month">'+t.months[e.getMonth()]+"</span>",'<span class="qs-year">'+e.getFullYear()+"</span>","</div>",'<div class="qs-arrow qs-right"></div>',"</div>"].join("")}function m(e,t,n){var r=t.currentMonth,o=t.currentYear,a=t.dateSelected,i=t.maxDate,c=t.minDate,l=t.showAllDates,s=t.days,d=t.disabledDates,u=t.startDay,h=t.weekendIndices,m=t.events,f=t.getRange?t.getRange():{},v=+f.start,p=+f.end,y=q(new Date(e).setDate(1)),g=y.getDay()-u,b=g<0?7:0;y.setMonth(y.getMonth()+1),y.setDate(0);var w=y.getDate(),D=[],S=b+7*((g+w)/7|0);S+=(g+w)%7?7:0;for(var E=1;E<=S;E++){var x=(E-1)%7,k=s[x],M=E-(g>=0?g:7+g),C=new Date(o,r,M),j=m[+C],L=M<1||M>w,P=L?M<1?-1:1:0,A=L&&!l,Y=A?"":C.getDate(),N=+C==+a,O=x===h[0]||x===h[1],F=v!==p,I="qs-square "+k;j&&!A&&(I+=" qs-event"),L&&(I+=" qs-outside-current-month"),!l&&L||(I+=" qs-num"),N&&(I+=" qs-active"),(d[+C]||t.disabler(C)||O&&t.noWeekends||c&&+C<+c||i&&+C>+i)&&!A&&(I+=" qs-disabled"),+q(new Date)==+C&&(I+=" qs-current"),+C===v&&p&&F&&(I+=" qs-range-start"),+C>v&&+C<p&&(I+=" qs-range-middle"),+C===p&&v&&F&&(I+=" qs-range-end"),A&&(I+=" qs-empty",Y=""),D.push('<div class="'+I+'" data-direction="'+P+'">'+Y+"</div>")}var T=s.map((function(e){return'<div class="qs-square qs-day">'+e+"</div>"})).concat(D);return T.unshift('<div class="qs-squares'+(n?" qs-blur":"")+'">'),T.push("</div>"),T.join("")}function f(e,t){var n=e.overlayPlaceholder,r=e.overlayButton;return['<div class="qs-overlay'+(t?"":" qs-hidden")+'">',"<div>",'<input class="qs-overlay-year" placeholder="'+n+'" inputmode="numeric" />','<div class="qs-close">&#10005;</div>',"</div>",'<div class="qs-overlay-month-container">'+e.overlayMonths.map((function(e,t){return'<div class="qs-overlay-month" data-month-num="'+t+'">'+e+"</div>"})).join("")+"</div>",'<div class="qs-submit qs-disabled">'+r+"</div>","</div>"].join("")}function v(e,t,n){var r=t.el,o=t.calendar.querySelector(".qs-active"),a=e.textContent,i=t.sibling;(r.disabled||r.readOnly)&&t.respectDisabledReadOnly||(t.dateSelected=n?void 0:new Date(t.currentYear,t.currentMonth,a),o&&o.classList.remove("qs-active"),n||e.classList.add("qs-active"),y(r,t,n),n||D(t),i&&(p({instance:t,deselect:n}),t.first&&!i.dateSelected&&(i.currentYear=t.currentYear,i.currentMonth=t.currentMonth,i.currentMonthName=t.currentMonthName),u(t),u(i)),t.onSelect(t,n?void 0:new Date(t.dateSelected)))}function p(e){var t=e.instance.first?e.instance:e.instance.sibling,n=t.sibling;t===e.instance?e.deselect?(t.minDate=t.originalMinDate,n.minDate=n.originalMinDate):n.minDate=t.dateSelected:e.deselect?(n.maxDate=n.originalMaxDate,t.maxDate=t.originalMaxDate):t.maxDate=n.dateSelected}function y(e,t,n){if(!t.nonInput)return n?e.value="":t.formatter!==c?t.formatter(e,t.dateSelected,t):void(e.value=t.dateSelected.toDateString())}function g(e,t,n,r){n||r?(n&&(t.currentYear=+n),r&&(t.currentMonth=+r)):(t.currentMonth+=e.contains("qs-right")?1:-1,12===t.currentMonth?(t.currentMonth=0,t.currentYear++):-1===t.currentMonth&&(t.currentMonth=11,t.currentYear--)),t.currentMonthName=t.months[t.currentMonth],u(t),t.onMonthChange(t)}function b(e){if(!e.noPosition){var t=e.position.top,n=e.position.right;if(e.position.centered)return e.calendarContainer.classList.add("qs-centered");var r=e.positionedEl.getBoundingClientRect(),o=e.el.getBoundingClientRect(),a=e.calendarContainer.getBoundingClientRect(),i=o.top-r.top+(t?-1*a.height:o.height)+"px",c=o.left-r.left+(n?o.width-a.width:0)+"px";e.calendarContainer.style.setProperty("top",i),e.calendarContainer.style.setProperty("left",c)}}function w(e){return"[object Date]"===k(e)&&"Invalid Date"!==e.toString()}function q(e){if(w(e)||"number"==typeof e&&!isNaN(e)){var t=new Date(+e);return new Date(t.getFullYear(),t.getMonth(),t.getDate())}}function D(e){e.disabled||!e.calendarContainer.classList.contains("qs-hidden")&&!e.alwaysShow&&("overlay"!==e.defaultView&&E(!0,e),e.calendarContainer.classList.add("qs-hidden"),e.onHide(e))}function S(e){e.disabled||(e.calendarContainer.classList.remove("qs-hidden"),"overlay"===e.defaultView&&E(!1,e),b(e),e.onShow(e))}function E(e,t){var n=t.calendar,r=n.querySelector(".qs-overlay"),o=r.querySelector(".qs-overlay-year"),a=n.querySelector(".qs-controls"),i=n.querySelector(".qs-squares");e?(r.classList.add("qs-hidden"),a.classList.remove("qs-blur"),i.classList.remove("qs-blur"),o.value=""):(r.classList.remove("qs-hidden"),a.classList.add("qs-blur"),i.classList.add("qs-blur"),o.focus())}function x(e,t,n,r){var o=isNaN(+(new Date).setFullYear(t.value||void 0)),a=o?null:t.value;13===e.which||13===e.keyCode||"click"===e.type?r?g(null,n,a,r):o||t.classList.contains("qs-disabled")||g(null,n,a):n.calendar.contains(t)&&n.calendar.querySelector(".qs-submit").classList[o?"add":"remove"]("qs-disabled")}function k(e){return{}.toString.call(e)}function M(e){r.forEach((function(t){t!==e&&D(t)}))}function C(e){if(!e.__qs_shadow_dom){var t=e.which||e.keyCode,n=e.type,o=e.target,i=o.classList,c=r.filter((function(e){return e.calendar.contains(o)||e.el===o}))[0],l=c&&c.calendar.contains(o);if(!(c&&c.isMobile&&c.disableMobile))if("click"===n){if(!c)return r.forEach(D);if(c.disabled)return;var s=c.calendar,d=c.calendarContainer,h=c.disableYearOverlay,m=c.nonInput,f=s.querySelector(".qs-overlay-year"),p=!!s.querySelector(".qs-hidden"),y=s.querySelector(".qs-month-year").contains(o),b=o.dataset.monthNum;if(c.noPosition&&!l)(d.classList.contains("qs-hidden")?S:D)(c);else if(i.contains("qs-arrow"))g(i,c);else if(y||i.contains("qs-close"))h||E(!p,c);else if(b)x(e,f,c,b);else{if(i.contains("qs-disabled"))return;if(i.contains("qs-num")){var w=o.textContent,q=+o.dataset.direction,k=new Date(c.currentYear,c.currentMonth+q,w);if(q){c.currentYear=k.getFullYear(),c.currentMonth=k.getMonth(),c.currentMonthName=a[c.currentMonth],u(c);for(var C,j=c.calendar.querySelectorAll('[data-direction="0"]'),L=0;!C;){var P=j[L];P.textContent===w&&(C=P),L++}o=C}return void(+k==+c.dateSelected?v(o,c,!0):o.classList.contains("qs-disabled")||v(o,c))}i.contains("qs-submit")?x(e,f,c):m&&o===c.el&&(S(c),M(c))}}else if("focusin"===n&&c)S(c),M(c);else if("keydown"===n&&9===t&&c)D(c);else if("keydown"===n&&c&&!c.disabled){var A=!c.calendar.querySelector(".qs-overlay").classList.contains("qs-hidden");13===t&&A&&l?x(e,o,c):27===t&&A&&l&&E(!0,c)}else if("input"===n){if(!c||!c.calendar.contains(o))return;var Y=c.calendar.querySelector(".qs-submit"),N=o.value.split("").reduce((function(e,t){return e||"0"!==t?e+(t.match(/[0-9]/)?t:""):""}),"").slice(0,4);o.value=N,Y.classList[4===N.length?"remove":"add"]("qs-disabled")}}}function j(e){C(e),e.__qs_shadow_dom=!0}function L(e,t){l.forEach((function(n){e.removeEventListener(n,t)}))}function P(){S(this)}function A(){D(this)}function Y(e,t){var n=q(e),r=this.currentYear,o=this.currentMonth,a=this.sibling;if(null==e)return this.dateSelected=void 0,y(this.el,this,!0),a&&(p({instance:this,deselect:!0}),u(a)),u(this),this;if(!w(e))throw new Error("`setDate` needs a JavaScript Date object.");if(this.disabledDates[+n]||n<this.minDate||n>this.maxDate)throw new Error("You can't manually set a date that's disabled.");this.dateSelected=n,t&&(this.currentYear=n.getFullYear(),this.currentMonth=n.getMonth(),this.currentMonthName=this.months[n.getMonth()]),y(this.el,this),a&&(p({instance:this}),u(a));var i=r===n.getFullYear()&&o===n.getMonth();return i||t?u(this,n):i||u(this,new Date(r,o,1)),this}function N(e){return F(this,e,!0)}function O(e){return F(this,e)}function F(e,t,n){var r=e.dateSelected,o=e.first,a=e.sibling,i=e.minDate,c=e.maxDate,l=q(t),s=n?"Min":"Max";function d(){return"original"+s+"Date"}function h(){return s.toLowerCase()+"Date"}function m(){return"set"+s}function f(){throw new Error("Out-of-range date passed to "+m())}if(null==t)e[d()]=void 0,a?(a[d()]=void 0,n?(o&&!r||!o&&!a.dateSelected)&&(e.minDate=void 0,a.minDate=void 0):(o&&!a.dateSelected||!o&&!r)&&(e.maxDate=void 0,a.maxDate=void 0)):e[h()]=void 0;else{if(!w(t))throw new Error("Invalid date passed to "+m());a?((o&&n&&l>(r||c)||o&&!n&&l<(a.dateSelected||i)||!o&&n&&l>(a.dateSelected||c)||!o&&!n&&l<(r||i))&&f(),e[d()]=l,a[d()]=l,(n&&(o&&!r||!o&&!a.dateSelected)||!n&&(o&&!a.dateSelected||!o&&!r))&&(e[h()]=l,a[h()]=l)):((n&&l>(r||c)||!n&&l<(r||i))&&f(),e[h()]=l)}return a&&u(a),u(e),e}function I(){var e=this.first?this:this.sibling,t=e.sibling;return{start:e.dateSelected,end:t.dateSelected}}function T(){var e=this.shadowDom,t=this.positionedEl,n=this.calendarContainer,o=this.sibling,a=this;this.inlinePosition&&(r.some((function(e){return e!==a&&e.positionedEl===t}))||t.style.setProperty("position",null)),n.remove(),r=r.filter((function(e){return e!==a})),o&&delete o.sibling,r.length||L(document,C);var i=r.some((function(t){return t.shadowDom===e}));for(var c in e&&!i&&L(e,j),this)delete this[c];r.length||l.forEach((function(e){document.removeEventListener(e,C)}))}function R(e,t){var n=new Date(e);if(!w(n))throw new Error("Invalid date passed to `navigate`");this.currentYear=n.getFullYear(),this.currentMonth=n.getMonth(),u(this),t&&this.onMonthChange(this)}function $(){var e=!this.calendarContainer.classList.contains("qs-hidden"),t=!this.calendarContainer.querySelector(".qs-overlay").classList.contains("qs-hidden");e&&E(t,this)}t.default=function(e,t){var n=function(e,t){var n,l,s=function(e){var t=d(e);t.events&&(t.events=t.events.reduce((function(e,t){if(!w(t))throw new Error('"options.events" must only contain valid JavaScript Date objects.');return e[+q(t)]=!0,e}),{})),["startDate","dateSelected","minDate","maxDate"].forEach((function(e){var n=t[e];if(n&&!w(n))throw new Error('"options.'+e+'" needs to be a valid JavaScript Date object.');t[e]=q(n)}));var n=t.position,a=t.maxDate,l=t.minDate,s=t.dateSelected,u=t.overlayPlaceholder,h=t.overlayButton,m=t.startDay,f=t.id;if(t.startDate=q(t.startDate||s||new Date),t.disabledDates=(t.disabledDates||[]).reduce((function(e,t){var n=+q(t);if(!w(t))throw new Error('You supplied an invalid date to "options.disabledDates".');if(n===+q(s))throw new Error('"disabledDates" cannot contain the same date as "dateSelected".');return e[n]=1,e}),{}),t.hasOwnProperty("id")&&null==f)throw new Error("`id` cannot be `null` or `undefined`");if(null!=f){var v=r.filter((function(e){return e.id===f}));if(v.length>1)throw new Error("Only two datepickers can share an id.");v.length?(t.second=!0,t.sibling=v[0]):t.first=!0}var p=["tr","tl","br","bl","c"].some((function(e){return n===e}));if(n&&!p)throw new Error('"options.position" must be one of the following: tl, tr, bl, br, or c.');function y(e){throw new Error('"dateSelected" in options is '+(e?"less":"greater")+' than "'+(e||"max")+'Date".')}if(t.position=function(e){var t=e[0],n=e[1],r={};return r[i[t]]=1,n&&(r[i[n]]=1),r}(n||"bl"),a<l)throw new Error('"maxDate" in options is less than "minDate".');if(s&&(l>s&&y("min"),a<s&&y()),["onSelect","onShow","onHide","onMonthChange","formatter","disabler"].forEach((function(e){"function"!=typeof t[e]&&(t[e]=c)})),["customDays","customMonths","customOverlayMonths"].forEach((function(e,n){var r=t[e],o=n?12:7;if(r){if(!Array.isArray(r)||r.length!==o||r.some((function(e){return"string"!=typeof e})))throw new Error('"'+e+'" must be an array with '+o+" strings.");t[n?n<2?"months":"overlayMonths":"days"]=r}})),m&&m>0&&m<7){var g=(t.customDays||o).slice(),b=g.splice(0,m);t.customDays=g.concat(b),t.startDay=+m,t.weekendIndices=[g.length-1,g.length]}else t.startDay=0,t.weekendIndices=[6,0];"string"!=typeof u&&delete t.overlayPlaceholder,"string"!=typeof h&&delete t.overlayButton;var D=t.defaultView;if(D&&"calendar"!==D&&"overlay"!==D)throw new Error('options.defaultView must either be "calendar" or "overlay".');return t.defaultView=D||"calendar",t}(t||{startDate:q(new Date),position:"bl",defaultView:"calendar"}),u=e;if("string"==typeof u)u="#"===u[0]?document.getElementById(u.slice(1)):document.querySelector(u);else{if("[object ShadowRoot]"===k(u))throw new Error("Using a shadow DOM as your selector is not supported.");for(var h,m=u.parentNode;!h;){var f=k(m);"[object HTMLDocument]"===f?h=!0:"[object ShadowRoot]"===f?(h=!0,n=m,l=m.host):m=m.parentNode}}if(!u)throw new Error("No selector / element found.");if(r.some((function(e){return e.el===u})))throw new Error("A datepicker already exists on that element.");var v=u===document.body,p=n?u.parentElement||n:v?document.body:u.parentElement,g=n?u.parentElement||l:p,b=document.createElement("div"),D=document.createElement("div");b.className="qs-datepicker-container qs-hidden",D.className="qs-datepicker";var E={shadowDom:n,customElement:l,positionedEl:g,el:u,parent:p,nonInput:"INPUT"!==u.nodeName,noPosition:v,position:!v&&s.position,startDate:s.startDate,dateSelected:s.dateSelected,disabledDates:s.disabledDates,minDate:s.minDate,maxDate:s.maxDate,noWeekends:!!s.noWeekends,weekendIndices:s.weekendIndices,calendarContainer:b,calendar:D,currentMonth:(s.startDate||s.dateSelected).getMonth(),currentMonthName:(s.months||a)[(s.startDate||s.dateSelected).getMonth()],currentYear:(s.startDate||s.dateSelected).getFullYear(),events:s.events||{},defaultView:s.defaultView,setDate:Y,remove:T,setMin:N,setMax:O,show:P,hide:A,navigate:R,toggleOverlay:$,onSelect:s.onSelect,onShow:s.onShow,onHide:s.onHide,onMonthChange:s.onMonthChange,formatter:s.formatter,disabler:s.disabler,months:s.months||a,days:s.customDays||o,startDay:s.startDay,overlayMonths:s.overlayMonths||(s.months||a).map((function(e){return e.slice(0,3)})),overlayPlaceholder:s.overlayPlaceholder||"4-digit year",overlayButton:s.overlayButton||"Submit",disableYearOverlay:!!s.disableYearOverlay,disableMobile:!!s.disableMobile,isMobile:"ontouchstart"in window,alwaysShow:!!s.alwaysShow,id:s.id,showAllDates:!!s.showAllDates,respectDisabledReadOnly:!!s.respectDisabledReadOnly,first:s.first,second:s.second};if(s.sibling){var x=s.sibling,M=E,C=x.minDate||M.minDate,j=x.maxDate||M.maxDate;M.sibling=x,x.sibling=M,x.minDate=C,x.maxDate=j,M.minDate=C,M.maxDate=j,x.originalMinDate=C,x.originalMaxDate=j,M.originalMinDate=C,M.originalMaxDate=j,x.getRange=I,M.getRange=I}s.dateSelected&&y(u,E);var L=getComputedStyle(g).position;v||L&&"static"!==L||(E.inlinePosition=!0,g.style.setProperty("position","relative"));var F=r.filter((function(e){return e.positionedEl===E.positionedEl}));return F.some((function(e){return e.inlinePosition}))&&(E.inlinePosition=!0,F.forEach((function(e){e.inlinePosition=!0}))),b.appendChild(D),p.appendChild(b),E.alwaysShow&&S(E),E}(e,t);if(r.length||s(document),n.shadowDom&&(r.some((function(e){return e.shadowDom===n.shadowDom}))||s(n.shadowDom)),r.push(n),n.second){var l=n.sibling;p({instance:n,deselect:!n.dateSelected}),p({instance:l,deselect:!l.dateSelected}),u(l)}return u(n,n.startDate||n.dateSelected),n.alwaysShow&&b(n),n}}]).default}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var a=t[r]={exports:{}};return e[r](a,a.exports,n),a.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";function e(e,t){t.forEach((t=>{e.appendChild(t)}))}function t(e,t){for(let n=0;n<t.length;n++)e.setAttribute(t[n][0],t[n][1])}function r(e,n,r){let o=document.createElement("button");t(o,[["class","check-edit-btn"],["id",`${e}-btn-${n}`]]);let a=document.createElement("span");return t(a,[["class","material-icons md-36 check-box"]]),a.innerHTML=r,o.appendChild(a),o}const o=(()=>{let e=2;return{addNewCheck:(t,n,r,o,i,c,l,s)=>{let d={title:" "+t,checked:n,icon:r,tags:o,info:i,due:c,priority:l,project:s};a[e.toString()]=d,e++},returnCheckAt:e=>a[e.toString()],updateCheckFor:(e,t,n)=>{a[e.toString()][t]=n},mostRecentId:()=>e-1}})();let a={0:{title:"Pack Luggage",checked:!1,icon:"&#x1F4BC;",tags:["travel","plan"],info:"Notes...",due:"00/00/00",priority:"3",project:"trip"},1:{title:"Read Travel Book",checked:!1,icon:"&#x1F4D6;",tags:["travel","plan"],info:"Notes...",due:"00/00/00",priority:"2",project:"trip"}};const i=(()=>{let e=4;return{addNewProject:t=>{let n={title:t,icon:"&#xE061;",color:"black",info:"Edit me by clicking the pencil icon",attribute:`x${e}-${t.toLowerCase()}`,removable:!0};c[e.toString()]=n,e++},returnProjectAt:e=>c[e.toString()],returnProperty:(e,t)=>c[e.toString()][t],updateCheckFor:(e,t,n)=>{c[e.toString()][t]=n},mostRecentId:()=>e-1}})();let c={0:{title:"All",icon:"&#xE156;",color:"black",info:"All To-Dos Are Listed Here",attribute:"x0-all",removable:!1},1:{title:"Today",icon:"&#xE8DF;",color:"black",info:"These are the To-Dos for Today",attribute:"x1-today",removable:!1},2:{title:"Trip",icon:"&#xE061;",color:"color:rgb(175, 134, 134);",info:"Edit me by clicking the pencil icon",attribute:"x2-trip",removable:!0},3:{title:"Work",icon:"&#xE061;",color:"color:rgb(175, 134, 134);",info:"Edit me by clicking the pencil icon",attribute:"x3-work",removable:!0}};const l=(()=>{let e=document.querySelector("#main-checklist-div"),t=document.querySelectorAll(".check-item-top"),n=document.querySelectorAll(".check-icon"),r=null;window.addEventListener("addedCheckItem",(function(e){o(),a()}));const o=()=>{console.log("updating variables"),t=document.querySelectorAll(".check-item-top"),n=document.querySelectorAll(".check-icon"),console.log(t)};function a(){t.forEach((e=>{e.addEventListener("click",i)}))}function i(e){let t=e.currentTarget.getAttribute("id");t=t[1];let n=document.querySelector(`#x${t[0]}-expand-div`);"none"==n.style.display?(null!=r&&(r.style.display="none"),r=n,n.style.display="block"):n.style.display="none"}return a(),{changeCheckItems:e=>{let t=document.querySelectorAll(".check-item");console.log(e),t.forEach((t=>{t.getAttribute("data-project")==e||"x0-all"==e?t.style.display="block":t.style.display="none"}))},deleteChecks:t=>{document.querySelectorAll(".check-item").forEach((n=>{n.getAttribute("data-project")==t&&e.removeChild(n)}))}}})(),s=(()=>{let e=document.querySelector("#added-projects-div");const n=document.querySelector("#add-project-div"),r=document.querySelector("#add-project-span");let o=document.querySelectorAll(".project-item"),a=document.querySelector("#delete-project-btn"),s="x2-trip";function d(e){let t=e.currentTarget.getAttribute("id")[1];document.querySelector("#main-title").textContent=i.returnProperty(t,"title"),document.querySelector("#main-info").textContent=i.returnProperty(t,"info"),s=i.returnProperty(t,"attribute"),l.changeCheckItems(s),a.style.display="block","x0-all"!=s&&"x1-today"!=s||(a.style.display="none")}return r.addEventListener("click",(function(){if(null==document.querySelector(".project-input-name")){console.log("input new project");let e=document.createElement("input");t(e,[["type","text"],["class","project-input-name"],["maxlength","13"],["placeholder","Project"]]),n.appendChild(e)}})),n.addEventListener("click",(function(e){e.stopPropagation()})),window.addEventListener("click",(function(){if(null!==document.querySelector(".project-input-name")){let r=document.querySelector(".project-input-name");!function(n){i.addNewProject(n);let r=(e=>{console.log("Create New Project");let n=document.createElement("h3");t(n,[["id",`${c[e].attribute}-h3`],["class","project-item"]]),n.textContent=c[e].title;let r=document.createElement("span");return t(r,[["class","material-icons md-36"]]),r.innerHTML=c[e].icon,n.prepend(r),n})(i.mostRecentId());e.appendChild(r),o=document.querySelectorAll(".project-item"),o.forEach((e=>e.addEventListener("click",d)))}(r.value),n.removeChild(r)}})),o.forEach((e=>e.addEventListener("click",d))),a.addEventListener("click",(function(){if("x0-all"!=s&&"x0-today"!=s){let t=document.querySelector(`#${s}-h3`);console.log(`${s}-h3`),console.log(t),e.removeChild(t),l.deleteChecks(s),document.querySelector("#x0-all-h3").click()}})),{getCurrentProject:()=>s}})();var d=n(448),u=n.n(d);(()=>{console.log("form:");const n=document.querySelector("#form-div"),i=document.querySelector("#add-check-btn"),c=document.querySelector("#btn-close-form"),l=document.querySelector("#form-due-btn");i.addEventListener("click",(function(){d="&#x26AA;",console.log("show form"),n.style.display="block"})),c.addEventListener("click",(function(){n.style.display="none"})),u()(l);let d="&#x26AA;";document.querySelector("emoji-picker").addEventListener("emoji-click",(e=>{console.log(e.detail),console.log(e.detail.emoji.unicode),d=e.detail.emoji.unicode})),n.addEventListener("submit",(function(i){i.preventDefault();let c=document.forms.myForm["form-title"].value,l=document.forms.myForm["form-tags"].value.split(" "),u=document.forms.myForm["form-info"].value,h=document.forms.myForm["form-due-btn"].value,m=document.forms.myForm["form-priority"].value,f=s.getCurrentProject();o.addNewCheck(c,!1,d,l,u,h,m,f),n.style.display="none",(n=>{const o=document.querySelector("#main-checklist-div");let i=document.createElement("div");t(i,[["class","check-item"],["id",`x${n}-check-item`],["data-project",a[n].project],["style","display:block"]]);let c=document.createElement("div");t(c,[["class","check-item-top"],["id",`x${n}-check-item-top`]]);let l=document.createElement("div");t(l,[["class","check-item-expand"],["style","display:none"],["id",`x${n}-expand-div`]]),(()=>{let r=document.createElement("div");t(r,[["class","check-box-title-div"]]);let o=document.createElement("button");t(o,[["class","check-box-btn"]]);let i=document.createElement("span");t(i,[["class","material-icons md-36 check-box"]]),i.innerHTML="&#xE86C;",o.appendChild(i);let l=document.createElement("h4");t(l,[["class","check-title"],["id",`x${n}-title`]]),l.textContent=a[n].title;let s=document.createElement("div");t(s,[["class","check-tag-div"],["id",`x${n}-tag`]]),a[n].tags.forEach((e=>{let n=document.createElement("span");t(n,[["class","check-tag"]]),n.textContent="#"+e,s.appendChild(n)})),e(r,[o,l,s]);let d=document.createElement("h4");t(d,[["class","check-icon"],["id",`x${n}-icon`]]);let u=document.createElement("span");u.innerHTML=a[n].icon,d.appendChild(u),e(c,[r,d])})(),(()=>{let o=document.createElement("textarea");t(o,[["class","check-info"],["name","info"],["rows","8"],["cols","50"],["id",`x${n}-info`]]),o.textContent=a[n].info;let i=document.createElement("div");t(i,[["class","check-item-bottom"]]);let c=document.createElement("h5");c.textContent="Due: ";let s=document.createElement("span");t(s,[["class","check-due"],["id",`x${n}-due`]]),s.textContent=a[n].due,c.appendChild(s);let d=document.createElement("div");t(d,[["class","check-item-bottom-right"]]),e(d,[r(n,"priority","&#xE16D;"),r(n,"due","&#xE916;"),r(n,"tag","&#xE54E;")]),e(i,[c,d]),e(l,[o,i])})(),i.appendChild(c),i.appendChild(l),o.appendChild(i);var s=new CustomEvent("addedCheckItem");window.dispatchEvent(s)})(o.mostRecentId().toString())}))})()})()})();