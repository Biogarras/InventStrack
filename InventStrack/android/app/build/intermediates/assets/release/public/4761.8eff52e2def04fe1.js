"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[4761],{7142:(v,c,t)=>{t.r(c),t.d(c,{EliminarTiendaPageModule:()=>E});var f=t(177),u=t(4341),r=t(4742),g=t(6755),m=t(467),e=t(3953),h=t(1653);const p=[{path:"",component:(()=>{var n;class l{constructor(i,a){this.tiendasService=i,this.alertController=a}ngOnInit(){}eliminarTienda(){var a,i=this;void 0!==this.id&&this.id>0?this.tiendasService.eliminarTienda(this.id).subscribe({next:(a=(0,m.A)(function*(s){yield(yield i.alertController.create({header:"\xc9xito",message:"La tienda ha sido eliminada exitosamente.",buttons:["OK"]})).present()}),function(o){return a.apply(this,arguments)}),error:function(){var a=(0,m.A)(function*(s){yield(yield i.alertController.create({header:"Error",message:"Hubo un problema al eliminar la tienda.",buttons:["OK"]})).present()});return function(o){return a.apply(this,arguments)}}()}):this.mostrarAlerta("Error","Debe ingresar un ID v\xe1lido.")}mostrarAlerta(i,a){var s=this;return(0,m.A)(function*(){yield(yield s.alertController.create({header:i,message:a,buttons:["OK"]})).present()})()}}return(n=l).\u0275fac=function(i){return new(i||n)(e.rXU(h.m),e.rXU(r.hG))},n.\u0275cmp=e.VBU({type:n,selectors:[["app-eliminar-tienda"]],decls:15,vars:3,consts:[[3,"translucent"],[3,"fullscreen"],["collapse","condense"],["size","large"],["position","floating"],["type","number","placeholder","Ingresa el ID de la tienda",3,"ngModelChange","ngModel"],["expand","full",3,"click"]],template:function(i,a){1&i&&(e.j41(0,"ion-header",0)(1,"ion-toolbar")(2,"ion-title"),e.EFF(3,"Eliminar Tienda"),e.k0s()()(),e.j41(4,"ion-content",1)(5,"ion-header",2)(6,"ion-toolbar")(7,"ion-title",3),e.EFF(8,"Eliminar Tienda"),e.k0s()()(),e.j41(9,"ion-item")(10,"ion-label",4),e.EFF(11,"ID de la Tienda"),e.k0s(),e.j41(12,"ion-input",5),e.mxI("ngModelChange",function(o){return e.DH7(a.id,o)||(a.id=o),o}),e.k0s()(),e.j41(13,"ion-button",6),e.bIt("click",function(){return a.eliminarTienda()}),e.EFF(14," Eliminar Tienda "),e.k0s()()),2&i&&(e.Y8G("translucent",!0),e.R7$(4),e.Y8G("fullscreen",!0),e.R7$(8),e.R50("ngModel",a.id))},dependencies:[u.BC,u.vS,r.Jm,r.W9,r.eU,r.$w,r.uz,r.he,r.BC,r.ai,r.su]}),l})()}];let T=(()=>{var n;class l{}return(n=l).\u0275fac=function(i){return new(i||n)},n.\u0275mod=e.$C({type:n}),n.\u0275inj=e.G2t({imports:[g.iI.forChild(p),g.iI]}),l})(),E=(()=>{var n;class l{}return(n=l).\u0275fac=function(i){return new(i||n)},n.\u0275mod=e.$C({type:n}),n.\u0275inj=e.G2t({imports:[f.MD,u.YN,r.bv,T]}),l})()}}]);