<template>
	<div class="w_100">
	<div class="topTiao border-b"></div>
		<div class="color_back_white">
			<div class="c_content pt_30 pb_30 hcenter">
					<mt-field label="联系人：" placeholder="请输入联系人" v-model="addressUserName"></mt-field>
					<mt-field label="服务地址：" placeholder="请输入服务地址" type="text" v-model="address"></mt-field>
					<mt-field label="联系电话：" placeholder="请输入联系电话" type="text" v-model="phone"></mt-field>
					<mt-field label="短信验证码：" placeholder="请输入验证码" v-model="smsCode">
					
						<mt-button class="getcode flex-wrap flex-align-center flex-justify-center" :class="[!isShowBg ? 'codeBtnBg' : 'color_back_blue','color_white']" :disabled='isdisabled' @click="getCode">
							<span class="font_28">{{codeText}}<span v-show="isdisabled">s</span></span>
						</mt-button>
								
					</mt-field>					
			</div>
		</div>	

		<div class="meet actived jianBian_blue flex-wrap flex-align-center flex-justify-center" @click="sendAddress"><span>确认</span></div>
	
	</div>
</template>
<script>
import { Toast } from 'mint-ui';
import {mapGetters,mapActions} from 'vuex';
	export default{
		data(){
			return{
				// userName:'',
				id:'',//地址id
				address:'',//地址
				phone:"",//电话
				addressUserName:'',//服务人姓名
				smsCode:'',//验证码				
				isShowBg:false,
				isdisabled:false,
				codeText:'获取验证码',
				interObj:null,
				isCreate:true
			}
		},
		created(){
			console.log(this.$route.query);
			if(this.$route.query.type){//如果用户没有地址，下单时第一次创建地址，传过来的type
					this.type = this.$route.query.type;			
			}	
			if(JSON.stringify(this.$route.query) == '{}'){
				this.isCreate = true;//创建地址
				return false;
			}
			this.isCreate = false;//编辑地址
			let parameter = this.$route.query;
			this.id = parameter.id;
			this.phone = parameter.phone;
			this.address = parameter.address;
			this.addressUserName = parameter.addressUserName;
			if(/^1[34578]\d{9}$/.test(this.phone)){
				this.isShowBg = true; //激活验证码按钮
			}
			
		},
		mounted(){
			
		},
		methods:{
			//获得验证码
			getCode(){
				if(!this.phone){
					Toast('请输入手机号码');
					return false;
				}
				if(!this.isShowBg){
					Toast('手机号码输入有误');
					return false;
				}
				this.$post('sp/appUser/sendSms',{
					phone:this.phone
				}).then(data=>{
					if(data.errcode.toString() == '200'){
						this.isdisabled = true;//禁用按钮
						this.codeText = 60;
						Toast('短信已发送');
						this.interObj = window.setInterval(this.setTime,1000);
					}else{
						Toast('获取验证码失败');
					}
					console.log(data);
				})
			},
			setTime(){
				if(this.codeText == 0){
					window.clearInterval(this.interObj);
					this.isdisabled = false;//恢复按钮点击
					this.codeText = '重新发送';
				}else{
					this.codeText--;
				}
			},
			//确认
			sendAddress(){
				if(!this.testForm()) return false;
				if(this.isCreate){//创建地址
					this.$post('sp/appUser/createAddress',{
						userId:this.userId,						
						address:this.address,
						phone:this.phone,
						addressUserName:this.addressUserName,
						smsCode:this.smsCode
					}).then(data=>{
						console.log(data)
						Toast('添加成功');
						this.$router.replace('/My');
					})
				}else{//编辑地址
					this.$post('sp/appUser/editAddress',{
					userId:this.userId,
					id:this.id,
					address:this.address,
					phone:this.phone,
					addressUserName:this.addressUserName,
					smsCode:this.smsCode
					}).then(data=>{
						console.log(data)
						Toast('编辑成功');						
						this.$router.replace('/My');
					})
				}
				
			},
			testForm(){
				if(!this.smsCode){
					Toast('请输入验证码');
					return false;
				}
				if(!(/^\d{6}$/.test(this.smsCode))){
					Toast('验证码输入错误');
					return false;
				}
				if(!this.addressUserName){
					Toast('请输入联系人');
					return false;
				}
				if(!this.address){
					Toast('请输入服务地址');
					return false;
				}
				if(!this.phone){
					Toast('请输入联系电话');
					return false;
				}
				return true;
			}
			
			
		},
		watch:{
			phone:function(newVal,oldVal){
				console.log(newVal)
				if(!(/^1[34578]\d{9}$/.test(newVal))){ 
					this.isShowBg = false;
			        			        
			    } else{
			    	this.isShowBg = true;
			    }
			}
		},
		computed:{
			...mapGetters([
				'userId'
			])
		}
	}
</script>
<style scoped>
.getcode{height:0.96rem;text-align:center;width:2rem;
	display: flex;justify-content: center;align-items: center;}
	.hcenter{line-height: 0.4rem;}
	.meet{margin:0.4rem auto 0 auto;}
	.codeBtnBg{background:#65C1FF;color:#fff;}	
	
</style>