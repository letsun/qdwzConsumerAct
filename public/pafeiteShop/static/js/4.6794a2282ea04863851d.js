webpackJsonp([4],{"/pLu":function(e,t){},"4LQZ":function(e,t,i){"use strict";var s={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("a",{staticClass:"submit-btn",attrs:{href:"javascript:void(0);"},on:{click:this.emitEvent}},[this._t("default")],2)])},staticRenderFns:[]};var r=i("VU/8")({methods:{emitEvent:function(){this.$emit("clickEvent")}}},s,!1,function(e){i("/pLu")},"data-v-515f7822",null);t.a=r.exports},BHdM:function(e,t){},WTzz:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});i("GQaK");var s=i("OUXH"),r=i("4LQZ"),a=i("wzPG"),o=i("7AG+"),c=i("zZaa"),n=i("N183"),d=i("i5La"),v=i.n(d),l=i("d1wj"),h=i("yt7g"),u=i("CyOZ"),p=i("zSeF"),m={components:{NavHeader:s.a,SubmitBtn:r.a,VuePickers:v.a,ModelWin:a.a,WaitingTip:c.a,LoadingPage:o.a},data:function(){return{imgPath:"https://qdwzvue-1254182596.cos.ap-guangzhou.myqcloud.com/qdwzAct/pafeite/",type:"",query:{},addressList:[],errorTip:"",showModel:!1,isConfirm:!1,okType:"",addressId:"",receiveName:"",receivePhone:"",receiveAddress:"",receiveProvince:"省",receiveCity:"市",receiveArea:"区",isShowArea:!0,isShowCity:!0,showPicker1:!1,showPicker2:!1,showPicker3:!1,isLoadCompleted:!1,isClicked:!1,pickData1:{columns:1,default:{text:"请选择",value:""},pData1:n.a},pickData2:{columns:1,default:{text:"请选择",value:""},pData1:[{text:"请选择",value:""}]},pickData3:{columns:1,default:{text:"请选择",value:""},pData1:[{text:"请选择",value:""}]},isDefault:0}},computed:{getHeaders:function(){return this.$store.getters.getHeaders},mallType:function(){return this.$store.state.mallType}},mounted:function(){var e=this;this.$nextTick(function(){$("body").show(),Object(u.a)(e,e.getHeaders,"-1"),e.type=e.$route.query.type,"add"==e.type||"edit"==e.type&&(e.addressId=e.$route.query.addressId,e.getAddressInfor()),e.$route.query.goodsId&&(e.query.goodsId=e.$route.query.goodsId),e.$route.query.chooseJsonProp&&(e.query.chooseJsonProp=e.$route.query.chooseJsonProp),e.$route.query.amount&&(e.query.amount=e.$route.query.amount),e.$route.query.addressType&&(e.query.addressType=e.$route.query.addressType),e.$route.query.redirectUrl&&(e.query.redirectUrl=e.$route.query.redirectUrl),h.a.commonFunc(e)})},methods:{getAddressInfor:function(){var e=this;this.$http.get(l.a.address.addressList,{headers:this.getHeaders,params:{companyId:this.companyId,consumerId:this.consumerId}}).then(function(t){var i=t.data;if(i.code===p.a.SUCCESS){e.addressList=i.data,e.isLoadCompleted=!0;for(var s=0;s<e.addressList.length;s++)e.addressId==e.addressList[s].id&&(e.receiveName=e.addressList[s].receiveName,e.receivePhone=e.addressList[s].receivePhone,e.receiveProvince=e.addressList[s].receiveProvince,e.receiveCity=e.addressList[s].receiveCity,e.receiveArea=e.addressList[s].receiveArea,e.receiveAddress=e.addressList[s].receiveAddress,e.isDefault=e.addressList[s].isDefault);e.receiveArea?e.isShowArea=!0:e.isShowArea=!1}else h.a.checkStatus(e,i,{},e.getAddressInfor)})},selectProvince:function(){this.inputBlur(),this.showPicker1=!0},selectCity:function(){this.inputBlur(),this.showPicker2=!0},selectArea:function(){this.inputBlur(),this.showPicker3=!0},confirmFn1:function(e){this.showPicker1=!1,void 0!==e.select1.sub?(this.pickData2.pData1=e.select1.sub,this.isShowCity=!0,this.isShowArea=!0):(this.isShowCity=!1,this.isShowArea=!1),this.receiveProvince=e.select1.text,this.receiveCity="市",this.receiveArea="区"},confirmFn2:function(e){this.showPicker2=!1,void 0!==e.select1.sub?(this.pickData3.pData1=e.select1.sub,this.isShowArea=!0):this.isShowArea=!1,this.receiveCity=e.select1.text,this.receiveArea="区"},confirmFn3:function(e){this.showPicker3=!1,this.receiveArea=e.select1.text},closeFn:function(){this.showPicker1=!1,this.showPicker2=!1,this.showPicker3=!1},defaultAddress:function(){0==this.isDefault?this.isDefault=1:this.isDefault=0},submit:function(){return this.inputBlur(),this.receiveName?this.receivePhone?/^1[0-9]{10}$/.test(this.receivePhone)?"省"===this.receiveProvince||"请选择"===this.receiveProvince?(this.showModel=!0,this.isConfirm=!1,void(this.errorTip="收货人省份不能为空")):"市"===this.receiveCity||"请选择"===this.receiveCity?(this.showModel=!0,this.isConfirm=!1,void(this.errorTip="收货人城市不能为空")):!this.isShowArea||"区"!==this.receiveArea&&"请选择"!==this.receiveArea?this.receiveAddress?void this.add(this.type):(this.showModel=!0,this.isConfirm=!1,void(this.errorTip="收货人地址不能为空")):(this.showModel=!0,this.isConfirm=!1,void(this.errorTip="收货人地区不能为空")):(this.showModel=!0,this.isConfirm=!1,void(this.errorTip="收货人电话格式有误")):(this.showModel=!0,this.isConfirm=!1,void(this.errorTip="收货人电话不能为空")):(this.showModel=!0,this.isConfirm=!1,void(this.errorTip="收货人姓名不能为空"))},closeModelWin:function(){this.isConfirm=!1,this.showModel=!1},okModelWin:function(e,t){e(t)},add:function(e){var t=this,i="",s={receiveName:this.receiveName,receivePhone:this.receivePhone,receiveProvince:this.receiveProvince,receiveCity:this.receiveCity,receiveAddress:this.receiveAddress,isDefault:this.isDefault};"区"===this.receiveArea||"请选择"===this.receiveArea?s.receiveArea="":s.receiveArea=this.receiveArea,"add"==e?i=l.a.address.addAddress:"edit"==e&&(i=l.a.address.upReceive,s.receiveId=this.$route.query.addressId),this.isClicked=!0,this.$http.get(i,{headers:this.getHeaders,params:s}).then(function(i){var s=i.data;if(s.code===p.a.SUCCESS){t.showModel=!0,t.isConfirm=!1,t.errorTip=s.msg,t.isClicked=!0,t.query.id=s.data.id?s.data.id:s.data;h.a.getPath();console.log(t.query.addressType),1==t.query.addressType?t.$router.push({path:"/createOrder",query:t.query}):t.$router.push({path:"/address",query:t.query})}else h.a.checkStatus(t,s,{},t.add,e)})},inputBlur:function(){for(var e=this.$refs.formList.getElementsByTagName("input"),t=0,i=e.length;t<i;t++)e[t].blur()}}},f={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{on:{click:e.closeFn}},[i("nav-header",{attrs:{back:"true"}},[i("div",{staticClass:"title",attrs:{slot:"title"},slot:"title"},[e._v(e._s("add"==e.type?"新增地址":"编辑地址"))])]),e._v(" "),i("div",{staticClass:"container"},[i("div",{staticClass:"con"},[i("div",{staticClass:"con-header"},[e._v(e._s("add"==e.type?"添加新收货人":"编辑收货人"))]),e._v(" "),i("div",{staticClass:"scroll-wrapper"},[i("div",{staticClass:"wrapper"},[i("ul",{ref:"formList",staticClass:"form-list"},[i("li",{staticClass:"item"},[i("div",{staticClass:"form-key"},[e._v("收货人")]),e._v(" "),i("div",{staticClass:"form-input"},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.receiveName,expression:"receiveName"}],staticClass:"form-text",attrs:{type:"text",maxlength:"15",placeholder:"请输入收货人姓名"},domProps:{value:e.receiveName},on:{input:function(t){t.target.composing||(e.receiveName=t.target.value)}}})])]),e._v(" "),i("li",{staticClass:"item"},[i("div",{staticClass:"form-key"},[e._v("手机号码")]),e._v(" "),i("div",{staticClass:"form-input"},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.receivePhone,expression:"receivePhone"}],staticClass:"form-text",attrs:{type:"text",maxlength:"11",placeholder:"请输入收货人手机号码"},domProps:{value:e.receivePhone},on:{input:function(t){t.target.composing||(e.receivePhone=t.target.value)}}})])]),e._v(" "),i("li",{staticClass:"item"},[i("div",{staticClass:"form-key"},[e._v("省市区")]),e._v(" "),i("div",{staticClass:"form-input"},[i("span",{staticClass:"text",class:{active:"省"!=e.receiveProvince&&"请选择"!=e.receiveProvince},on:{click:function(t){return t.stopPropagation(),e.selectProvince(t)}}},[e._v(e._s(e.receiveProvince)+"  "),i("img",{attrs:{src:e.imgPath+"14_8.png"}})]),e._v(" "),i("span",{staticClass:"text",class:{active:"市"!=e.receiveCity&&"请选择"!=e.receiveCity},on:{click:function(t){return t.stopPropagation(),e.selectCity(t)}}},[e._v(e._s(e.receiveCity)+"  "),i("img",{attrs:{src:e.imgPath+"14_8.png"}})]),e._v(" "),i("span",{staticClass:"text",class:{active:"区"!=e.receiveArea&&"请选择"!=e.receiveArea},on:{click:function(t){return t.stopPropagation(),e.selectArea(t)}}},[e._v(e._s(e.receiveArea)+"  "),i("img",{attrs:{src:e.imgPath+"14_8.png"}})])])]),e._v(" "),i("li",{staticClass:"item"},[i("div",{staticClass:"form-key"},[e._v("详细地址")]),e._v(" "),i("div",{staticClass:"form-input"},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.receiveAddress,expression:"receiveAddress"}],staticClass:"form-text",attrs:{type:"text",placeholder:"请输入收货人街道门牌等信息"},domProps:{value:e.receiveAddress},on:{input:function(t){t.target.composing||(e.receiveAddress=t.target.value)}}})])]),e._v(" "),i("li",{staticClass:"item"},[i("div",{staticClass:"form-input"},[i("div",{staticClass:"radio-group"},[i("div",{staticClass:"radio",on:{click:function(t){e.defaultAddress()}}},[1==e.isDefault?i("img",{staticClass:"icon",attrs:{src:e.imgPath+"14_1.png"}}):i("img",{staticClass:"icon",attrs:{src:e.imgPath+"14_2.png"}}),e._v(" "),i("span",{staticClass:"label"},[e._v("设为默认地址")])])])])])])]),e._v(" "),i("div",{staticClass:"submit-btn",on:{click:e.submit}},[e._v("保存地址")])])])]),e._v(" "),i("vue-pickers",{attrs:{show:e.showPicker1,selectData:e.pickData1},on:{cancel:e.closeFn,confirm:e.confirmFn1}}),e._v(" "),i("vue-pickers",{attrs:{show:e.showPicker2,selectData:e.pickData2},on:{cancel:e.closeFn,confirm:e.confirmFn2}}),e._v(" "),i("vue-pickers",{attrs:{show:e.showPicker3,selectData:e.pickData3},on:{cancel:e.closeFn,confirm:e.confirmFn3}}),e._v(" "),i("transition",{attrs:{name:"fade"}},[i("waiting-tip",{directives:[{name:"show",rawName:"v-show",value:e.isClicked,expression:"isClicked"}]})],1),e._v(" "),i("model-win",{attrs:{show:e.showModel}},[i("template",{slot:"content"},[e._v(e._s(e.errorTip))]),e._v(" "),i("template",{slot:"btn"},[e.isConfirm?[i("a",{staticClass:"btn",attrs:{href:"javascript:void(0);"},on:{click:e.closeModelWin}},[e._v("取消")]),e._v(" "),i("a",{staticClass:"btn btn-last",attrs:{href:"javascript:void(0);"},on:{click:function(t){e.okModelWin(e.okType,e.param)}}},[e._v("确定")])]:[i("a",{staticClass:"btn",attrs:{href:"javascript:void(0);"},on:{click:e.closeModelWin}},[e._v("确定")])]],2)],2),e._v(" "),i("transition",{attrs:{name:"fade"}},["edit"!==e.$route.query.type||e.isLoadCompleted?e._e():i("loading-page")],1)],1)},staticRenderFns:[]};var C=i("VU/8")(m,f,!1,function(e){i("BHdM")},"data-v-ec0234d2",null);t.default=C.exports}});