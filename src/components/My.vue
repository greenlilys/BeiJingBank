<template>

	<div class="w_100">
	
		<div class="color_back_blue person">
			<div class="vipBox flex-wrap flex-horizontal flex-justify-center flex-align-center">
				<div><img src="../assets/images/vip.png" alt=""></div>
			</div>
			<div class="flex-wrap flex-vertical flex-justify-center bottombox">
				<div class="items flex-wrap flex-horizontal">
					<div v-for="(item,index) in numobj" class="color_white flex-con flex-vertical flex-justify-around borderR">
						<p class="font_36 color_white">{{item.nums}}</p>
						<p class="font_28 color_white">{{item.tests}}</p>
					</div>
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

		<div class="color_back_white border-bot font_28" v-for="item in addressList">
			<div class="c_content addressBox pt_20 pb_20">
				<p class="color_regu"> <span>{{item.userName}}</span><span class="ml_20">{{item.phone}}</span></p>
				<p class="flex-wrap flex-horizontal flex-justify-between">
					<span class="color_regu">{{item.address}}</span>
					<span class="color_gray edit" @click="editAddress(item.phone,item.address,item.addressUserName,item.id)">编辑</span>
				</p>
			</div>
		</div>
	
	</div>

</template>

<script>
import { Loadmore } from 'mint-ui'
export default{
	name:'My',
	data(){
		return{
			numobj:[
				{
					nums:'032',
					tests:'我的权益码'
					
				},
				{
					nums:'032',
					tests:'剩余时长'
					
				},
				{
					nums:'032',
					tests:'订单数量'
					
				}
			],
			addressList:[]
		
		}
	},
	methods:{
		//添加地址
		addAddress(){
			this.$router.push({path:'/Addaddress',query:{}})
		},
		//获得用户地址列表
		getAddressList(){			
			this.$post('/api/sp/appUser/queryAddress',{
				userId:'27d2ecc5b92640dbbe895922e0bb85b3'
			}).then(data=>{				
				this.addressList = data.data;
			})	
			
		
		},
		//编辑地址
		editAddress(phone,address,addressUserName,id){
			this.$router.push({path:'/Addaddress',query:{			
				phone:phone,
				address:address,
				addressUserName:addressUserName,
				id:id
			}})
		}
	},
	mounted(){
		this.getAddressList();


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