(this["webpackJsonppart1-kadai"]=this["webpackJsonppart1-kadai"]||[]).push([[0],{14:function(e,n,t){e.exports=t(36)},36:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),o=t(13),c=t.n(o),l=t(3),u=function(e){return r.a.createElement("form",{onSubmit:e.handleSetPerson},r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:e.newName,onChange:e.handleNmaeChange})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{value:e.newNomber,onChange:e.handleNumberChange})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},i=function(e){var n=e.searchWord,t=e.handleSearch;return r.a.createElement("div",null,r.a.createElement("label",null,"search"),r.a.createElement("input",{value:n,onChange:t}))},m=function(e){var n=e.result,t=e.handleDestroy;return r.a.createElement("div",null,n.map((function(e,n){return r.a.createElement("li",{key:n},e.name," ",e.number,r.a.createElement("button",{onClick:function(){return t(e.id)}},"delete"))})))},d=t(2),h=t.n(d),s="/api/persons",f=function(){return h.a.get(s).then((function(e){return e.data}))},b=function(e){return h.a.post(s,e).then((function(e){return e.data}))},v=function(e){return h.a.delete("".concat(s,"/").concat(e)).then((function(e){return e.data}))},g=function(){var e=Object(a.useState)([]),n=Object(l.a)(e,2),t=n[0],o=n[1],c=Object(a.useState)(""),d=Object(l.a)(c,2),h=d[0],s=d[1],g=Object(a.useState)(""),E=Object(l.a)(g,2),p=E[0],w=E[1],k=Object(a.useState)(""),j=Object(l.a)(k,2),N=j[0],O=j[1];Object(a.useEffect)((function(){f().then((function(e){o(e)}))}),[]);var S=""===N?t:t.filter((function(e){return e.name.includes(N)}));return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(i,{handleSearch:function(e){console.log(N),O(e.target.value)},searchWord:N}),r.a.createElement(u,{handleSetPerson:function(e){(e.preventDefault(),t.map((function(e){return e.name})).includes(h))?window.alert("".concat(h," is already added to phonebook")):(b({name:h,number:p}).then((function(e){return o(t.concat(e))})),s(""),w(""))},newName:h,newNomber:p,handleNmaeChange:function(e){console.log("change",e.target.value),s(e.target.value)},handleNumberChange:function(e){console.log("change",e.target.value),w(e.target.value)}}),r.a.createElement("h2",null,"Numbers"),"...",r.a.createElement(m,{result:S,handleDestroy:function(e){v(e).then((function(){o(t.filter((function(n){return n.id!==e})))}))}}),r.a.createElement("div",null,"debug: ",r.a.createElement("p",null,N)))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(g,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[14,1,2]]]);
//# sourceMappingURL=main.1e4e9e67.chunk.js.map