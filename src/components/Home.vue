<template>
	<div class="content">
	<div class="topTiao border-b"></div>
		<div class="btnbox">
			<div class="btn flex-wrap flex-horizontal">
				<template  v-for='(v,i) in tabtext'>
					<div @click="tabActive(i)" :class="[i == activeid? 'btnactive' : 'btnstyle','jianBian']" class="btntab flex-wrap flex-justify-center flex-align-center" :key="i"> <span class="align_c">{{v}}</span></div>			
				</template>				
			</div>
		</div>
		<keep-alive>		
		<component :is='current' :addressUserName='addressUserName' :phone='phone' :address='address' :content2='content2' :content1='content1'></component>
		</keep-alive>
	</div>
</template>

<script>
	import GeneralClean from './GeneralClean';
	import Diqi from './Diqi';
	import {mapGetters,mapActions} from 'vuex';
	export default{
		name:'Home',
		data() {
			return {
				tabtext:['一般清洁','家电清洗'],//按钮循环对象
				activeid:0,//处于激活状态的按钮索引
				groups:['GeneralClean','Diqi'],
				current:GeneralClean,
				content2:'无',//描述说明
				content1:'无'																			
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
			 },
			 //获得用户地址列表
			getAddressList(){			
				this.$post('sp/appUser/queryAddress',{
					userId:this.userId
				}).then(data=>{					
					if(data.data.length == 0){
						//用户没有地址 设置地址数量0
						this.$store.commit('setAddLen',{addressListLength:0})
					}else{
						//用户有地址，设置地址列表第一个为默认地址
						let addressObj = data.data[0];					
						this.$store.commit('setJerAdd',{
							addressUserName:addressObj.addressUserName,
							phone:addressObj.phone,
							address:addressObj.address,
							id:addressObj.id,
							addressListLength:data.data.length
						})
					}					
				})				
			},		
			//查询服务说明
			getServiceText2(){
				this.$post('sp/serviceItem/queryDescription',{
					type:'2'
				}).then(data=>{					
					if(data.data.length>0 && data.data[0].content){
						this.content2 = data.data[0].content;
					}					
				})
			},
				getServiceText1(){
				this.$post('sp/serviceItem/queryDescription',{
					type:'1'
				}).then(data=>{				
					if(data.data.length>0 && data.data[0].content){
						this.content1 = data.data[0].content
					}					
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
				console.log(args)	
				var obj = {};
				for(var i =0;i<args.length;i++){
					var arr = args[i].split('=');	
					// obj[decodeURIComponent(arr[0])]	= decodeURIComponent(arr[1]).replace(/\s+/g,'+');
					obj[arr[0]]	= arr[1];									
				}
				console.log(JSON.stringify(obj))
				if(obj.openId){
					console.log(obj.openId)
					this.$store.commit('getmsg',{openId:obj.openId});
				}				
				if(obj.orderId){
					this.$router.push({path:'/Orderdetail',query:{orderId:decodeURIComponent(arr[1])}})
				}
									
			}		   			
		},
		created(){			
			this.getOpenId();		
			//是否是我的页面设置地址之后返回的	
			console.log(this.$route.query.type)		
			if(this.$route.query.type == 1 || this.$route.query.type == 0){
				let queryObj = this.$route.query;
				if(queryObj.type == 0){//家电清洁
					this.current = 'Diqi';
					this.activeid = 1;										
				}else{
					this.current = 'GeneralClean';
					this.activeid = 0;
				}					
				this.$store.commit('userChioceAdd',{
					addressUserName:queryObj.addressUserName,
					phone:queryObj.phone,
					address:queryObj.address,
					id:queryObj.id
				})								
			}else{
				if(this.userId){
					this.getAddressList();
				}												
			}					
			
		},
		computed:{
		...mapGetters([	'userId','addressUserName','address','phone'])
		},		  
		mounted(){	
			this.getServiceText1();
			this.getServiceText2();
		},
		watch:{
			userId:function(newVal,oldVal){
				if(newVal){
					// console.log('newVal')
					this.getAddressList();
				}
			}
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