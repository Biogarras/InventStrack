"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[6521],{6521:(I,c,r)=>{r.r(c),r.d(c,{ion_input_password_toggle:()=>e});var i=r(4261),l=r(4929),u=r(333),d=r(3992),p=r(9483);const e=(()=>{let a=class{constructor(o){(0,i.r)(this,o),this.togglePasswordVisibility=()=>{const{inputElRef:s}=this;s&&(s.type="text"===s.type?"password":"text")},this.color=void 0,this.showIcon=void 0,this.hideIcon=void 0,this.type="password"}onTypeChange(o){"text"===o||"password"===o||(0,l.p)(`ion-input-password-toggle only supports inputs of type "text" or "password". Input of type "${o}" is not compatible.`,this.el)}connectedCallback(){const{el:o}=this,s=this.inputElRef=o.closest("ion-input");s?this.type=s.type:(0,l.p)("No ancestor ion-input found for ion-input-password-toggle. This component must be slotted inside of an ion-input.",o)}disconnectedCallback(){this.inputElRef=null}render(){var o,s;const{color:h,type:P}=this,g=(0,p.b)(this),E=null!==(o=this.showIcon)&&void 0!==o?o:d.x,w=null!==(s=this.hideIcon)&&void 0!==s?s:d.y,y="text"===P;return(0,i.h)(i.f,{key:"ed1c29726ce0c91548f0e2ada61e3f8b5c813d2d",class:(0,u.c)(h,{[g]:!0})},(0,i.h)("ion-button",{key:"9698eccdaedb86cf12d20acc53660371b3af3c55",mode:g,color:h,fill:"clear",shape:"round","aria-checked":y?"true":"false","aria-label":"show password",role:"switch",type:"button",onPointerDown:C=>{C.preventDefault()},onClick:this.togglePasswordVisibility},(0,i.h)("ion-icon",{key:"1f2119c30b56c800d9af44e6499445a0ebb466cf",slot:"icon-only","aria-hidden":"true",icon:y?w:E})))}get el(){return(0,i.i)(this)}static get watchers(){return{type:["onTypeChange"]}}};return a.style={ios:"",md:""},a})()},333:(I,c,r)=>{r.d(c,{c:()=>u,g:()=>p,h:()=>l,o:()=>_});var i=r(467);const l=(n,t)=>null!==t.closest(n),u=(n,t)=>"string"==typeof n&&n.length>0?Object.assign({"ion-color":!0,[`ion-color-${n}`]:!0},t):t,p=n=>{const t={};return(n=>void 0!==n?(Array.isArray(n)?n:n.split(" ")).filter(e=>null!=e).map(e=>e.trim()).filter(e=>""!==e):[])(n).forEach(e=>t[e]=!0),t},f=/^[a-z][a-z0-9+\-.]*:/,_=function(){var n=(0,i.A)(function*(t,e,a,o){if(null!=t&&"#"!==t[0]&&!f.test(t)){const s=document.querySelector("ion-router");if(s)return null!=e&&e.preventDefault(),s.push(t,a,o)}return!1});return function(e,a,o,s){return n.apply(this,arguments)}}()}}]);