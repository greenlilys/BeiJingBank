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
		<component :is='current' :addressListLength='addressListLength' :addressUserName='addressUserName' :phone='phone' :address='address'></component>
		</keep-alive>
	</div>
</template>

<script>
	import GeneralClean from './GeneralClean'
	import Diqi from './Diqi'
	import {mapGetters,mapActions} from 'vuex';
	export default{
		name:'Home',
		data() {
			return {
				tabtext:['一般清洁','家电清洗'],//按钮循环对象
				activeid:0,//处于激活状态的按钮索引
				groups:['GeneralClean','Diqi'],
				current:GeneralClean															
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
			}		   			
		},
		created(){
			//是否是我的页面设置地址之后返回的			
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
				this.getAddressList();
			}					
			
		},
		computed:{
		...mapGetters([	'userId','addressUserName','address','phone','addressListLength'])
		},		  
		mounted(){	
			
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