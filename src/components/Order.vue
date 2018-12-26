<template>

<div class="w_100">
	<template v-if="orderNumber != 0">
<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :top-distance="topDis" 
:bottom-distance="botDis" :auto-fill="false" :topPullText='pullText' :topDropText='dropText' :topLoadingText='loadingText' ref="loadmore" class="font_28 color_gray">
<div class="topTiao border-bot"></div>
	<template v-for="(item,index) in orderList">
	<div class="color_back_white border-bot pb_40" :key="index" @click="navOrderdetail(item.id)">

		<div class="c_content">
			<div class="top flex-wrap flex-horizontal flex-justify-between flex-align-center font_28">
				<div><span class="color_regu">订单号：</span><span class="color_gray">{{item.orderNumber}}</span></div>
				<div class="classObject flex-wrap flex-align-center flex-justify-center" :class="{ 'waite': item.status == 0,'send':item.status == 1,'complate':item.status == 2,'cancled':item.status == 3}">
					<span class="color_white" v-if="item.status == 0">待处理</span>
					<span class="color_white" v-if="item.status == 1">已派单</span>
					<span class="color_white" v-if="item.status == 2">已完成</span>
					<span class="color_white" v-if="item.status == 3">已取消</span>
				</div>
			</div>
			<div class="flex-wrap flex-horizonta">
				<div class="shopimg"><img src="../assets/images/shopimg.png" alt=""></div>
				<div class="flex-wrap flex-vertical flex-justify-around font_28">
					<p v-if="item.type == 1">一般清洁服务</p>
					<p v-if="item.type == 0">家电清洁服务</p>
					<p><span class="color_regu">服务时长：</span><span class="color_gray">{{item.appointmentTimeLength}}小时</span></p>
					<p><span class="color_regu">预约时间：</span><span class="color_gray">{{dataFormet(item.appointmentTime)}}</span></p>
				</div>
			</div>
		</div>
	</div>
	</template>	
	</mt-loadmore>
	</template>
	<template v-else>
		<div class="noOrder">
			<div class="font_28 color_gray">您暂时没有订单</div>
		</div>
	</template>
</div>

</template>

<script>
import { Toast } from 'mint-ui';
import {mapGetters,mapActions} from 'vuex';
export default{
	name:'Order',
	data(){
		return{
			orderList:[],//订单数据
			pageNo:1,
			totalPage:1,//总页数
			orderNumber:0,//用户订单数
			allLoaded:false,
			topDis:70,
			botDis:10,
			scrollMode:"touch",			
			pullText:'',
			dropText:'释放更新',
			loadingText:''

		}
	},
	methods:{
		//跳转到订单详情
		navOrderdetail(id){
			this.$router.push({path:'/Orderdetail',query:{id:id}});
		},
		//查询订单列表
		getOrderList({userId=this.userId,pageNo=this.pageNo,pageSize=10}={}){
			if(this.pageNo > this.totalPage){
				this.allLoaded = true;//禁止上拉加载
				Toast('到底了');
				return false;
			}
			this.$post('sp/order/queryOrder',{
				userId:userId,
				pageNo:pageNo,
				pageSize:pageSize
			}).then(data=>{
				if(this.pageNo == 1){
					this.orderList = data.data;					
				}else{					
					this.orderList = this.orderList.concat(data.data);
				}
				this.pageNo++;				
				this.totalPage = Math.ceil(data.pageCount/10);
				this.orderNumber = 	data.pageCount || 0;					
				// console.log(data.pageCount);
			})
		},
		
		dataFormet(data){
			var addaroe = function(m){
				return m < 10? '0'+m : m;
			}
			var datas = new Date(data);
			var year = datas.getFullYear();
			var month = datas.getMonth()+1;
			var day = datas.getDate();
			var hour = datas.getHours();
			var min = datas.getMinutes();
			var second = datas.getSeconds();			
			return year + '-' + addaroe(month) + '-' + addaroe(day) + ' ' + addaroe(hour) + ':' + addaroe(min);
		},
		loadBottom() {//上拉加载	
		 console.log('bottom')
		 this.getOrderList();
		  this.$refs.loadmore.onBottomLoaded();		  		 		
		},
		loadTop(){//下拉刷新	
			console.log('top')
			this.pageNo = 1;
			this.getOrderList();
			this.$refs.loadmore.onTopLoaded();			
		}
	},
	created(){
		
	},
	mounted(){	
			this.getOrderList({userId:this.userId});						
	},
	computed:{
		...mapGetters([
			'userId'
		])
	}
}
</script>

<style scoped>
.c_content{width: 6.7rem;	margin: auto;}
.top{height:0.9rem;}	
.classObject{width:0.96rem;height:0.52rem;border-radius:0.26rem;overflow: hidden;}
.classObject span{font-size:0.2rem;}
.shopimg img{width:2.4rem;height:1.48rem;}
.shopimg{margin-right:0.25rem;}	
.border-top,.border-bot{ position:relative; }
.border-top:before,.border-bot:after{content: ''; position: absolute; left: 0;right:0;
background: #ddd;height: 0.02rem;-webkit-transform: scaleY(0.5);
transform: scaleY(0.5); }
.border-bot:after{ bottom:0;-webkit-transform-origin: 0 0;transform-origin: 0 0;}
.border-top:before{top:0;-webkit-transform-origin: 0 0;transform-origin: 0 0;}
.waite{background: #ff6600;}
.send{background: #0099ff;}
.complate{background: #339933;}
.cancled{background: #999;}
.noOrder{display:relative;}
.noOrder div{position:absolute;top:50%;text-align:center;width:100%;transform:translateY(-50%);}
</style>