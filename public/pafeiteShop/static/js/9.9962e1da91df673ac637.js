webpackJsonp([9],{Ektt:function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var s=e("Gu7T"),a=e.n(s),l=e("GQaK"),r=e("OUXH"),n=e("wzPG"),o=e("7AG+"),c=e("RoWd"),d=e("d1wj"),h=(e("yt7g"),e("CyOZ")),p=e("zSeF"),v={components:{NavHeader:r.a,ModelWin:n.a,LoadingPage:o.a,LoadingTip:c.a},data:function(){return{isLoadCompleted:!0,imgPath:"http://ywymprod.oss-cn-shenzhen.aliyuncs.com/tongyi/",integralRecordList:[],pageNum:1,loadingTip:"上滑加载更多",limit:20,hasNext:!0}},mounted:function(){var t=this;this.$nextTick(function(){$("body").show(),t.scoreRecord(),t.initScroll(),Object(h.a)(t,t.getHeaders,"-1")})},computed:{getHeaders:function(){return this.$store.getters.getHeaders}},updated:function(){this.finish()},methods:{initScroll:function(){var t=this;this.scroll=new l.a(this.$refs.scrollWrapper,{scrollbar:{fade:!0},click:!0,pullUpLoad:{threshold:0}}),this.scroll.on("pullingUp",function(){t.hasNext?(t.pageNum++,t.loadingTip="数据正在加载中....",t.scoreRecord()):t.loadingTip="已经没有更多了"})},scoreRecord:function(){var t=this;this.$http.get(d.a.integral.scoreRecord,{headers:this.getHeaders,params:{pageNum:this.limit,pageSize:this.pageNum}}).then(function(i){var e=i.data;e.code===p.a.SUCCESS&&(t.hasNext=e.data.hasNext,t.loadingTip="上滑加载更多",t.isLoadCompleted=!0,t.integralRecordList=[].concat(a()(t.integralRecordList),a()(e.data.scoreList)))})},finish:function(){this.scroll.finishPullUp(),this.scroll.refresh()}}},u={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",[e("nav-header",{attrs:{back:"true",color:"0"}},[e("div",{staticClass:"title",attrs:{slot:"title"},slot:"title"},[t._v("积分记录")])]),t._v(" "),e("div",{staticClass:"container"},[e("div",{ref:"scrollWrapper",staticClass:"scroll-wrapper"},[e("div",{staticClass:"wrapper"},[t._m(0),t._v(" "),e("div",{staticClass:"list"},t._l(t.integralRecordList,function(i,s){return e("div",{key:s,staticClass:"item"},[e("div",{staticClass:"child-item child-item1"},[t._v(t._s(i.score)+"积分")]),t._v(" "),e("div",{staticClass:"child-item child-item2"},[t._v(t._s(i.detailName))]),t._v(" "),e("div",{staticClass:"child-item child-item3"},[t._v(t._s(i.createDate))])])})),t._v(" "),e("loading-tip",{attrs:{loadingTip:t.loadingTip,isShow:t.integralRecordList.length>=t.limit,hasNext:t.hasNext}})],1),t._v(" "),e("transition",{attrs:{name:"fade"}},[t.isLoadCompleted?t._e():e("loading-page",{attrs:{page:"noTop"}})],1)],1)])],1)},staticRenderFns:[function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"title"},[i("div",{staticClass:"title-item title-item1"},[this._v("积分记录")]),this._v(" "),i("div",{staticClass:"title-item title-item2"},[this._v("积分方式")]),this._v(" "),i("div",{staticClass:"title-item title-item3"},[this._v("积分时间")])])}]};var m=e("VU/8")(v,u,!1,function(t){e("KS8O")},"data-v-d056b03a",null);i.default=m.exports},KS8O:function(t,i){}});