(this.webpackJsonpapp=this.webpackJsonpapp||[]).push([[10],{441:function(e,t,n){},446:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var a=[{value:"KCNTT",label:"Vi\u1ec7n C\xf4ng ngh\u1ec7 th\xf4ng tin & Truy\u1ec1n th\xf4ng"},{value:"KCK",label:"Vi\u1ec7n C\u01a1 kh\xed"},{value:"VCKDL",label:"Vi\u1ec7n C\u01a1 kh\xed \u0110\u1ed9ng l\u1ef1c"},{value:"KD",label:"Vi\u1ec7n \u0110i\u1ec7n - \u0110i\u1ec7n t\u1eed"},{value:"VCNSHVTP",label:"Vi\xean C\xf4ng ngh\u1ec7 Sinh h\u1ecdc & C\xf4ng ngh\u1ec7 Th\u1ef1c ph\u1ea9m"},{value:"KCNHH",label:"Vi\u1ec7n K\u1ef9 thu\u1eadt H\xf3a h\u1ecdc"},{value:"BGDTC",label:"Khoa Gi\xe1o D\u1ee5c Th\u1ec3 Ch\u1ea5t"},{value:"VVLKT",label:"Vi\u1ec7n V\u1eadt L\xfd K\u1ef9 Thu\u1eadt"},{value:"KKHVCNVL",label:"Vi\u1ec7n Khoa h\u1ecdc & K\u1ef9 thu\u1eadt V\u1eadt Li\u1ec7u"},{value:"KKTVQL",label:"Vi\u1ec7n Kinh t\u1ebf & Qu\u1ea3n l\xfd"},{value:"KTTD",label:"Vi\u1ec7n To\xe1n tin & \u1ee8ng d\u1ee5ng"},{value:"KSPKT",label:"Vi\u1ec7n S\u01b0 ph\u1ea1m K\u1ef9 thu\u1eadt"},{value:"KNN",label:"Khoa Ng\xf4n Ng\u1eef"},{value:"KCNDMVTT",label:"Vi\u1ec7n D\u1ec7t may - Da gi\u1ea7y & Th\u1eddi trang"},{value:"KML",label:"Khoa L\xfd lu\u1eadn ch\xednh tr\u1ecb"},{value:"VDTLT",label:"Vi\u1ec7n \u0110\xe0o t\u1ea1o Li\xean t\u1ee5c"},{value:"VMICA",label:"Vi\u1ec7n Nghi\xean c\u1ee9u qu\u1ed1c t\u1ebf MICA"},{value:"KDTVT",label:"Vi\u1ec7n \u0110i\xean t\u1eed vi\u1ec5n th\xf4ng"},{value:"VKHVCNMT",label:"Vi\u1ec7n Khoa h\u1ecdc v\xe0 C\xf4ng ngh\u1ec7 M\xf4i tr\u01b0\u1eddng"},{value:"VKHVCNNL",label:"Vi\u1ec7n Khoa h\u1ecdc & C\xf4ng Ngh\u1ec7 Nhi\u1ec7t L\u1ea1nh"},{value:"KGDQP",label:"Khoa Gi\xe1o d\u1ee5c Qu\u1ed1c ph\xf2ng"}]},458:function(e,t,n){"use strict";var a=n(3),c=n(31),s=n(2),i=n(0),l=(n(5),n(4)),r=n(7),o=n(362),d=n(94),h=n(15),b=n(136),u=n(17),j="undefined"===typeof window?i.useEffect:i.useLayoutEffect,m=i.forwardRef((function(e,t){var n=e.alignItems,c=void 0===n?"center":n,r=e.autoFocus,m=void 0!==r&&r,p=e.button,g=void 0!==p&&p,v=e.children,O=e.classes,x=e.className,f=e.component,N=e.ContainerComponent,y=void 0===N?"li":N,C=e.ContainerProps,T=(C=void 0===C?{}:C).className,V=Object(a.a)(C,["className"]),K=e.dense,I=void 0!==K&&K,w=e.disabled,k=void 0!==w&&w,S=e.disableGutters,L=void 0!==S&&S,E=e.divider,D=void 0!==E&&E,M=e.focusVisibleClassName,A=e.selected,W=void 0!==A&&A,H=Object(a.a)(e,["alignItems","autoFocus","button","children","classes","className","component","ContainerComponent","ContainerProps","dense","disabled","disableGutters","divider","focusVisibleClassName","selected"]),z=i.useContext(b.a),G={dense:I||z.dense||!1,alignItems:c},P=i.useRef(null);j((function(){m&&P.current&&P.current.focus()}),[m]);var R=i.Children.toArray(v),q=R.length&&Object(d.a)(R[R.length-1],["ListItemSecondaryAction"]),B=i.useCallback((function(e){P.current=u.findDOMNode(e)}),[]),Q=Object(h.a)(B,t),F=Object(s.a)({className:Object(l.a)(O.root,x,G.dense&&O.dense,!L&&O.gutters,D&&O.divider,k&&O.disabled,g&&O.button,"center"!==c&&O.alignItemsFlexStart,q&&O.secondaryAction,W&&O.selected),disabled:k},H),$=f||"li";return g&&(F.component=f||"div",F.focusVisibleClassName=Object(l.a)(O.focusVisible,M),$=o.a),q?($=F.component||f?$:"div","li"===y&&("li"===$?$="div":"li"===F.component&&(F.component="div")),i.createElement(b.a.Provider,{value:G},i.createElement(y,Object(s.a)({className:Object(l.a)(O.container,T),ref:Q},V),i.createElement($,F,R),R.pop()))):i.createElement(b.a.Provider,{value:G},i.createElement($,Object(s.a)({ref:Q},F),R))})),p=Object(r.a)((function(e){return{root:{display:"flex",justifyContent:"flex-start",alignItems:"center",position:"relative",textDecoration:"none",width:"100%",boxSizing:"border-box",textAlign:"left",paddingTop:8,paddingBottom:8,"&$focusVisible":{backgroundColor:e.palette.action.selected},"&$selected, &$selected:hover":{backgroundColor:e.palette.action.selected},"&$disabled":{opacity:.5}},container:{position:"relative"},focusVisible:{},dense:{paddingTop:4,paddingBottom:4},alignItemsFlexStart:{alignItems:"flex-start"},disabled:{},divider:{borderBottom:"1px solid ".concat(e.palette.divider),backgroundClip:"padding-box"},gutters:{paddingLeft:16,paddingRight:16},button:{transition:e.transitions.create("background-color",{duration:e.transitions.duration.shortest}),"&:hover":{textDecoration:"none",backgroundColor:e.palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}}},secondaryAction:{paddingRight:48},selected:{}}}),{name:"MuiListItem"})(m),g=i.forwardRef((function(e,t){var n,c=e.classes,r=e.className,o=e.component,d=void 0===o?"li":o,h=e.disableGutters,b=void 0!==h&&h,u=e.ListItemClasses,j=e.role,m=void 0===j?"menuitem":j,g=e.selected,v=e.tabIndex,O=Object(a.a)(e,["classes","className","component","disableGutters","ListItemClasses","role","selected","tabIndex"]);return e.disabled||(n=void 0!==v?v:-1),i.createElement(p,Object(s.a)({button:!0,role:m,tabIndex:n,component:d,selected:g,disableGutters:b,classes:Object(s.a)({dense:c.dense},u),className:Object(l.a)(c.root,r,g&&c.selected,!b&&c.gutters),ref:t},O))}));t.a=Object(r.a)((function(e){return{root:Object(s.a)({},e.typography.body1,Object(c.a)({minHeight:48,paddingTop:6,paddingBottom:6,boxSizing:"border-box",width:"auto",overflow:"hidden",whiteSpace:"nowrap"},e.breakpoints.up("sm"),{minHeight:"auto"})),gutters:{},selected:{},dense:Object(s.a)({},e.typography.body2,{minHeight:"auto"})}}),{name:"MuiMenuItem"})(g)},465:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var a=[{value:65,label:"Kh\xf3a 65"},{value:64,label:"Kh\xf3a 64"},{value:63,label:"Kh\xf3a 63"},{value:62,label:"Kh\xf3a 62"},{value:61,label:"Kh\xf3a 61 v\xea tr\u01b0\u1edbc"}]},487:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var a=[{value:"ROLE_ADMIN",label:"Qu\u1ea3n l\xfd t\xe0i kho\u1ea3n"},{value:"ROLE_STUDENT",label:"Sinh vi\xean"},{value:"ROLE_TM",label:"Qu\u1ea3n l\xfd h\u1ecdc ph\u1ea7n"}]},783:function(e,t,n){"use strict";n.r(t);var a=n(12),c=n(9),s=n.n(c),i=n(20),l=n(16),r=n(38),o=n(70),d=n(416),h=n(458),b=n(422),u=n(410),j=n(418),m=n(409),p=n(56),g=n(0),v=n(37),O=n(25),x=n(26),f=n(57),N=n(71),y=[{malophoc:"111",mahocphan:"IT4444",tenhocphan:"Ph\xe2n t\xedch v\xe0 thi\u1ebft k\u1ebf h\u1ec7 th\u1ed1ng th\xf4ng tin",phonghoc:"TC401",sotinchi:3,max:200},{malophoc:"222",mahocphan:"IT5555",tenhocphan:"Project3",phonghoc:"TC401",sotinchi:2,max:200},{malophoc:"333",mahocphan:"IT6666",tenhocphan:"T\xedch h\u1ee3p d\u1eef li\u1ec7u",phonghoc:"TC402",sotinchi:2,max:200},{malophoc:"444",mahocphan:"IT7777",tenhocphan:"Big data",phonghoc:"TC401",sotinchi:2,max:200}],C=n(446),T=n(487),V=n(465),K=(n(83),n(441),n(1));t.default=function(e){var t=Object(O.h)().Id,n=Object(g.useState)(N.b),c=Object(l.a)(n,2),I=c[0],w=c[1],k=Object(g.useState)(N.f),S=Object(l.a)(k,2),L=S[0],E=S[1],D=Object(g.useState)(N.d),M=Object(l.a)(D,2),A=M[0],W=M[1],H=Object(g.useState)(N.e),z=Object(l.a)(H,2),G=z[0],P=z[1],R=Object(g.useState)(""),q=Object(l.a)(R,2),B=q[0],Q=q[1],F=Object(p.b)().enqueueSnackbar,$=x.b().shape({email:x.d().required("please enter your email").email("please enter a valid"),Id:x.d().required("please enter your Id"),fullname:x.d().required("please enter your fullname"),address:x.d().required("please enter your address"),phone:x.d().required("please enter your phone"),birthday:x.d().required("please enter your birthday"),cmnd:x.d().required("please enter your cmnd")}),_=Object(v.d)({defaultValues:{Id:"",fullname:"",email:"",address:"",phone:"",gender:N.b,role:N.d,cmnd:"",schoolId:N.f,schoolyear:N.e,program:"",maxcredit:0,status:0},resolver:Object(o.a)($)}),J=_.register,U=_.handleSubmit,X=_.setValue,Y=_.formState.errors;Object(g.useEffect)((function(){var e=function(){var e=Object(i.a)(s.a.mark((function e(){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:X("Id",B.Id),X("fullname",B.fullname),X("email",B.email),X("address",B.address),X("phone",B.phone),X("birthday","".concat(B.birthday).slice(0,10)),X("gender",B.gender),w(B.gender),X("role",B.role),W(B.role),X("cmnd",B.cmnd),X("schoolId",B.schoolId),E(B.schoolId),X("program",B.program),X("schoolyear",B.schoolyear),P(B.schoolyear),X("maxcredit",B.maxcredit),X("status",B.status);case 18:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();e()}),[X,B]),Object(g.useEffect)((function(){var e=function(){var e=Object(i.a)(s.a.mark((function e(){var n,a;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={Id:t},e.next=3,f.a.get(n);case 3:a=e.sent,Q(a.accounts[0]);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();e()}),[t]);var Z=function(){var e=Object(i.a)(s.a.mark((function e(n){var a;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,a={Id:t},n.password="",e.next=5,f.a.update(n,a);case 5:F("Success",{variant:"success"}),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),F("Error",{variant:"error"});case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(t){return e.apply(this,arguments)}}(),ee=function(){var e=Object(i.a)(s.a.mark((function e(){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,f.a.lock(t);case 3:window.location.reload(),F("Success",{variant:"success"}),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),F("Error",{variant:"error"});case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}(),te=function(){var e=Object(i.a)(s.a.mark((function e(){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,f.a.unlock(t);case 3:window.location.reload(),F("Success",{variant:"success"}),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),F("Error",{variant:"error"});case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}();return Object(K.jsxs)("div",{className:"thongtincanhan",children:[Object(K.jsxs)("div",{className:"thongtincanhan-content",children:[Object(K.jsxs)("form",{onSubmit:U(Z),children:[Object(K.jsx)("p",{className:"thongtincanhan-title",children:"Th\xf4ng tin c\xe1 nh\xe2n"}),Object(K.jsx)("hr",{style:{opacity:"0.3",width:"100%"}}),Object(K.jsx)("br",{}),Object(K.jsxs)("div",{className:"thongtincanhan-contents",children:[Object(K.jsx)("div",{className:"thongtincanhan-contents-label",children:"M\xe3 s\u1ed1 :"}),Object(K.jsxs)("div",{className:"thongtincanhan-contents-input",children:[Object(K.jsx)(d.a,Object(a.a)(Object(a.a)({},J("Id")),{},{name:"Id",className:"outlined-basic",variant:"outlined",margin:"dense",fullWidth:!0,placeholder:"Ch\u01b0a c\u1eadp nh\u1eadt",disabled:!0})),Object(K.jsx)("p",{style:{color:"red",fontSize:"12px",textAlign:"left"},children:Object(K.jsx)(r.a,{errors:Y,name:"Id"})})]})]}),Object(K.jsxs)("div",{className:"thongtincanhan-contents",children:[Object(K.jsx)("div",{className:"thongtincanhan-contents-label",children:"H\u1ecd v\xe0 t\xean :"}),Object(K.jsxs)("div",{className:"thongtincanhan-contents-input",children:[Object(K.jsx)(d.a,Object(a.a)(Object(a.a)({},J("fullname")),{},{name:"fullname",className:"outlined-basic",variant:"outlined",margin:"dense",fullWidth:!0,placeholder:"Ch\u01b0a c\u1eadp nh\u1eadt"})),Object(K.jsx)("p",{style:{color:"red",fontSize:"12px",textAlign:"left"},children:Object(K.jsx)(r.a,{errors:Y,name:"fullname"})})]})]}),Object(K.jsxs)("div",{className:"thongtincanhan-contents",children:[Object(K.jsx)("div",{className:"thongtincanhan-contents-label",children:"Email :"}),Object(K.jsxs)("div",{className:"thongtincanhan-contents-input",children:[Object(K.jsx)(d.a,Object(a.a)(Object(a.a)({},J("email")),{},{name:"email",className:"outlined-basic",variant:"outlined",margin:"dense",fullWidth:!0,placeholder:"Ch\u01b0a c\u1eadp nh\u1eadt"})),Object(K.jsx)("p",{style:{color:"red",fontSize:"12px",textAlign:"left"},children:Object(K.jsx)(r.a,{errors:Y,name:"email"})})]})]}),Object(K.jsxs)("div",{className:"thongtincanhan-contents",children:[Object(K.jsx)("div",{className:"thongtincanhan-contents-label",children:"Ng\xe0y sinh :"}),Object(K.jsxs)("div",{className:"thongtincanhan-contents-input",children:[Object(K.jsx)(d.a,Object(a.a)(Object(a.a)({},J("birthday")),{},{name:"birthday",className:"outlined-basic",variant:"outlined",margin:"dense",fullWidth:!0,type:"date"})),Object(K.jsx)("p",{style:{color:"red",fontSize:"12px",textAlign:"left"},children:Object(K.jsx)(r.a,{errors:Y,name:"birthday"})})]})]}),Object(K.jsxs)("div",{className:"thongtincanhan-contents",children:[Object(K.jsx)("div",{className:"thongtincanhan-contents-label",children:"\u0110\u1ecba ch\u1ec9 :"}),Object(K.jsxs)("div",{className:"thongtincanhan-contents-input",children:[Object(K.jsx)(d.a,Object(a.a)(Object(a.a)({},J("address")),{},{name:"address",className:"outlined-basic",variant:"outlined",margin:"dense",placeholder:"Ch\u01b0a c\u1eadp nh\u1eadt",fullWidth:!0})),Object(K.jsx)("p",{style:{color:"red",fontSize:"12px",textAlign:"left"},children:Object(K.jsx)(r.a,{errors:Y,name:"address"})})]})]}),Object(K.jsxs)("div",{className:"thongtincanhan-contents",children:[Object(K.jsx)("div",{className:"thongtincanhan-contents-label",children:"S\u1ed1 \u0111i\u1ec7n tho\u1ea1i :"}),Object(K.jsxs)("div",{className:"thongtincanhan-contents-input",children:[Object(K.jsx)(d.a,Object(a.a)(Object(a.a)({},J("phone")),{},{name:"phone",className:"outlined-basic",variant:"outlined",margin:"dense",fullWidth:!0,placeholder:"Ch\u01b0a c\u1eadp nh\u1eadt",type:"number"})),Object(K.jsx)("p",{style:{color:"red",fontSize:"12px",textAlign:"left"},children:Object(K.jsx)(r.a,{errors:Y,name:"phone"})})]})]}),Object(K.jsxs)("div",{className:"thongtincanhan-contents",children:[Object(K.jsx)("div",{className:"thongtincanhan-contents-label",children:"Lo\u1ea1i t\xe0i kho\u1ea3n :"}),Object(K.jsxs)("div",{className:"thongtincanhan-contents-input",children:[Object(K.jsx)(d.a,Object(a.a)(Object(a.a)({},J("role")),{},{name:"role",className:"outlined-basic",variant:"outlined",margin:"dense",fullWidth:!0,select:!0,value:A,onChange:function(e){W(e.target.value)},children:T.a.map((function(e){return Object(K.jsx)(h.a,{value:e.value,children:e.label},e.value)}))})),Object(K.jsx)("p",{style:{color:"red",fontSize:"12px",textAlign:"left"},children:Object(K.jsx)(r.a,{errors:Y,name:"role"})})]})]}),Object(K.jsx)("hr",{style:{opacity:"0.3",width:"100%"}}),Object(K.jsx)("br",{}),Object(K.jsxs)("div",{className:"thongtincanhan-contents",children:[Object(K.jsx)("div",{className:"thongtincanhan-contents-label",children:"S\u1ed1 CMT/CCCD:"}),Object(K.jsxs)("div",{className:"thongtincanhan-contents-input",children:[Object(K.jsx)(d.a,Object(a.a)(Object(a.a)({},J("cmnd")),{},{name:"cmnd",className:"outlined-basic",variant:"outlined",margin:"dense",fullWidth:!0,placeholder:"Ch\u01b0a c\u1eadp nh\u1eadt",type:"number"})),Object(K.jsx)("p",{style:{color:"red",fontSize:"12px",textAlign:"left"},children:Object(K.jsx)(r.a,{errors:Y,name:"cmnd"})})]})]}),Object(K.jsxs)("div",{className:"thongtincanhan-contents",children:[Object(K.jsx)("div",{className:"thongtincanhan-contents-label",children:"Ch\u01b0\u01a1ng tr\xecnh :"}),Object(K.jsx)("div",{className:"thongtincanhan-contents-input",children:Object(K.jsx)(d.a,Object(a.a)(Object(a.a)({},J("program")),{},{name:"program",className:"outlined-basic",variant:"outlined",margin:"dense",fullWidth:!0,placeholder:"Ch\u01b0a c\u1eadp nh\u1eadt"}))})]}),Object(K.jsx)("p",{}),Object(K.jsxs)("div",{className:"thongtincanhan-contents",children:[Object(K.jsx)("div",{className:"thongtincanhan-contents-label",children:"Kho\xe1 h\u1ecdc :"}),Object(K.jsx)("div",{className:"thongtincanhan-contents-input",children:Object(K.jsx)(d.a,Object(a.a)(Object(a.a)({},J("schoolyear")),{},{name:"schoolyear",className:"outlined-basic",variant:"outlined",margin:"dense",fullWidth:!0,select:!0,value:G,onChange:function(e){P(e.target.value)},children:V.a.map((function(e){return Object(K.jsx)(h.a,{value:e.value,children:e.label},e.value)}))}))})]}),Object(K.jsx)("p",{}),Object(K.jsxs)("div",{className:"thongtincanhan-contents",children:[Object(K.jsx)("div",{className:"thongtincanhan-contents-label",children:"Khoa/Vi\u1ec7n :"}),Object(K.jsx)("div",{className:"thongtincanhan-contents-input",children:Object(K.jsx)(d.a,Object(a.a)(Object(a.a)({},J("schoolId")),{},{name:"schoolId",className:"outlined-basic",variant:"outlined",margin:"dense",fullWidth:!0,select:!0,value:L,onChange:function(e){E(e.target.value)},children:C.a.map((function(e){return Object(K.jsx)(h.a,{value:e.value,children:e.label},e.value)}))}))})]}),Object(K.jsx)("p",{}),Object(K.jsxs)("div",{className:"thongtincanhan-contents",children:[Object(K.jsx)("div",{className:"thongtincanhan-contents-label",children:"T\xedn ch\u1ec9 t\u1ed1i \u0111a :"}),Object(K.jsx)("div",{className:"thongtincanhan-contents-input",children:Object(K.jsx)(d.a,Object(a.a)(Object(a.a)({},J("maxcredit")),{},{name:"maxcredit",className:"outlined-basic",variant:"outlined",margin:"dense",fullWidth:!0,type:"number",placeholder:"Ch\u01b0a c\u1eadp nh\u1eadt"}))})]}),Object(K.jsx)("p",{}),Object(K.jsxs)("div",{className:"thongtincanhan-contents",children:[Object(K.jsx)("div",{className:"thongtincanhan-contents-label",children:"Gi\u1edbi t\xednh:"}),Object(K.jsx)("div",{className:"thongtincanhan-contents-input",children:Object(K.jsxs)(b.a,{row:!0,"aria-label":"gender",name:"row-radio-buttons-group",style:{marginTop:"5px"},onChange:function(e){w(e.target.value)},value:I,children:[Object(K.jsx)(u.a,Object(a.a)(Object(a.a)({},J("gender")),{},{value:"nam",control:Object(K.jsx)(j.a,{}),label:"Nam"})),Object(K.jsx)(u.a,Object(a.a)(Object(a.a)({},J("gender")),{},{value:"nu",control:Object(K.jsx)(j.a,{}),label:"N\u1eef"}))]})})]}),Object(K.jsx)("p",{}),Object(K.jsx)("div",{className:"thongtincanhan-contents",children:Object(K.jsx)(m.a,{style:{width:"250px",marginTop:"40px",marginLeft:"0px",fontWeight:"400",background:"rgb(235, 43, 43)",color:"white"},variant:"contained",type:"submit",children:"C\u1eadp nh\u1eadt th\xf4ng tin"})})]}),1===B.status&&Object(K.jsx)(m.a,{style:{width:"250px",float:"right",marginTop:"-35px",marginRight:"12px",fontWeight:"400",background:"rgb(235, 43, 43)",color:"white"},variant:"contained",onClick:ee,children:"Kh\xf3a t\xe0i kho\u1ea3n"}),0===B.status&&Object(K.jsx)(m.a,{style:{width:"250px",float:"right",marginTop:"-35px",marginRight:"12px",fontWeight:"400",background:"rgb(235, 43, 43)",color:"white"},variant:"contained",onClick:te,children:"M\u1edf kh\xf3a t\xe0i kho\u1ea3n"})]}),Object(K.jsxs)("div",{className:"thongtindangkisv-bottom",children:[Object(K.jsx)("hr",{style:{width:"100%",marginTop:"5%"}}),Object(K.jsx)("p",{className:"thongtincanhan-title",children:"Th\xf4ng tin \u0111\u0103ng k\xed"}),Object(K.jsx)("div",{className:"table-dangki",children:Object(K.jsxs)("table",{style:{width:"100%",padding:"10px"},children:[Object(K.jsxs)("tr",{children:[Object(K.jsx)("th",{children:"STT"}),Object(K.jsx)("th",{children:"M\xe3 l\u1edbp h\u1ecdc"}),Object(K.jsx)("th",{children:"M\xe3 h\u1ecdc ph\u1ea7n"}),Object(K.jsx)("th",{children:"T\xean h\u1ecdc ph\u1ea7n"}),Object(K.jsx)("th",{children:"Ph\xf2ng h\u1ecdc"}),Object(K.jsx)("th",{children:"S\u1ed1 t\xedn ch\u1ec9"})]}),y.map((function(e,t){return Object(K.jsxs)("tr",{children:[Object(K.jsx)("td",{children:t}),Object(K.jsx)("td",{children:e.malophoc}),Object(K.jsx)("td",{children:e.mahocphan}),Object(K.jsx)("td",{className:"td-tenhocphan",children:e.tenhocphan}),Object(K.jsx)("td",{children:e.phonghoc}),Object(K.jsx)("td",{children:e.sotinchi})]},t)}))]})})]})]})}}}]);
//# sourceMappingURL=10.91b5ffdd.chunk.js.map