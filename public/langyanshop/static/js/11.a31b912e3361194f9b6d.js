webpackJsonp([11],{nzqg:function(t,s,i){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a=i("//Fk"),e=i.n(a),r=i("Gu7T"),o=i.n(r),n=i("GQaK"),c=i("OUXH"),l=i("RoWd"),d=i("7AG+"),u=i("wzPG"),v=i("lN47"),p=i("zZaa"),h=i("d1wj"),_=i("yt7g"),m=(i("CyOZ"),i("zSeF")),g={components:{NavHeader:c.a,LoadingTip:l.a,LoadingPage:d.a,ModelWin:u.a,ProList:v.a,WaitingTip:p.a},data:function(){return{navlist:["全部","待收货","已完成"],navindex:0,orderList:"",scroll:null,pageNum:8,pageSize:1,hasNext:!0,loadingTip:"上滑加载更多",isLoadCompleted:!1,errorTip:"",showModel:!1,isConfirm:!1,okType:"",status:"",isSubmitShow:!1,userName:"",phoneno:"",idCard:"",verCode:"",countdown:!0,countdownTime:60,timer:null,goodsType:"",receiveWay:"",index:"",isClicked:!1,isClick:!0,oredermask:!1,imgPath:"https://qdwzvue-1254182596.cos.ap-guangzhou.myqcloud.com/qdwzAct/langyanFw/"}},mounted:function(){var t=this;this.$nextTick(function(){$("body").show(),t.$route.query.status&&(t.status=t.$route.query.status),t.$route.query.type&&(t.type=t.$route.query.type),t.initOrderList(),t.initScroll()})},computed:{getHeaders:function(){return this.$store.getters.getHeaders}},updated:function(){this.finish()},methods:{initScroll:function(){var t=this;this.scroll=new n.a(this.$refs.scrollWrapper,{scrollbar:{fade:!0},click:!0,pullUpLoad:{threshold:0}}),this.scroll.on("pullingUp",function(){t.hasNext?(t.pageSize++,t.loadingTip="数据正在加载中....",t.initOrderList()):t.loadingTip="已经没有更多了"})},initOrderList:function(){var t=this;this.$http.get(h.a.order.getOrderListByStatus,{params:{status:this.status,pageNum:this.pageNum,pageSize:this.pageSize}}).then(function(s){var i=s.data;i.code===m.a.SUCCESS?(t.hasNext=i.data.hasNext,t.loadingTip="上滑加载更多",t.isLoadCompleted=!0,t.orderList=[].concat(o()(t.orderList),o()(i.data.orderList)),t.isClick=!0):(t.isClick=!0,_.a.checkStatus(t,i,{},t.initOrderList))})},finish:function(){this.scroll.finishPullUp(),this.scroll.refresh()},back:function(){this.$router.push({path:"/person"})},backhome:function(){this.$router.push({path:"/home"})},navbtn:function(t){this.navindex=t,this.pageNum=8,this.pageSize=1,this.orderList="",this.isLoadCompleted=!1,0==t?(this.status="",this.initOrderList()):1==t?(this.status=3,this.initOrderList()):2==t&&(this.status=4,this.initOrderList())},confirmOrder:function(t,s){var i=this;return new e.a(function(a,e){i.$http.get(h.a.order.confirmOrder,{headers:i.getHeaders,params:{orderId:t}}).then(function(t){if(200===t.data.code){i.oredermask=!0;var e=i.navindex,r=i.orderList;0==e?(r[s].status=4,i.orderList=r):1==e&&(r.splice(s,1),i.orderList=r),setTimeout(function(t){i.oredermask=!1},1500)}a()})})},viewLogistics:function(t){this.$router.push({path:"/logistics",query:{orderId:t}})},closeModelWin:function(){this.isConfirm=!1,this.showModel=!1},okModelWin:function(t){if(!this.isClick)return!1;this.isClick=!1,t()},showModelWin:function(t){this.cancelOrderId=t,this.showModel=!0,this.isConfirm=!0,this.okType=this.cancelOrder,this.errorTip="您确定要取消订单吗？"},toOrderDetail:function(t){var s={orderId:t.orderId};8==t.goodsType&&this.$router.push({path:"/orderDetail",query:s})}}},C={render:function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",[i("nav-header",{attrs:{back:"true",color:"1",clickRedirect:"true"},on:{clickEvent:t.back}},[i("div",{staticClass:"title",attrs:{slot:"title"},slot:"title"},[t._v("兑换记录")])]),t._v(" "),i("div",{staticClass:"nav-list"},t._l(t.navlist,function(s,a){return i("div",{key:a,staticClass:"nav-item",on:{click:function(s){t.navbtn(a)}}},[i("div",{staticClass:"nav-text"},[t._v(t._s(s))]),t._v(" "),i("img",{staticClass:"nav-line",attrs:{src:t.imgPath+"11_1.png",alt:""}}),t._v(" "),i("div",{class:{active:t.navindex==a}})])})),t._v(" "),i("div",{ref:"scrollWrapper",staticClass:"scroll-wrapper"},[i("div",{staticClass:"wrapper"},[t.orderList.length>0?i("ul",{staticClass:"order-list"},t._l(t.orderList,function(s,a){return i("li",{key:a,staticClass:"item"},[i("div",{staticClass:"order-header",on:{click:function(i){t.toOrderDetail(s)}}},[i("div",{staticClass:"order-code"},[t._v("\n\t\t\t\t\t\t\t订单号：\n\t\t\t\t\t\t\t"),i("span",[t._v(t._s(s.orderNo))])]),t._v(" "),i("div",{staticClass:"order-status"},[1==s.status?i("span",{staticClass:"status"},[t._v("待付款")]):t._e(),t._v(" "),6==s.status?i("span",{staticClass:"status"},[t._v("待兑换")]):t._e(),t._v(" "),2==s.status?i("span",{staticClass:"status"},[t._v("待发货")]):t._e(),t._v(" "),3==s.status?i("span",{staticClass:"status"},[t._v("待收货")]):t._e(),t._v(" "),4==s.status?i("span",{staticClass:"status"},[t._v("已完成")]):t._e(),t._v(" "),5==s.status?i("span",{staticClass:"status"},[t._v("已取消")]):t._e()])]),t._v(" "),i("div",{staticClass:"order-wrapper"},[i("ul",{staticClass:"pro-list"},t._l(s.orderItem,function(s,a){return i("li",{key:a,staticClass:"pro-item",on:{click:function(i){i.stopPropagation(),t.toDetail(s)}}},[i("div",{staticClass:"pro-pic"},[i("img",{directives:[{name:"adaptiveSrc",rawName:"v-adaptiveSrc:li",value:s.imagesUrl,expression:"itemChild.imagesUrl",arg:"li"}]})]),t._v(" "),i("div",{staticClass:"pro-right"},[i("div",{staticClass:"pro-title"},[t._v(t._s(s.goodsName))]),t._v(" "),i("div",{staticClass:"pro-dec"},[t._v("市场价值"+t._s(s.goodsOrginalPrice)+"元")]),t._v(" "),i("div",{staticClass:"pro-number"},[t._v("×1")]),t._v(" "),i("div",{staticClass:"pro-controls"},[i("div",{staticClass:"pro-price"},[i("span",[t._v(t._s(s.goodsScore))]),t._v("积分\n\t\t\t\t\t\t\t\t\t\t")])])])])}))]),t._v(" "),3==s.status?i("div",{staticClass:"order-controls"},[i("a",{attrs:{href:"javascript:void(0);"},on:{click:function(i){t.confirmOrder(s.orderId,a)}}},[t._v("确认收货")])]):t._e()])})):i("div",{staticClass:"no-record-wrapper"},[i("img",{staticClass:"icon",attrs:{src:t.imgPath+"11_5.png",alt:""}}),t._v(" "),i("div",{staticClass:"record-text"},[t._v("暂无兑换记录")]),t._v(" "),i("div",{staticClass:"back-home",on:{click:t.backhome}},[t._v("随便逛逛")])]),t._v(" "),i("loading-tip",{attrs:{loadingTip:t.loadingTip,isShow:t.orderList.length>=t.pageNum,hasNext:t.hasNext}})],1)]),t._v(" "),i("transition",{attrs:{name:"fade"}},[t.isLoadCompleted?t._e():i("loading-page")],1),t._v(" "),i("transition",{attrs:{name:"fade"}},[i("waiting-tip",{directives:[{name:"show",rawName:"v-show",value:t.isClicked,expression:"isClicked"}]})],1),t._v(" "),i("model-win",{attrs:{show:t.showModel}},[i("template",{slot:"content"},[t._v(t._s(t.errorTip))]),t._v(" "),i("template",{slot:"btn"},[t.isConfirm?[i("a",{staticClass:"btn",attrs:{href:"javascript:void(0);"},on:{click:t.closeModelWin}},[t._v("取消")]),t._v(" "),i("a",{staticClass:"btn btn-last",attrs:{href:"javascript:void(0);"},on:{click:function(s){t.okModelWin(t.okType)}}},[t._v("确定")])]:[i("a",{staticClass:"btn",attrs:{href:"javascript:void(0);"},on:{click:t.closeModelWin}},[t._v("确定")])]],2)],2),t._v(" "),t.oredermask?i("div",{staticClass:"success-win"},[i("div",{staticClass:"success-content"},[i("img",{staticClass:"icon",attrs:{src:t.imgPath+"4_1.png",alt:""}}),t._v(" "),i("div",{staticClass:"text"},[t._v("确认收货成功")])])]):t._e()],1)},staticRenderFns:[]};var f=i("VU/8")(g,C,!1,function(t){i("uMWi")},"data-v-8aaac72c",null);s.default=f.exports},uMWi:function(t,s){}});