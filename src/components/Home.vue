<template>
	<div class="content">
	<div class="topTiao border-b"></div>
		<div class="btnbox">
			<div class="btn flex-wrap flex-horizontal">
				<div v-for='(v,i) in tabtext' @click="tabActive(i)" :class="[i == activeid? 'btnactive' : 'btnstyle','jianBian']" class="btntab flex-wrap flex-justify-center flex-align-center"> <span class="align_c">{{v}}</span></div>			
			</div>
		</div>
		<component :is='current' :rightsValidity='rightsValidity' :timeLength='timeLength'></component>
	</div>
</template>

<script>
	import GeneralClean from './GeneralClean'
	import Diqi from './Diqi'
	export default{
		name:'Home',
		data() {
			return {
				tabtext:['一般清洁','家电清洗'],//按钮循环对象
				activeid:0,//处于激活状态的按钮索引
				groups:['GeneralClean','Diqi'],
				current:GeneralClean,//当前组件
				rightsValidity:'',//权益有效期				
				userId:'',//用户id
				timeLength:'',//剩余权限
				openId:'NtL9yyJE3UU7E6qyKKuo/dz68y9Ke7m1pGPdreqZQlsL+7UfWz0PSZh6p/98JK9rJLL0nGfME7p+yurzoYMHmCFq/MOncjj45TZesZip+GgjtlE3R1rcDYJZ+EklVAKLDVESHHMVLEMXuYFuyC3jxg=='
				
			}
		},
		methods: {
			
		     tabActive(i){
		     	if(i == this.activeid){
		     		return false;//如果点击激活按钮，返回
		     	}else{
		     		this.activeid = i;
		     		this.current = this.groups[i];
		     	}
		     	
		     	console.log(i);
		     	
		     },
		     //根据openid获得userid
			getUserId(){	
				var self = this;
				return new Promise(function(resolve,reject){
					self.$post('/api/sp/appUser/getUserId',{
					openId:self.openId
					}).then(data=>{															
						resolve(data.data.userId);
					}).catch(err=>{
						reject(err)
					})
				
				})
			},
			//获得url地址的openid
			getOpenId(){
				var urlFull = window.location.href;
				var arg = urlFull.split('?');
				if(arg[0] == urlFull){
					return false;
				}
				
				var args = arg[1].split('&');
				for(var i =0;i<args.length;i++){
					var arr = args[i].split('=');					
					if(arr[0] == 'openId'){
						this.openId = arr[1];
					}
					if(arr[0] == 'orderId'){//有订单id,跳转到订单详情页
						this.$router.push({path:'/Orderdetail',query:{id:arr[1]}})
					}
				}				
			}
		},
		created(){
			
		},
		mounted(){
			// this.getOpenId();
			var self = this;
			this.getUserId().then(data=>{
				self.$post('/api/sp/appUser/queryUser',{
					id:data
				}).then(data=>{
					console.log(data.data)
					
					self.rightsValidity = data.data[0].rightsValidity;
					self.timeLength = data.data[0].timeLength;
					console.log(self.rightsValidity)
				})
				
			})			
			
		},
		components:{
			GeneralClean,
			Diqi
		}
	}
</script>

<style scoped>
	.content{width:100%;height:100%;overflow:scroll;}
	.btnbox {width: 100%;padding-top: 0.5rem;padding-bottom:0.6rem;background:#fff;}
	.btn {width: 5.3rem;height: 0.8rem;	margin:0 auto;background:#fff;border-radius:0.4rem;border:0.04rem solid #dddddd;overflow: hidden;}	
	.btntab {width: 50%;height:100%;text-align: center;}			
	
	.btnactive{	background: #018be6;color:#fff;}
	.btnstyle{color:#484848;}	
	/*.align_c{font-size:0.56rem;transform: scale(0.5);}*/
	.align_c{font-size:0.28rem;}
	
</style>