webpackJsonp([11],{DEQX:function(t,e){},"Dx/0":function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s("GQaK"),a=s("OUXH"),r=s("d1wj"),d=s("yt7g"),o=s("CyOZ"),c=(s("kDL6"),s("zSeF")),n={components:{NavHeader:a.a},data:function(){return{imgPath:"http://ywymprod.oss-cn-shenzhen.aliyuncs.com/tongyi/",goodsName:"",goodsType:"",phoneno:"",phoneno2:"",receiveWay:"",sysActivityId:"",orderId:"",orderDetail:{}}},computed:{getHeaders:function(){return this.$store.getters.getHeaders}},mounted:function(){var t=this;this.$nextTick(function(){$("body").show(),Object(o.a)(t,t.getHeaders,"-1"),t.$route.query.orderId&&(t.orderId=t.$route.query.orderId),t.initOrderList(),t.initScroll(),d.a.commonFunc(t)})},methods:{initScroll:function(){new i.a(this.$refs.scrollWrapper,{click:!0})},backHome:function(){this.$router.push({path:"/index"})},initOrderList:function(){var t=this,e=this;this.$http.get(r.a.order.getOrderById,{headers:this.getHeaders,params:{orderId:this.orderId}}).then(function(s){var i=s.data;i.code===c.a.SUCCESS&&(t.orderDetail=i.data.orderList[0].orderItem[0],$("#code").qrcode({render:"canvas",text:e.orderDetail.couponCode,width:"212",height:"212",background:"#ffffff",foreground:"#000000"}))})}}},l={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("nav-header",{attrs:{back:"true"}},[s("div",{staticClass:"title",attrs:{slot:"title"},slot:"title"},[t._v("订单详情")])]),t._v(" "),s("div",{ref:"scrollWrapper",staticClass:"scroll-wrapper"},[s("div",{staticClass:"wrapper"},[s("div",{staticClass:"info"},[s("div",{staticClass:"list"},[s("div",{staticClass:"item"},[s("div",{staticClass:"item-key"},[t._v("名       称")]),t._v(" "),s("div",{staticClass:"item-val"},[t._v(t._s(t.orderDetail.goodsName))])]),t._v(" "),s("div",{staticClass:"item"},[s("div",{staticClass:"item-key"},[t._v("使用期限")]),t._v(" "),s("div",{staticClass:"item-val"},[t._v(t._s(t.orderDetail.dateTime))])]),t._v(" "),s("div",{staticClass:"item"},[s("div",{staticClass:"item-key"},[t._v("门票号码")]),t._v(" "),s("div",{staticClass:"item-val"},[t._v(t._s(t.orderDetail.couponCode))])]),t._v(" "),s("div",{staticClass:"item"},[s("div",{staticClass:"item-key"},[t._v("使用规则")]),t._v(" "),s("div",{staticClass:"item-val"},[t._v(t._s(t.orderDetail.ruleDesc))])])]),t._v(" "),t._m(0)])])])],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"code-wra"},[e("div",{staticClass:"code",attrs:{id:"code"}}),this._v(" "),e("div",{staticClass:"code-tip"},[this._v("(门票信息二维码)")])])}]};var v=s("VU/8")(n,l,!1,function(t){s("DEQX")},"data-v-9a61645a",null);e.default=v.exports}});