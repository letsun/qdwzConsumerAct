webpackJsonp([18],{bwUq:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=i("GQaK"),r=i("7AG+"),a=i("OUXH"),o=i("zZaa"),c=i("wzPG"),n=i("d1wj"),l=(i("yt7g"),i("CyOZ"),i("zSeF")),v=i("N183"),h=i("i5La"),d=i.n(h),u={components:{LoadingPage:r.a,NavHeader:a.a,VuePickers:d.a,WaitingTip:o.a,ModelWin:c.a},data:function(){return{errorTip:"",showModel:!1,isConfirm:!1,okType:"",isLoadCompleted:!0,imgPath:"https://qdwzvue-1254182596.cos.ap-guangzhou.myqcloud.com/qdwzAct/langyanFw/",prizeList:[],isRuleShow:!1,receiveName:"",receivePhone:"",receiveAddress:"",receiveProvince:"省",receiveCity:"市",receiveArea:"区",isShowArea:!0,isShowCity:!0,showPicker1:!1,showPicker2:!1,showPicker3:!1,pickData1:{columns:1,default:{text:"请选择",value:""},pData1:v.a},pickData2:{columns:1,default:{text:"请选择",value:""},pData1:[{text:"请选择",value:""}]},pickData3:{columns:1,default:{text:"请选择",value:""},pData1:[{text:"请选择",value:""}]},isResultShow:!1,isSubmitShow:!1,count:-1,lotteryIndex:-1,speed:80,isLoadingShow:!1,lotteryRecordId:-1,balanceScore:0,RemainingNum:0,isClick:!0,lotteryRecord:{prizeName:"",prizeIcon:"",prizeType:""},perConsumption:0,recordInfo:""}},mounted:function(){var t=this;this.$nextTick(function(){$("body").show(),t.initScroll(),t.getPrizes(),t.getActivity(),t.getComRecord(),setInterval(function(){t.getComRecord()},3e5)})},computed:{nickname:function(){return this.$store.state.nickname},headimgurl:function(){return this.$store.state.headimgurl},getHeaders:function(){return this.$store.getters.getHeaders},expireDate:function(){return this.$store.state.expireDate}},methods:{initScroll:function(){this.scroll=new s.a(this.$refs.ruleContent,{click:!0})},openRule:function(){var t=this;this.isRuleShow=!0,setTimeout(function(){t.scroll.refresh()},500)},closeRule:function(){this.isRuleShow=!1},toWinning:function(){this.$router.push({path:"/winningRecord"})},closeResult:function(){this.isResultShow=!1,1==this.lotteryRecord.prizeType&&(this.isSubmitShow=!0)},selectProvince:function(){this.inputBlur(),this.showPicker1=!0},selectCity:function(){this.inputBlur(),this.showPicker2=!0},selectArea:function(){this.inputBlur(),this.showPicker3=!0},confirmFn1:function(t){this.showPicker1=!1,void 0!==t.select1.sub?(this.pickData2.pData1=t.select1.sub,this.isShowCity=!0,this.isShowArea=!0):(this.isShowCity=!1,this.isShowArea=!1),this.receiveProvince=t.select1.text,this.receiveCity="请选择市",this.receiveArea="请选择区"},confirmFn2:function(t){this.showPicker2=!1,void 0!==t.select1.sub?(this.pickData3.pData1=t.select1.sub,this.isShowArea=!0):this.isShowArea=!1,this.receiveCity=t.select1.text,this.receiveArea="请选择区"},confirmFn3:function(t){this.showPicker3=!1,this.receiveArea=t.select1.text},closeFn:function(){this.showPicker1=!1,this.showPicker2=!1,this.showPicker3=!1},inputBlur:function(){for(var t=this.$refs.formList.getElementsByTagName("input"),e=0,i=t.length;e<i;e++)t[e].blur()},lotteryFunc:function(){var t=this;return this.RemainingNum<=0?(this.showModel=!0,this.isConfirm=!1,void(this.errorTip="您今日抽奖次数已用完，请明天再来!")):this.balanceScore-this.perConsumption<0?(this.showModel=!0,this.isConfirm=!1,void(this.errorTip="您的积分不足，不能再抽奖")):!!this.isClick&&(this.isClick=!1,void this.$http.get(n.a.lottery.lottery,{headers:this.getHeaders}).then(function(e){var i=e.data;if(i.code===l.a.SUCCESS){for(var s=i.data.prizeItem.id,r=0;r<t.prizeList.length;r++)if(s==t.prizeList[r].id){t.lotteryIndex=r;break}i.data.lotteryRecord?(t.lotteryRecord=i.data.lotteryRecord,t.lotteryRecord.title="恭喜您中奖了!",t.lotteryRecord.type=0,0==t.lotteryRecord.prizeType?t.lotteryRecord.tip="奖品自动收放到“我的积分”中":1==t.lotteryRecord.prizeType&&(t.lotteryRecord.tip="奖品具体详情请前往中奖记录查看!")):(t.lotteryRecord.type=1,t.lotteryRecord.title="再接再厉!",t.lotteryRecord.prizeName="离奖品只差一个手势",t.lotteryRecord.prizeIcon=t.imgPath+"31_1.png",t.lotteryRecord.tip="抽奖姿势不对，大奖就在下一次~"),t.timer=setInterval(t.timerFunc,t.speed)}else t.showModel=!0,t.isConfirm=!1,t.errorTip=i.msg,t.isClick=!0}))},timerFunc:function(){var t=this;this.count++,this.speed-=8,this.speed<=30&&(this.speed=30),this.count>24&&(this.speed+=60),clearInterval(this.timer),this.timer=setInterval(this.timerFunc,this.speed),this.count>32&&this.count%8==this.lotteryIndex&&(clearInterval(this.timer),setTimeout(function(){t.count=-1,t.speed=80,t.lotteryIndex=-1,t.getActivity(),t.isClick=!0,t.isResultShow=!0},1e3))},submitInfo:function(){var t=this;return this.receiveName?this.receivePhone?/^1[0-9]{10}$/.test(this.receivePhone)?"省"===this.receiveProvince||"请选择"===this.receiveProvince?(this.showModel=!0,this.isConfirm=!1,void(this.errorTip="收货人省份不能为空")):"市"===this.receiveCity||"请选择"===this.receiveCity?(this.showModel=!0,this.isConfirm=!1,void(this.errorTip="收货人城市不能为空")):!this.isShowArea||"区"!==this.receiveArea&&"请选择"!==this.receiveArea?this.receiveAddress?("请选择区"==this.receiveArea&&(this.receiveArea=""),this.isLoadingShow=!0,void this.$http.get(n.a.lottery.save,{headers:this.getHeaders,params:{lotteryRecordId:this.lotteryRecord.id,receiveName:this.receiveName,receivePhone:this.receivePhone,receiveProvince:this.receiveProvince,receiveCity:this.receiveCity,receiveArea:this.receiveArea,receiveAddress:this.receiveAddress}}).then(function(e){t.isLoadingShow=!1;var i=e.data;t.isSubmitShow=!1,i.code===l.a.SUCCESS?(t.showModel=!0,t.isConfirm=!1,t.errorTip="提交成功",t.receiveName="",t.receivePhone="",t.receiveProvince="",t.receiveCity="",t.receiveArea="",t.receiveAddress="",t.lotteryRecordId=""):(t.showModel=!0,t.isConfirm=!1,t.errorTip=i.data.msg)})):(this.showModel=!0,this.isConfirm=!1,void(this.errorTip="收货人地址不能为空")):(this.showModel=!0,this.isConfirm=!1,void(this.errorTip="收货人地区不能为空")):(this.showModel=!0,this.isConfirm=!1,void(this.errorTip="收货人电话格式有误")):(this.showModel=!0,this.isConfirm=!1,void(this.errorTip="收货人电话不能为空")):(this.showModel=!0,this.isConfirm=!1,void(this.errorTip="收货人姓名不能为空"))},closeModelWin:function(){this.isConfirm=!1,this.showModel=!1},okModelWin:function(t,e){t(e)},getPrizes:function(){var t=this;this.$http.get(n.a.lottery.prizes,{headers:this.getHeaders}).then(function(e){var i=e.data;i.code===l.a.SUCCESS&&(t.prizeList=i.data)})},getActivity:function(){var t=this;this.$http.get(n.a.lottery.getActivity,{headers:this.getHeaders}).then(function(e){var i=e.data;i.code===l.a.SUCCESS&&(t.balanceScore=i.data.balanceScore,t.perConsumption=i.data.score,t.RemainingNum=i.data.limitNum-i.data.num)})},getComRecord:function(){var t=this;this.$http.get(n.a.lottery.comRecord,{headers:this.getHeaders,params:{pageNum:1,pageSize:20}}).then(function(e){var i=e.data;if(i.code===l.a.SUCCESS){var s=i.data.list;if(s.length>0){t.recordInfo="";for(var r=0;r<s.length;r++)1==s[r].prizeType?t.recordInfo+="恭喜"+s[r].nickName+"获得"+s[r].prizeContent+"      ":t.recordInfo+="恭喜"+s[r].nickName+"获得"+s[r].prizeName+"      "}}})}}},m={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("nav-header",{attrs:{back:"true",color:"1"}},[i("div",{staticClass:"title",attrs:{slot:"title"},slot:"title"},[t._v("积分抽奖")])]),t._v(" "),i("div",{ref:"scrollWrapper",staticClass:"scroll-wrapper"},[i("div",{staticClass:"title"},[t._v("今天还有"),i("span",[t._v(t._s(t.RemainingNum>0?t.RemainingNum:0))]),t._v("次抽奖机会")]),t._v(" "),i("div",{staticClass:"point"},[t._v("我的积分："),i("span",[t._v(t._s(t.balanceScore))])]),t._v(" "),i("img",{staticClass:"child-bg",attrs:{src:t.imgPath+"26_13.png"}}),t._v(" "),i("div",{staticClass:"prize-wra"},[i("img",{staticClass:"light light1",attrs:{src:t.imgPath+"26_2.png",alt:""}}),t._v(" "),i("img",{staticClass:"light light2",attrs:{src:t.imgPath+"26_3.png",alt:""}}),t._v(" "),i("div",{staticClass:"prize-list"},t._l(t.prizeList,function(e,s){return i("div",{staticClass:"prize-item",class:{active:s==t.count%8}},[4!=e.prizeType?i("div",{staticClass:"icon-wra"},[i("img",{directives:[{name:"adaptiveSrc",rawName:"v-adaptiveSrc:li",value:e.prizeIcon,expression:"item.prizeIcon",arg:"li"}],staticClass:"prize-icon",attrs:{alt:""}})]):t._e(),t._v(" "),4!=e.prizeType?i("div",{staticClass:"prize-text"},[t._v(t._s(e.prizeName))]):t._e(),t._v(" "),4==e.prizeType?i("div",{staticClass:"prize-text2"},[t._v("谢谢"),i("br"),t._v("参与")]):t._e()])})),t._v(" "),i("img",{staticClass:"lottery-btn",attrs:{src:t.imgPath+"26_1.png",alt:""},on:{click:function(e){t.lotteryFunc()}}})]),t._v(" "),i("div",{staticClass:"notice-wra"},[i("img",{staticClass:"icon",attrs:{src:t.imgPath+"26_14.png",alt:""}}),t._v(" "),i("marquee",{staticStyle:{"margin-left":"42px",color:"#fff"},attrs:{vspace:"10px",hspace:"6px",direction:"left",behavior:"scroll",scrollamount:"3"}},[t._v("\n\t\t\t\t"+t._s(t.recordInfo)+"\n\t\t\t")])],1),t._v(" "),i("div",{staticClass:"bottom"},[i("img",{staticClass:"btn rule-btn",attrs:{src:t.imgPath+"26_15.png",alt:""},on:{click:function(e){t.openRule()}}}),t._v(" "),i("img",{staticClass:"btn record-btn",attrs:{src:t.imgPath+"26_16.png",alt:""},on:{click:function(e){t.toWinning()}}})])]),t._v(" "),t.isResultShow?i("div",{staticClass:"result-win"},[i("div",{staticClass:"result-content"},[i("div",{staticClass:"result-title"},[t._v(t._s(t.lotteryRecord.title))]),t._v(" "),0==t.lotteryRecord.type?i("div",{staticClass:"result-name"},[t._v("获得"+t._s(t.lotteryRecord.prizeName))]):t._e(),t._v(" "),1==t.lotteryRecord.type?i("div",{staticClass:"result-name"},[t._v(t._s(t.lotteryRecord.prizeName))]):t._e(),t._v(" "),i("img",{staticClass:"result-icon",attrs:{src:t.lotteryRecord.prizeIcon}}),t._v(" "),i("div",{staticClass:"tip"},[t._v(t._s(t.lotteryRecord.tip))]),t._v(" "),i("div",{staticClass:"result-btn",on:{click:function(e){t.closeResult()}}},[t._v("确定")])])]):t._e(),t._v(" "),t.isSubmitShow?i("div",{staticClass:"submit-info"},[i("div",{staticClass:"submit-content"},[i("div",{staticClass:"submit-title"},[t._v(t._s(t.lotteryRecord.prizeName))]),t._v(" "),i("div",{ref:"formList",staticClass:"form"},[i("div",{staticClass:"form-item"},[i("div",{staticClass:"form-key"},[t._v("姓   名")]),t._v(" "),i("div",{staticClass:"form-val"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.receiveName,expression:"receiveName"}],attrs:{type:"text",maxlength:"20",placeholder:"请填写您的姓名"},domProps:{value:t.receiveName},on:{input:function(e){e.target.composing||(t.receiveName=e.target.value)}}})])]),t._v(" "),i("div",{staticClass:"form-item"},[i("div",{staticClass:"form-key"},[t._v("手机号")]),t._v(" "),i("div",{staticClass:"form-val"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.receivePhone,expression:"receivePhone"}],attrs:{type:"text",maxlength:"11",placeholder:"请填写您的手机号码"},domProps:{value:t.receivePhone},on:{input:function(e){e.target.composing||(t.receivePhone=e.target.value)}}})])]),t._v(" "),i("div",{staticClass:"form-item"},[i("div",{staticClass:"form-key"},[t._v("区   域")]),t._v(" "),i("div",{staticClass:"form-val form-select-val"},[i("div",{staticClass:"item",on:{click:function(e){return e.stopPropagation(),t.selectProvince(e)}}},[t._v(t._s(t.receiveProvince))]),t._v(" "),t.isShowCity?i("div",{staticClass:"item",on:{click:function(e){return e.stopPropagation(),t.selectCity(e)}}},[t._v(t._s(t.receiveCity))]):t._e(),t._v(" "),t.isShowArea?i("div",{staticClass:"item",on:{click:function(e){return e.stopPropagation(),t.selectArea(e)}}},[t._v(t._s(t.receiveArea))]):t._e()])]),t._v(" "),i("div",{staticClass:"form-item"},[i("div",{staticClass:"form-key"},[t._v("地   址")]),t._v(" "),i("div",{staticClass:"form-val"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.receiveAddress,expression:"receiveAddress"}],attrs:{type:"text",maxlength:"50",placeholder:"请填写您的详细地址"},domProps:{value:t.receiveAddress},on:{input:function(e){e.target.composing||(t.receiveAddress=e.target.value)}}})])])]),t._v(" "),i("div",{staticClass:"submit-btn",on:{click:function(e){t.submitInfo()}}},[t._v("提交")])])]):t._e(),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:t.isRuleShow,expression:"isRuleShow"}],staticClass:"rule-win"},[i("div",{ref:"ruleContent",staticClass:"rule-content"},[i("div",{staticClass:"rule-wra"},[i("div",{staticClass:"title"},[t._v("抽奖规则")]),t._v(" "),i("img",{staticClass:"line",attrs:{src:t.imgPath+"11_1.png",alt:""}}),t._v(" "),t._m(0)])]),t._v(" "),i("img",{staticClass:"close-rule",attrs:{src:t.imgPath+"1_200.png",alt:""},on:{click:function(e){t.closeRule()}}})]),t._v(" "),i("transition",{attrs:{name:"fade"}},[t.isLoadCompleted?t._e():i("loading-page",{attrs:{page:"noTop"}})],1),t._v(" "),i("vue-pickers",{attrs:{show:t.showPicker1,selectData:t.pickData1},on:{cancel:t.closeFn,confirm:t.confirmFn1}}),t._v(" "),i("vue-pickers",{attrs:{show:t.showPicker2,selectData:t.pickData2},on:{cancel:t.closeFn,confirm:t.confirmFn2}}),t._v(" "),i("vue-pickers",{attrs:{show:t.showPicker3,selectData:t.pickData3},on:{cancel:t.closeFn,confirm:t.confirmFn3}}),t._v(" "),t.isLoadingShow?i("waiting-tip"):t._e(),t._v(" "),i("model-win",{attrs:{show:t.showModel}},[i("template",{slot:"content"},[t._v("\n\t\t\t"+t._s(t.errorTip)+"\n\t\t")]),t._v(" "),i("template",{slot:"btn"},[t.isConfirm?[i("a",{staticClass:"btn",attrs:{href:"javascript:void(0);"},on:{click:t.closeModelWin}},[t._v("取消")]),t._v(" "),i("a",{staticClass:"btn btn-last",attrs:{href:"javascript:void(0);"},on:{click:function(e){t.okModelWin(t.okType,t.param)}}},[t._v("确定")])]:[i("a",{staticClass:"btn",attrs:{href:"javascript:void(0);"},on:{click:t.closeModelWin}},[t._v("确定")])]],2)],2)],1)},staticRenderFns:[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"dec"},[i("div",{staticClass:"text"},[t._v("1.每次抽奖需要消耗10积分；")]),t._v(" "),i("div",{staticClass:"text"},[t._v("2.每天限制5次抽奖次数；")]),t._v(" "),i("div",{staticClass:"text"},[t._v("3.您可以通过【中奖记录】查询您的中奖信息；")]),t._v(" "),i("div",{staticClass:"text"},[t._v("4.实物奖品需要您配合完善邮寄信息，请在3个工作日内联系客服发放；")]),t._v(" "),i("div",{staticClass:"text"},[t._v("5.如因未填写地址、地址不准确或不详细导致投递不成功的情况，由用户自己承担；")]),t._v(" "),i("div",{staticClass:"text"},[t._v("6.本活动最终解释权归狼烟天下官方所有。")])])}]};var p=i("VU/8")(u,m,!1,function(t){i("r8Im")},"data-v-23ae225b",null);e.default=p.exports},r8Im:function(t,e){}});