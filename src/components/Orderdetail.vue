<template>
<div class="w_100">
<div class="topTiao"></div>
	<div class="color_back_white border-b border-t pb_20">
		<div class="c_content">
			<div class="top flex-wrap flex-horizontal flex-justify-between flex-align-center font_28">
				<div><span class="color_regu">订单号：</span><span class="color_gray">{{orderDetail.orderNumber}}</span></div>
				<div class="classObject flex-wrap flex-align-center flex-justify-center" :class="{ 'waite': orderDetail.status == 0,'send':orderDetail.status == 1,'complate':orderDetail.status == 2,'cancled':orderDetail.status == 3}">
					<span class="color_white" v-if="orderDetail.status == 0">待处理</span>
					<span class="color_white" v-if="orderDetail.status == 1">已派单</span>
					<span class="color_white" v-if="orderDetail.status == 2">已完成</span>
					<span class="color_white" v-if="orderDetail.status == 3">已取消</span>
				</div>
			</div>
			<div class="flex-wrap flex-horizonta">
				<div class="shopimg"><img src="../assets/images/shopimg.png" alt=""></div>
				<div class="rtext flex-wrap flex-vertical flex-justify-around font_28">				
					<p class="color_blue font_b" v-if="orderDetail.type == 1">一般清洁服务</p>
					<p class="color_blue font_b" v-if="orderDetail.type == 0">家电清洁服务</p>
					<p><span class="color_regu">服务时长：</span><span class="color_gray">{{orderDetail.appointmentTimeLength}}小时</span></p>
					<p><span class="color_regu">预约时间：</span><span class="color_gray">{{dataFormet(orderDetail.createTime)}}</span></p>	
					<div class="flex-wrap flex-horizontal">
						<p class="color_regu">服务项目：<span class="color_gray font_28" v-if="orderDetail.type == 1">无</span></p>
						<div class="color_gray" v-if="orderDetail.type == 0">
							<template v-for="(item,index) in service">
								<p :key="index">{{item.project}}×{{item.num}}</p>
							</template>														
						</div>						
					</div>
				</div>
			</div>			
		</div>		
	</div>

	<div class="color_back_white border-t">
			<p class="pt_20 font_28 ptop"><span class="color_regu">优惠：</span><span class="color_gray">{{discount >= 3? 2 : 0}}小时</span></p>
			<p class="pb_20 font_28 ptop"><span class="color_regu">共计：</span><span class="color_gray">{{orderDetail.appointmentTimeLength}}小时</span></p>
	</div>

	<div class="color_back_white border-b border-t font_28">
		<div class="c_content addressBox pt_20 pb_20">
			<p class="color_regu"> <span>{{orderDetail.userName}}</span><span class="ml_20">{{orderDetail.phone}}</span></p>
			<p class="flex-wrap flex-horizontal flex-justify-between">
				<span class="color_regu">{{orderDetail.addressName}}</span>				
			</p>
		</div>
	</div>
	<div class="meet backList actived jianBian_blue flex-wrap flex-align-center flex-justify-center" @click="backList"><span>返回列表</span></div>
	<div v-if = "orderDetail.status == 0 || orderDetail.status == 1"  class="meet cancle flex-wrap flex-align-center flex-justify-center" @click="cancleOrder"><span>取消订单</span></div>
	
</div>
</template>

<script>
import { Toast } from 'mint-ui';
export default{
	name:'Order',
	data(){
		return{	
			orderDetail:{},
			id:'',//订单id			
			service:[],//服务项目
			discount:''//清洁电器数量
		}
	},
	methods:{
		backList(){//返回列表
			this.$router.go(-1);
		},
		cancleOrder(){
			console.log(this.id)
			this.$post('sp/order/cancelOrder/',{
				id:this.id
			}).then(data=>{
				Toast('订单已取消');
				this.$router.replace('/Order');
			})
		},
		dataFormet(data){//格式化时间
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
			return year + '-' + addaroe(month) + '-' + addaroe(day)  +' ' + addaroe(hour) + ':' + addaroe(min) ;
		},
		creatService(arr){//项目字符串转数组
			var bar = arr.split(';');
			if(bar[bar.length-1] == ''){
				bar.length = bar.length -1;
			}			
			var service = [];
			var discount = 0;
			for(var i = 0;i<bar.length;i++){
				var obj = {};
				var arrs = bar[i].split(',');				
				var project = arrs[0];
				var num = arrs[1].charAt(1);
				discount += Number(num);				
				obj.project = project;
				obj.num = num;
				service.push(obj);
			}
			this.service = service;
			this.discount = discount;//服务项目总数量			
		},
		getOrderDetail({id=this.id}={}){
			this.$post('sp/order/queryOrder',{
				id:id
			}).then(data=>{
				let obj = data.data[0];			
				this.creatService(obj.serviceItem);
				this.orderDetail = obj;			
			})
		}
	},
	created(){
		//订单列表跳转					
		if(this.$route.query.id){
			this.id= this.$route.query.id;
			this.getOrderDetail({id:this.$route.query.id})
		}
		//url  orderId跳转
		if(this.$route.query.orderId){
			this.id= this.$route.query.orderId;
			this.getOrderDetail({id:this.$route.query.orderId})
		}
		
	},
	mounted(){
			
	},
	computed:{
		classObject:function(){
			return {

			}
		}
	}
}
</script>

<style scoped>
	.c_content{width: 6.7rem;	margin: auto;}
	.top{height:0.9rem;}
	.classObject{width:0.96rem;height:0.52rem;border-radius:0.26rem;}
	.classObject span{font-size:0.2rem;}
	.shopimg img{width:2.4rem;height:1.48rem;}
	.shopimg{margin-right:0.25rem;}
	.rtext p{line-height:0.5rem;}
	.ptop{padding-left:5.2rem;line-height:0.5rem;}
	.addressBox p{height:0.5rem;line-height: 0.5rem;}	
	.backList{margin-top:0.4rem;box-shadow: 0px 0px  8px #a5a5a5;margin:0.4rem auto 0 auto;}
	.cancle{margin-top:0.2rem;box-shadow: 0px 0px 8px #ccc;color:#333;
		background: linear-gradient(#ffffff, #f1f1f1);margin:0.3rem auto 0 auto;
	}
	.cancle:active{background:#dcdcdc;color:#999;}
	.waite{background: #ff6600;}
.send{background: #0099ff;}
.complate{background: #339933;}
.cancled{background: #999;}
	
</style>