<template>
	<div class="dianqi color_back_gray">
		<div class="contentBox border-b color_back_white">
			<div class="content pb_40">			
				<div class="server flex-wrap flex-horizontal">
					<div class="flex-con"><img src="../assets/images/dianqi.png" alt=""></div>
					<div class="flex-con">
						<h1 class="color_blue">家电清洗服务</h1>
						<p class="color_gray">为尊贵的您提供专业可靠的家电清洗服务，请尽早预约，便于我们及早规划安排。</p>
					</div>
				</div>
				
				<p class="mt_50 mb_20 font_28"><span class="color_regu">剩余权限：</span><span class="color_gray">{{timeLength}}</span></p>
				<p class="font_28"><span class="color_regu">权益有效期：</span><span class="color_gray">{{rightsValidity}}</span></p>
				<div class="font_28 mt_40 flex-wrap flex-horizontal mr_20">				
					<div><span class="servertitle color_regu">服务项目：</span></div>
					<div class="flex-wrap flex-vertical">
						<template v-for="(item,index) in Project">
							<div class="mb_10 flex-wrap flex-horizontal flex-align-center" :key="index">
								<span class="color_gray flex-con">{{item.name}}</span>
								<div class="inputbox ml_20 flex-wrap flex-horizontal">
									<div class="pre flex-wrap flex-justify-center flex-align-center" @click="prenums(item.id)"><span class="sets">-</span></div>
									<div class="num flex-wrap flex-justify-center flex-align-center"> <span class="sets">{{item.num}}</span></div>
									<div class="add flex-wrap flex-justify-center flex-align-center" @click="addnums(item.id)"><span class="sets">+</span></div>
								</div>							
							</div>
						</template>	
					</div>				
				</div>
				<p class="mt_40 font_28"><span class="color_regu">服务时常：</span><span class="color_gray"><span style="color:#0099ff;">{{serviceLength}}</span>小时</span></p>
			</div>
		</div>
		
		<div class="border-b border-t w_100 color_back_white mb_20">
			<div class="content" style="color:#ff6600;">
				<p class="font_28 pt_30" style="line-height: 0.5rem;">1、任选1台折合权益时间为4小时</p>
				<p class="font_28" style="line-height: 0.5rem;padding-bottom:0.24rem">2、任选3台折合权益时间为10小时（推荐）</p>
			</div>
		</div>
		
		<div class="second mb_20 color_back_white border-b border-t font_28">
				<div class="f_content">
					<div class="flex-wrap flex-horizontal flex-align-center">
						<span>日期选择：</span>
						<div class="datay input-b flex-con" @click="openPicker">						
							<input class="input_border font_28 color_regu" type="text" v-model="pickerdatas" placeholder="请选择您需要服务的日期" />
							<div class="arrowup"><img src="../assets/images/uparrow.png" alt="" /></div>
						</div>
					</div>	
					
					<div class="flex-wrap flex-horizontal flex-align-center">
						<span>选择时间：</span>
						<div class="datay input-b flex-con" @click="openPickerTime">						
							<input class="input_border font_28 color_regu" type="text" v-model="pickertimes" placeholder="上门时间每日早8点到晚18点" />
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
						  @confirm="dataConfirms">
						</mt-datetime-picker>	

						  <mt-datetime-picker						 
						  type="time"
						  ref="pickertime"
              :startHour='8'
						  :endHour='18'	
						  hour-format="{value} 时"
						  minute-format="{value} 分"
						  @confirm="timeConfirms"
						  >
						</mt-datetime-picker>					
					</div>
				</div>				
			</div>

			<div class="mb_20 color_back_white border-b border-t pb_30">				
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

		<div class="meet actived jianBian_blue flex-wrap flex-align-center flex-justify-center" @click=creatOrder><span>立即预约</span></div>
	</div>

	<div class="pt_40 pb_40 color_back_white border-t">
		<div class="f_content">
			<h1 class="serverdetail">服务说明：</h1>
			<p class="houseserver" style="text-align:justify;">{{content2}}</p>
			<!-- <p class="houseserver mt_20" style="text-align:justify;"></p> -->
		</div>
	</div>
</div>
</template>

<script>
import { Toast } from "mint-ui";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      startDate: new Date(new Date().getTime() + 259200000)
    };
  },
  methods: {
    openPicker() {
      //打开年月日选择器
      this.$refs.picker.open();
    },
    openPickerTime() {
      //打开时分选择器
      this.$refs.pickertime.open();
    },
    creatOrder() {
      if(!this.pickerdatas){
					Toast('请填写预约日期');
					return false;
				}
				if(!this.pickertimes){
					Toast('请填写预约时间');
					return false;
        }
        if(this.showSetAddress || !this.address){
					Toast('请设置服务地址');
					return false;
        }
        if(this.serviceLength > this.timeLength){
          Toast('剩余时长不足');
					return false;
        }
				let bar = this.pickerdatas.split('-');
				let foo = this.pickertimes.split(':');
				let y = Number(bar[0]);
				let m = Number(bar[1])-1;
				let d = Number(bar[2]);
				let h = Number(foo[0]);
				let t = Number(foo[1]);
        let result = new Date(y,m,d,h,t).getTime();
        let Project = this.Project;
        let serviceItem = '';
         let serviceItems = '';
        for(let i =0,len=Project.length;i<len;i++){
          if(Project[i].num > 0){
            serviceItem += Project[i].name + ',(' + Project[i].num + ');';
            serviceItems += Project[i].id + ',' + Project[i].num + ';';
          }
        }    
        // console.log(this.id);
      this.$post("sp/order/createOrder", {
        address: this.id,
        appointmentTime: result,//下单时间
        type: 0,
        userId: this.userId,        
        appointmentTimeLength:this.serviceLength,//预约时长
        serviceItem: serviceItem,
        serviceItems: serviceItems
        // userName:''
      }).then(data => {
        if(data.errcode == 200){
            Toast('预约成功');
            this.$store.commit('setRightsValidity');
            this.$router.replace('/Order');
					}
      })
      // .catch(err=>{
			// 			Toast('预约失败')
			// });
    },
    dataConfirms(val) {
      this.$store.commit("dataConfirms", { pickerdatas: val });
    },
    timeConfirms(val) {
      this.$store.commit("timeConfirms", { pickertimes: val });
    }, 
   
    //  减少 id:当前选择服务项目id
    prenums(id) {
      this.$store.commit("prenums", { id: id });
    },
    //  增加
    addnums(id) {
      this.$store.commit("addnums", { id: id });
    },
    setAddress() {
      // 用户没有设置地址，跳转到地址表单页    
        this.$router.push({ path: "/Addaddress", query: { type: 0 } });
     
    },
    navAddList() {
      //用户有地址，进行地址切换
      this.$router.push({ path: "/My", query: { type: 0 } });
      this.$store.commit("setAddActive", { addressActive: true });
    }
  },
  computed: {
    ...mapGetters([
      "timeLength",
      "rightsValidity",
      'userId',
      "pickerdatas",
      "pickertimes",
      "Project",
      "serviceLength",
      "id",     
      'addressListLength'
    ])
  },
  created() {    
    if(this.Project.length == 0){//如果vuex里面有Project,则不重新创建,使用vuex数据
      this.$store.dispatch("serviceProject");
    }   
  },
  mounted() {}, 
  props: [     
    "addressUserName",
    "phone",
    "address",
    'content2'
  ]
};
</script>

<style scoped>

.dianqi {
  width: 100%;
}
.contentBox {
  width: 100%;
}
.content {
  width: 6.7rem;
  margin: auto;
}
.server {
  width: 100%;
}
.server div:nth-child(1) {
  width: 3.35rem;
  height: 2.05rem;
}
.server div:nth-child(1) img {
  width: 100%;
  height: 100%;
}
.server div:nth-child(2) p {
  font-size: 0.28rem;
  line-height: 0.4rem;
  text-align: justify;
  text-indent: 0.54rem;
  padding-left: 0.28rem;
}
.server div:nth-child(2) h1 {
  font-size: 0.28rem;
  line-height: 0.5rem;
  font-weight: 700;
  padding-left: 0.28rem;
}
.servertitle {
  padding-top: 0.16rem;
  display: block;
}
.mt_10 {
  margin-top: 0.1rem;
}
.f_content,
.address {
  width: 6.7rem;
  margin: auto;
}

.addre,
.name {
  line-height: 0.52rem;
}
.addresarrow {
  width: 0.33rem;
  height: 0.62rem;
}

.serverdetail {
  font-size: 0.3rem;
  font-weight: bolder;
  color: #333;
  margin-bottom: 0.2rem;
}
.houseserver {
  line-height: 0.38rem;
  color: #666;
  font-size: 0.28rem;
}
.inputboxs {
  width: 2rem;
  height: 0.64rem;
}
</style>