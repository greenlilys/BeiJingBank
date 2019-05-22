<template>
<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :top-distance="topDis" 
:bottom-distance="botDis" :auto-fill="false" :topPullText='pullText' :topDropText='dropText' :topLoadingText='loadingText' ref="loadmore" class="font_28 color_gray">
	<div class="w_100">
		<div class="color_back_blue person">
			<div class="vipBox flex-wrap flex-horizontal flex-justify-center flex-align-center">
				<div><img src="../assets/images/vip.png" alt=""></div>
			</div>
			<div class="flex-wrap flex-vertical flex-justify-center bottombox">
				<div class="items flex-wrap flex-horizontal">
					<template v-for = "(item,index) in numobj">
						<div  class="color_white flex-con flex-vertical flex-justify-around borderR" :key='index'>
							<p class="font_36 color_white">{{item.nums.length>6 ? item.nums.toString().slice(-6) : item.nums}}</p>
							<p class="font_28 color_white">{{item.tests}}</p>
						</div>
					</template>
				</div>
			</div>
		</div>

		<div class="mt_20 color_back_white border-t border-bot">
			<div class="c_content address color_regu flex-wrap flex-horizontal flex-justify-between flex-align-center">
				<div class="lcon">服务地址</div>
				<div class="add flex-wrap flex-align-center flex-justify-center" @click="addAddress">
					<span class="font_28">添加</span>
				</div>
			</div>
		</div>
		<template  v-for="(item,index) in addressList">
			<div class="color_back_white border-bot font_28" :key="index">
				<div class="c_content addressBox pt_20 pb_20" @click="setServiceAdd(item.addressUserName,item.phone,item.address,item.id)">
					<p class="color_regu"> <span>{{item.addressUserName}}</span><span class="ml_20">{{item.phone}}</span></p>
					<p class="flex-wrap flex-horizontal flex-justify-between">
						<span class="color_regu">{{item.address}}</span>
						<span class="color_gray edit" @click.stop="editAddress(item.phone,item.address,item.addressUserName,item.flag,item.id)">编辑</span>
					</p>
				</div>
			</div>		
		</template>			
	</div>
</mt-loadmore>
</template>

<script>
import { Toast } from "mint-ui";
import {mapGetters,mapActions} from 'vuex';
export default{
	name:'My',
	data(){
		return{
			numobj:[{nums:0,tests:'我的权益码'},{nums:0,tests:'剩余时长'},{nums:0,tests:'订单数量'}],
			addressList:[],		
			type:'',//是从一般清洁或者家电清洁跳转过来0：家电   1一般
			pageNo:1,
			totalPage:1,//地址总页数
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
		//添加地址
		addAddress(){
			this.$router.push({path:'/Addaddress',query:{}})
		},
		//获得用户地址列表-->绑定用户订单数量
		getAddressList({userId=this.userId,pageNo=this.pageNo,pageSize=10}={}){						
			if(this.pageNo > this.totalPage){//当前加载页码大于总页码
				this.allLoaded = true;//禁止上拉加载
				Toast('到底了');
				return false;				
			}
			this.$post('sp/appUser/queryAddress',{
				userId:userId,
				pageNo:pageNo,
				pageSize:pageSize
			}).then(data=>{	
				if(this.pageNo == 1){
					this.addressList = data.data;				
				}else{					
					this.addressList = this.addressList.concat(data.data);
				}	
				this.pageNo++;		
				this.totalPage = Math.ceil(data.pageCount/10);				
			})
		},
		loadBottom() {//上拉加载	
		 console.log('bottom')
		 this.getAddressList();
		  this.$refs.loadmore.onBottomLoaded();		  		 		
		},
		loadTop(){//下拉刷新	
			console.log('top')
			this.pageNo = 1;
			this.getAddressList();
			this.$refs.loadmore.onTopLoaded();			
		},
		//编辑地址
		editAddress(phone,address,addressUserName,flag,id){
			this.$router.push({path:'/Addaddress',query:{			
				phone:phone,
				address:address,
				addressUserName:addressUserName,
				flag:flag,
				id:id
			}})
		},
		//设置为服务地址
		setServiceAdd(addressUserName,phone,address,id){
				let type = this.type || 1;			
				this.$router.replace({path:'/Home',query:{type:type,addressUserName:addressUserName,phone:phone,address:address,id:id}});		
						
		},
		//查询订单列表,获取用户订单数
		getOrderList({userId=this.userId,pageNo=1,pageSize=10}={}){			
			this.$post('sp/order/queryOrder',{
				userId:userId,
				pageNo:pageNo,
				pageSize:pageSize
			}).then(data=>{				
				let nums = data.pageCount || 0;
				// this.$set(this.numobj,2,{nums:nums,tests:'订单数量'})			
				this.numobj[2].nums = nums;		
			})
		}
	},	
	created(){	
		//判断是否是Home页面过来设置地址
		if(this.$route.query && this.$route.query.type){
			this.type = this.$route.query.type;			
		}	
		this.numobj[0].nums = this.bjUserId;
		this.numobj[1].nums = this.timeLength;	
		this.getAddressList();
	},
	mounted(){		
		this.getOrderList();			
			
	},
	computed:{
		...mapGetters([
				'userId','timeLength','bjUserId'
			])
	}
}
</script>

<style scoped>

.person{height:4.3rem;}
.vipBox{height:2.54rem;}
.vipBox div{width:1.6rem;height:1.6rem;}
.vipBox img{width:1.6rem;height:1.6rem;display:block;}
.bottombox{height:1.76rem;}
.items{height:0.9rem;}
.items p{text-align:center;}
.borderR{border-right:1px solid #fff;}
.items div:last-child{border-right:none;}
.borderR p:nth-child(1){padding-bottom:0.05rem;}
.borderR p:nth-child(2){padding-top:0.05rem;}
.address{height:0.9rem;}
.lcon{font-size:0.3rem;font-weight:bolder;}
.add{
			
	width:1rem;
	height:0.54rem;
	background:#f5f5f5;
	border-radius:0.06rem;
	box-shadow: 0px 0px 0.08rem #ccc;
	
}

.addressBox p{height:0.5rem;
	line-height: 0.5rem;}
.edit{padding-left:0.2rem;}

.border-top,.border-bot{ position:relative; }
.border-top:before,.border-bot:after{content: ''; position: absolute; left: 0;right:0;
background: #ddd;height: 0.02rem;-webkit-transform: scaleY(0.5);
transform: scaleY(0.5); 
 /*-webkit-transform-origin: left bottom;transform-origin: left bottom;    */
}
.border-bot:after{ bottom:0;-webkit-transform-origin: 0 0;transform-origin: 0 0;}
.border-top:before{top:0;-webkit-transform-origin: 0 0;transform-origin: 0 0;}
</style>