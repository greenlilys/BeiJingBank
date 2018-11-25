<template>

<div class="w_100">
<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :top-distance="topDis" 
:bottom-distance="botDis" :auto-fill="false" ref="loadmore">
<div class="topTiao border-bot"></div>
	<div class="color_back_white border-bot pb_40" v-for="item in orderList" @click="navOrderdetail(item.orderNumber,item.status,item.appointmentTimeLength,item.createTime,item.serviceItem,item.userName,item.phone,item.address,item.type,item.id)">
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
					<p><span class="color_regu">预约时间：</span><span class="color_gray">{{dataFormet(item.createTime)}}</span></p>
				</div>
			</div>
		</div>
	</div>
	</mt-loadmore>
</div>

</template>

<script>
import { Toast } from 'mint-ui';
import {mapGetters,mapActions} from 'vuex';
export default{
	name:'Order',
	data(){
		return{
			orderList:[],
			pageNo:1,
			allLoaded:false,
			topDis:70,
			botDis:10,
			scrollMode:"touch",
			totalPage:2

		}
	},
	methods:{
		navOrderdetail(orderNumber,status,appointmentTimeLength,createTime,serviceItem,userName,phone,address,type,id){
			this.$router.push({path:'/Orderdetail',query:{orderNumber:orderNumber,status:status,appointmentTimeLength:appointmentTimeLength,createTime:createTime,serviceItem:serviceItem,userName:userName,phone:phone,address:address,type:type,id:id}});

		},
		...mapActions([
			'increment'
			]),
		//查询订单列表
		getOrderList(){
			if(this.totalPage == 3){
				this.allLoaded = true;
				return false;
			}
			this.$post('/api/sp/order/queryOrder',{
				userId:'27d2ecc5b92640dbbe895922e0bb85b3',
				pageNo:this.pageNo,
				pageSize:10
			}).then(data=>{
				this.orderList = data.data;
				this.pageNo++;				
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
			return year + '-' + addaroe(month) + '-' + addaroe(day) + '日' +' ' + addaroe(hour) + ':' + addaroe(min) + '时';
		},
		loadBottom() {
			Toast('到底')
		 console.log('232')
		  this.$refs.loadmore.onBottomLoaded();
		  this.getOrderList();
		 		
		},
		loadTop(){
			Toast('ding')
			console.log('top')
		}
	},
	mounted(){
		// this.getOrderList();
			this.number = this.$store.state.count;
		console.log(this.number)		
	},
	computed:{
		
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
</style>