(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3bd327c8"],{3253:function(t,e,r){t.exports=r.p+"img/googleLogo.88b95b54.svg"},"474b":function(t,e,r){"use strict";r("aad4")},"4ed2":function(t,e,r){t.exports=r.p+"img/landing.75f5c6f7.svg"},"52d8":function(t,e,r){},"8bd7":function(t,e,r){"use strict";r("e0a2")},"933f":function(t,e,r){"use strict";var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return t.to?r("router-link",{staticClass:"btn",class:t.btnVariant,attrs:{to:t.to}},[t._t("default")],2):t.href?r("a",{staticClass:"btn",class:t.btnVariant,attrs:{href:t.href,target:"_blank",rel:"noopener noreferrer"}},[t._t("default")],2):r("button",{staticClass:"btn",class:t.btnVariant,attrs:{type:t.type,disabled:t.disabled},on:{click:function(e){return t.$emit("click")}}},[t._t("default")],2)},n=[],s={name:"CustomButton",props:{to:String,href:String,variant:String,type:String,disabled:Boolean},computed:{btnVariant:function(){switch(this.variant){case"text":return"btn__text";case"text2":return"btn__text2";case"text2-danger":return"btn__text2--danger";case"danger":return"btn__danger";default:return"btn__primary"}}}},i=s,o=(r("474b"),r("2877")),l=Object(o["a"])(i,a,n,!1,null,"7abc24b2",null);e["a"]=l.exports},a55b:function(t,e,r){"use strict";r.r(e);var a=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container"},[t._m(0),a("div",{staticClass:"leftView"},[a("ValidationObserver",{ref:"form",scopedSlots:t._u([{key:"default",fn:function(e){var n=e.handleSubmit;return[a("form",{on:{submit:function(e){return e.preventDefault(),n(t.login)}}},[a("h2",[t._v("Iniciar Sesion.")]),a("custom-button",{attrs:{type:"button",variant:"text"},on:{click:t.loginWithGoogle}},[a("div",[a("img",{attrs:{src:r("3253"),alt:""}}),a("div",[t._v("Continuar con Google")])])]),a("div",[a("h4",[t._v("o")])]),a("custom-input",{attrs:{vid:"email",placeholder:"Email",type:"email",rules:"required"},model:{value:t.loginForm.email,callback:function(e){t.$set(t.loginForm,"email",e)},expression:"loginForm.email"}}),a("custom-input",{attrs:{vid:"password",placeholder:"Password",type:"password",rules:"required"},model:{value:t.loginForm.password,callback:function(e){t.$set(t.loginForm,"password",e)},expression:"loginForm.password"}}),a("custom-button",{attrs:{type:"submit"}},[t._v("Iniciar Sesión.")]),a("div",{staticClass:"createAccount"},[a("h4",[t._v("¿No tienes una cuenta?")]),a("router-link",{attrs:{to:"/createaccount"}},[a("h4",{staticClass:"btn createAccount"},[t._v("Crear Cuenta")])])],1)],1)]}}])})],1)])},n=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"rightView"},[a("div",[a("h1",[t._v("Pen & Paper")]),a("h5",[t._v("Unete a una sala, comparte documentos y envia mensajes a tu equipo de trabajo.")]),a("img",{attrs:{src:r("4ed2"),alt:""}})])])}],s=r("1da1"),i=r("5530"),o=(r("96cf"),r("2f62")),l=r("7bb1"),c=r("933f"),u=r("ffcc"),d={name:"Login",components:{CustomButton:c["a"],CustomInput:u["a"],ValidationObserver:l["a"]},data:function(){return{loginForm:{email:"",password:""}}},methods:Object(i["a"])(Object(i["a"])({},Object(o["c"])(["setAlert"])),{},{loginWithGoogle:function(){this.$store.dispatch("loginWithGoogle")},login:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.$store.dispatch("login",{email:t.loginForm.email,password:t.loginForm.password});case 3:t.setAlert({state:"success",message:"Ha iniciado sesion"}),e.next=9;break;case 6:e.prev=6,e.t0=e["catch"](0),t.setErrorMessage(e.t0);case 9:case"end":return e.stop()}}),e,null,[[0,6]])})))()},setErrorMessage:function(t){switch(t.code){case"auth/wrong-password":this.$refs.form.setErrors({password:["La contraseña ingresada es incorrecta."]});break;case"auth/user-not-found":this.$refs.form.setErrors({email:["El usuario ingresado no fue encontrado."]});break;default:this.$refs.form.setErrors({password:["Ocurrio un error, por favor inténtalo de nuevo."]});break}}})},f=d,p=(r("8bd7"),r("2877")),b=Object(p["a"])(f,a,n,!1,null,"80c54772",null);e["default"]=b.exports},aad4:function(t,e,r){},e0a2:function(t,e,r){},fc27:function(t,e,r){"use strict";r("52d8")},ffcc:function(t,e,r){"use strict";var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("ValidationProvider",{staticClass:"input",class:{"input--invalid":t.failedValidation},attrs:{tag:"div",name:t.name||t.label,rules:t.rules,vid:t.vid},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.errors,n=e.required;return[r("div",{staticClass:"input__info"},[t.label?r("label",{staticClass:"label",class:{error:a[0]},attrs:{for:t.id}},[r("span",[t._v(t._s(t.label))]),r("span",[t._v(" "+t._s(n?"*":"")+" ")])]):t._e(),a[0]?r("span",{staticClass:"message",class:{error:a[0]}},[t._t("error-message",[t._v("- "+t._s(a[0]))])],2):t._e()]),r("input",{staticClass:"input__input",class:{border:t.border,borderReverse:t.borderReverse,"field--invalid":a.length},attrs:{id:t.id,type:t.type,disabled:t.disabled,placeholder:t.placeholder},domProps:{value:t.value},on:{input:function(e){return t.$emit("input",e.target.value)}}}),r("span",{staticClass:"icon"},[t._t("icon")],2)]}}],null,!0)})},n=[],s=r("7bb1"),i={name:"CustomInput",components:{ValidationProvider:s["b"]},props:{label:String,id:String,value:String,placeholder:String,disabled:Boolean,type:String,vid:String,name:{type:String,default:""},rules:{default:"",type:[String,Object]},border:{type:Boolean,required:!1,default:!0},borderReverse:{type:Boolean,required:!1,default:!1},failedValidation:Boolean,required:{default:!1}}},o=i,l=(r("fc27"),r("2877")),c=Object(l["a"])(o,a,n,!1,null,"d99a1e08",null);e["a"]=c.exports}}]);
//# sourceMappingURL=chunk-3bd327c8.4a503ee7.js.map