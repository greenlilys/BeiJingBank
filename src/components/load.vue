<template>
	<div>
		<div class="imgbox">
			<div class="content">
				<div class="phoneimg"><img src="../assets/images/phone.png" alt="" /></div>
				<div class="loadbox">
					<div class="duan flex-wrap flex-horizontal flex-justify-between">
						<div v-for="(v,i) in tabs" :class='{active : i == cunid}' @click="handlechange(v,i)">{{v}}</div>						
					</div>
					<p v-if="cunid == 0">用户租用电池安装使用</p>
					<p v-else>运营网点、申请经营网点用户安装使用</p>
					
					<div class="btnbox" style="margin-top:74px;" @click="androidload">
			  			<img src="../assets/images/andule.png" alt="" />
			  			Android下载</div>
			  		<div class="btnbox" style="margin-top:30px;" @click="iphoneload">
			  			<img src="../assets/images/apple.png" alt="" />
			  			iPhone下载</div>			  		
			  					  		
			  		<div class="erweima">
			  			<img v-if="isshow" :src='imgs' alt="" />
			  		</div>			  		
			  		
				</div>
			</div>
		</div>
		
		<div class="liucheng bw">
			<p>天牛网用户端使用流程</p>
		</div>
		
		<div class="concention">
			网点端使用问题、网点加盟请咨询服务专员<br/>
网点加盟/服务热线：18937659583
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				tabs:['用户端','网点端'],
				cunid:'0',
				imgs:'',
				isshow:false
				
			}
		},
		methods:{
			handlechange(v,i){
				this.isshow =false;
				this.cunid = i;
				this.imgs = "";
			},
			androidload(){
				if(this.cunid == '0'){
					this.isshow =true;
					this.imgs = require('../assets/images/anyong.jpg');					
				}else{
					this.isshow =true;
					this.imgs = require('../assets/images/anwang.png');					
				}
			},
			iphoneload(){
				if(this.cunid == '0'){
					this.isshow =true;
					this.imgs = require('../assets/images/appleyong.png');					
				}else{
					this.isshow =true;
					this.imgs = require('../assets/images/applewang.png');					
				}
			}
		},
		mounted(){
			
		}
	}
</script>

<style scoped>	
	.imgbox{background:#84efdb;width:100%;height:647px;}
	.content{width:1200px;margin:0 auto;height:100%;position:relative;}
	.loadbox{position:absolute;left:526px;top:172px;width:400px;border:none;}
	.phoneimg{position:absolute;top:40px;left:100px;}
	.erweima{position:absolute;right:-80px;bottom:0;width:150px;height:150px;border:none;}
	.erweima img{width:150px;height:150px;display:inline-block;border:none;border-color:transparent;outline:none;font-size:0;}
	.duan{font-size:36px;color:#354248;}
	.duan>div{line-height:54px;cursor:pointer;}
	.active{border-bottom:6px solid #63b62f;}
	.loadbox p{font-size:22px;color:#354248;margin-top:60px;}	
	.btnbox{width:240px;height:60px;background:#63b62f;border-radius:10px;font-size:24px;color:#fff;line-height: 60px;
	text-align: center;box-shadow: 0 4px 16px #77a9ee;cursor:pointer;}
	.btnbox img{width:37px;height:47px;}
	.liucheng{margin:60px auto 0;width:1182px;height:722px;background:url('../assets/images/loadimg.jpg');background-size:cover;background-position:center;}
	.liucheng p{font-size:36px;color:#354248;}
	.concention{border-radius:20px;text-align:center;margin:60px auto 80px;width:764px;background:#63b62f;font-size:36px;color:#fff;line-height:60px;padding:10px;}
</style>