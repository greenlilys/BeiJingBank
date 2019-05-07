<template>
		<div id="content" class="color_back_gray">
			<div class="pb_40 mb_20 color_back_white border-b">
				<div class="f_content">					
					<div class="server flex-wrap flex-horizontal">
						<div class="flex-con"><img src="../assets/images/pic.png" alt=""></div>
						<div class="flex-con">
							<h1 class="color_blue">基础保洁服务</h1>
							<p class="color_gray">欢迎预约华夏中青家政提供的基础保洁服务。请尽早预约，便于我们及早规划安排。</p>
						</div>
					</div>
					<p class="mt_50 mb_20 font_28"><span class="color_regu">剩余权限：</span><span class="color_gray">{{timeLength}}</span></p>
					<p class="font_28"><span class="color_regu">权益有效期：</span><span class="color_gray">{{rightsValidity}}</span></p>
					<div class="font_28 mt_40 flex-wrap flex-horizontal flex-align-center">
						<span class="color_regu">
	        				服务时长：
	        			</span>	        			
						<div class="inputbox flex-wrap flex-horizontal">
							<div class="pre flex-wrap flex-justify-center flex-align-center" @click="prenum"><span class="sets">-</span></div>
							<div class="num flex-wrap flex-justify-center flex-align-center"> <span class="sets">{{grneralSerLen}}</span></div>
							<div class="add flex-wrap flex-justify-center flex-align-center" @click="addnum"><span class="sets">+</span></div>
						</div>
					</div>
				</div>
			</div>

			<div class="second mb_20 color_back_white border-bs border-t font_28">
				<div class="f_content">
					<div class="flex-wrap flex-horizontal flex-align-center">
						<span>日期选择：</span>
						<div class="datay input-b flex-con" @click="openPicker">						
							<input class="input_border font_28 color_regu" type="text"  v-model="pickerdata" placeholder="请选择您需要服务的日期" />
							<div class="arrowup"><img src="../assets/images/uparrow.png" alt="" /></div>
						</div>
					</div>	
					
					<div class="flex-wrap flex-horizontal flex-align-center">
						<span>选择时间：</span>
						<div class="datay input-b flex-con" @click="openPickerTime">						
							<input class="input_border font_28 color_regu" type="text" v-model="pickertime" placeholder="上门时间每日早8点到晚18点" />
							<div class="arrowup"><img src="../assets/images/uparrow.png" alt="" /></div>
						</div>
					</div>	
					
					<div>	
						<mt-datetime-picker						 
						  type="date"
						  ref="picker"
						  year-format="{value} 年"
						  month-format="{value} 月"
						  date-format="{value} 日"
						  :startDate="startDate"
						  @confirm="dataConfirm">
						</mt-datetime-picker>	

						  <mt-datetime-picker						 
						  type="time"
						  ref="pickertime"	
						  :startHour='8'
						  :endHour='18'					  
						  hour-format="{value} 时"
						  minute-format="{value} 分"
						  @confirm="timeConfirm"
						  >
						</mt-datetime-picker>					
					</div>
				</div>				
			</div>

			<div class=" pb_30 mb_20 color_back_white border-b border-t">

				<div class="address pt_20 pb_30 flex-wrap flex-horizontal flex-justify-between flex-align-center"
				 v-if="addressListLength == 0" @click="setAddress">
					<div class="color_regu">
						<h1 class="name font_28">请设置服务地址</h1>						
					</div>
					<div>
						<img class="addresarrow" src="../assets/images/arrow.png" alt="" />
					</div>
				</div>

				<div class="address pt_40 pb_30 flex-wrap flex-horizontal flex-justify-between flex-align-center" @click="navAddList" v-else>
					<div class="color_regu">
						<h1 class="name font_28"><span>{{addressUserName}}</span><span class="ml_20">{{phone}}</span></h1>
						<h2 class="addre font_28">{{address}}</h2>
					</div>
					<div>
						<img class="addresarrow" src="../assets/images/arrow.png" alt="" />
					</div>
				</div>

				
				
				<div class="meet actived jianBian_blue flex-wrap flex-align-center flex-justify-center" @click="creatOrder"><span>立即预约</span></div>
			</div>

			<div class="pt_40 pb_40 color_back_white border-t">
				<div class="f_content">
					<h1 class="serverdetail">服务说明：</h1>
					<p class="houseserver" style="text-align:justify;" v-html="content1"></p>				
				</div>
			</div>
			<div class="zhezhaobox" v-if="isShow">
				<div class="zhezhao">
					<div class="head border-b">
						温 馨 提 示
					</div>
					<div class="zhecontent">
	尊敬的北京银行贵宾客户，您好！<br/>
	作为北京银行签约家政服务商，华夏中青家政非常荣幸能够为您提供家政服务。以下事项敬请知会：<br/>
	一、服务内容<br/>
	1. 北京银行为您购买的家政服务包括基础保洁服务和精致/专项保洁服务二大类，您可在您的服务权益时长范围之内进行选择。<br/>
	2. 不在家政保洁服务范围内的有：字画、古董、宗教陈设、易损易碎摆件。天花板及附属品，如吊灯、吊顶等。家具内部物品的清洁和摆放。<br/>
	3. 家政保洁服务不提供收纳整理（如整理生活用品、整理文件书籍、叠衣服等）服务，所有物件清理完毕后放置回原位、摆放整齐。<br/>
	4. 卫生间、厨房的吊顶多为PVC扣板和铝扣板，在碰触的情况下容易移动。如果您执意要清洁，那么扣板移位及移位可能发生物品或人身损害的责任由您自行承担。<br/>
	5. 吊顶、柜顶、墙体上端的清洁需要实施一定的安全保障措施。如果您执意要清洁，请提供稳固的人字梯或协助扶住踩高凳，并承担相应的安全责任。<br/>
	6. 由于家政保洁服务的对象是物品表面，不得使用螺丝刀等五金工具拧开后进行拆卸清洁。如果您执意要做，请提供螺丝刀等工具，由此产生的拧开后可能安装不回去等后果，由您自行承担。<br/>
	二、服务纪律<br/>
	1. 我们要求家政员工作期间不聊天、不推介、不喝客户的饮品、不吃客户的东西、不拿客户的物品，敬请知会并配合，请不要请我们保洁人员吃饭或送给礼品。<br/>
	2. 我们的家政员大多来自贫困农村，服务首善之都，尤其是北京银行贵宾客户家庭是非常有挑战性的。如有服务不符合您要求的地方，请多包含，如能给予些许鼓励，我们不胜感激！<br/>
	3. 我们对于服务的时长和是否满意，以您的签字确认为准。<br/>
	4. 如果您觉得服务很满意，欢迎给予表扬的评语，这是我们的服务人员晋升和奖励的重要依据，谢谢。<br/>
	5.如果您感觉服务不满意，不用在我们的派工单上签字，请现场致电400-831-8733转2，我们的投诉处理专员会为您及时解决问题。<br/>
	6．如需再次预约北京银行的剩余权益，请通过北京银行的微信公众号或手机银行APP进行预约，不要与家政员口头约定。<br/>
	7. 如果保洁过程中由于工作失误造成物品损坏，家政员承担赔偿责任。需要在现场对损坏物品进行核实，对损坏的部位和品牌进行拍照，并以此做为认定保洁员责任的依据，否则无法确认物品损害的责任归属，敬请理解。<br/>
	8. 请在我们家政员工作结束离开时，配合家政员检查其随身携带的物品。这是对您财物安全的保护，也是对我们劳动的尊重和保护，避免日后出现说不清道不明的尴尬。该项检查不得搜身。如果您放弃这种权利，我们视为家中财物安全，请理解。<br/>非常感谢您的耐心阅读，衷心祝愿工作顺利，身体健康，阖家幸福！<br/>
					</div>
					<div class="bottombtn border-t">
						<div class="cancle color_back_gray" @click="cancle">取 消</div>
						<div class="sure color_back_blue" @click="sure">确 定</div>
					</div>
				</div>
			</div>
		</div>
	
</template>

<script>
import { Toast } from 'mint-ui';
import {mapGetters,mapActions} from 'vuex';
	export default {
		data() {
			return {
				startDate:new Date(new Date().getTime() + 172800000),
				isShow:false					
			}
		},
		methods: {
			...mapActions([
			'addnum','prenum'
			]),
			openPicker() {//打开年月日选择器
		        this.$refs.picker.open();
		     },
		     openPickerTime(){//打开时分选择器
		     	this.$refs.pickertime.open();
		     },
		     dataConfirm(val){
				 this.$store.commit('dataConfirm',{pickerdata:val})				
		     },
		     timeConfirm(val){
				 this.$store.commit('timeConfirm',{pickertime:val})	
		     },	    
		    
			setAddress(){
				// 用户没有设置地址，跳转到地址表单页				
				this.$router.push({path:'/Addaddress',query:{type:1}});				
			},
			navAddList(){
				//用户有地址，进行地址切换，跳转到我的页面,addressActive设置为true，地址列表可点击切换
				this.$router.push({path:'/My',query:{type:1}});
				this.$store.commit('setAddActive',{addressActive:true});
			},
			//创建订单
			creatOrder(){
				if(!this.pickerdata){
					Toast('请填写预约日期');
					return false;
				}
				if(!this.pickertime){
					Toast('请填写预约时间');
					return false;
				}
				if(this.showSetAddress || !this.address){
					Toast('请设置服务地址');
					return false;
				}	
				if(this.grneralSerLen > this.timeLength){
					Toast('剩余时长不足');
					return false;
				}		
				this.isShow = true;	
				
			},
			sure(){//确定
				this.isShow = false;
				let bar = this.pickerdata.split('-');
				let foo = this.pickertime.split(':');
				let y = Number(bar[0]);
				let m = Number(bar[1])-1;
				let d = Number(bar[2]);
				let h = Number(foo[0]);
				let t = Number(foo[1]);				
				let result = new Date(y,m,d,h,t).getTime();						
				let resultTime = this.pickerdata + ' ' + this.pickertime;
				this.$post('sp/order/createOrder',{
					address:this.id,
					appointmentTime:result,//下单时间
					appointmentTimeLength:this.appointmentTimeLength,//预约时长
					type:'1',
					userId:this.userId				
				}).then(data=>{
					if(data.errcode == 200){
						Toast('预约成功');
						this.$store.commit('setRightsValidity');
						 this.$router.replace('/Order');
					}
				})				
			},
			cancle(){
				this.isShow = false;
			}	   
		},		
		computed:{
			...mapGetters([
				'timeLength','rightsValidity','grneralSerLen','userId','pickerdata','pickertime','id','appointmentTimeLength','addressListLength'
			])
		},
		props:['addressUserName','phone','address','content1'],
		created(){
			
		},
		mounted(){			
		}
		
	}
</script>

<style scoped>
	#content {width:100%;}	
	#top {height: 0.88rem;line-height: 0.88rem;width: 100%;	position: relative;	}	
	#bottom {background-color: #88D6E9;height: 0.98rem;	line-height: 0.98rem;width: 100%;font-size: 0.28rem;}	
	.f_content,.address {width: 6.7rem;	margin:0 auto;}	
	.server {width: 100%;}	
	.server div:nth-child(1) {width: 3.35rem;height: 2.05rem;}	
	.server div:nth-child(1) img {width: 100%;height: 100%;}	
	.server div:nth-child(2) p {font-size: 0.28rem;	line-height: 0.4rem;text-align: justify;padding-left:0.28rem;}	
	.server div:nth-child(2) h1 {font-size: 0.28rem;line-height: 0.5rem;font-weight: 700;padding-left:0.28rem;}	
	.auth {	margin-top: 0.5rem;	margin-bottom: 0.3rem;}		
	.addre,	.name {	line-height: 0.52rem;}	
	.addresarrow{width:0.33rem;height:0.62rem;}	
	.serverdetail{font-size:0.3rem;font-weight:bolder;color:#333;margin-bottom:0.2rem;}
	.houseserver{line-height:0.38rem;color:#666;font-size:0.28rem;}		
	/*input::-webkit-input-placeholder{color:#999;}*/	
	.border-bs{ position:relative; }
	.border-bs:after{content: ''; position: absolute; left: 0;right:0;
	background: #ddd;height: 0.02rem;-webkit-transform: scaleY(0.5);
	transform: scaleY(0.5);bottom:-0.01rem;-webkit-transform-origin: 0 0;transform-origin: 0 0; }
	
	
</style>