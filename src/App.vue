<template>	
	<div id="app" class="flex-wrap flex-vertical">
		<div class="color_back_blue topBox" :class="{'top-b': isShowBorder}">		
			<span class="seeYou color_white">{{title}}</span>		
			<div class="imgbox" @click="goBack"><img src="./assets/images/arrowr.png" alt="" class="arrow_img"></div>
			<div class="signout color_white" v-show="!isShowBorder">退出</div>
		</div>
		<div id="content" class="flex-con color_back_gray">
			<router-view></router-view>
		</div>

		<div id="bottom" class="border-t flex-horizontal flex-wrap flex-justify-around flex-align-center font_28">
			<div @click="switchTab(0)"><img :src="tabIndex == 0 ? homeActive : homeImg" alt="" /><span :class="[tabIndex == 0 ? 'color_blue' : 'color_gray']">首页</span></div>
			<div @click="switchTab(1)"><img :src="tabIndex == 1 ? orderImgActive : orderImg" alt="" /><span :class="[tabIndex == 1 ? 'color_blue' : 'color_gray']">订单</span></div>
			<div @click="switchTab(2)"><img :src="tabIndex == 2 ? myImgActive : myImg" alt="" /><span :class="[tabIndex == 2 ? 'color_blue' : 'color_gray']">我的</span ></div>
		</div>   
	</div>
</template>

<script>
	export default {
		name: 'App',
		data(){
			return {
				homeImg:require('./assets/images/home.png'),
				homeActive:require('./assets/images/home_active.png'),
				orderImg:require('./assets/images/order.png'),
				orderImgActive:require('./assets/images/order_active.png'),				
				myImg:require('./assets/images/my.png'),		
				myImgActive:require('./assets/images/my_active.png'),
				tabIndex:0,
				isShowBorder:true,
				title:'家政预约',
				openId:'NtL9yyJE3UU7E6qyKKuo/dz68y9Ke7m1pGPdreqZQlsL+7UfWz0PSZh6p/98JK9rJLL0nGfME7p+yurzoYMHmCFq/MOncjj45TZesZip+GgjtlE3R1rcDYJZ+EklVAKLDVESHHMVLEMXuYFuyC3jxg=='
				
				
				
			}
		},
		methods: {
			init() {
				var fun = function(doc, win) {
					var docEl = doc.documentElement,
					resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
					recalc = function() {
						var clientWidth = docEl.clientWidth;
							// console.log(clientWidth);
							if(!clientWidth) return;
							docEl.style.fontSize = (clientWidth / 7.5) + 'px';
						};
						if(!doc.addEventListener) return;
						win.addEventListener(resizeEvt, recalc, false);
						doc.addEventListener('DOMContentLoaded', recalc, false);
					};
					fun(document, window);
				},
			// 底部菜单切换
			switchTab(tag){
				if(tag == this.tabIndex) return;
				this.tabIndex = tag;
				if(tag == 0){					
					this.$router.push({name:'Home',params:{}});
				}else if(tag == 1){					
					this.$router.push({name:'Order',params:{}});
				}else{					
					this.$router.push({name:'My',params:{}});
				}
				
			},
			//返回上一页
			goBack(){
				this.$router.go(-1);
				console.log(this.$router.history.current.fullPath)
			},
			resetTab(str){
				if(str == 'Home'){
					this.isShowBorder = true;
					this.tabIndex = 0;
					this.title = '家政预约';
				}else if(str == 'Order' || str == 'Orderdetail'){
					this.isShowBorder = true;
					this.tabIndex = 1;
					this.title = '我的订单';
				}else if(str == 'My'){
					
					this.isShowBorder = false;
					this.tabIndex = 2;
					this.title = '';					
				}else{
					this.title = '添加地址';
					this.isShowBorder = true;
					this.tabIndex = 2;
				}
			},
			//获得url地址的openid
			getOpenId(){
				var urlFull = window.location.href;
				console.log(urlFull)
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
			//页面刷新				
			console.log(this.$route.name)						
			var nameCun = this.$route.name;
			this.resetTab(nameCun);	
			this.getOpenId();
			this.$store.commit('getmsg',{openId:this.openId});
			if (sessionStorage.getItem("store") ) {
				this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("store"))))
			} 
			//在页面刷新时将vuex里的信息保存到sessionStorage里
			window.addEventListener("beforeunload",()=>{
				sessionStorage.setItem("store",JSON.stringify(this.$store.state))
			})
			
		},
		mounted() {
			this.init();
		},
		watch:{
			//切换页面路由改变
			$route(to,from){
				console.log(to.name);
				this.resetTab(to.name);							
				if(from.name != 'Home' || to.name != 'My'){					
					this.$store.commit('setAddActive',{addressActive:false});
				}
			}
		}
	}
</script>

<style scoped>
#app {
		font-family: '微软雅黑', Arial, 'Avenir', Helvetica, sans-serif;
		height: 100%;
	}

#top{height:0.98rem; }


.topBox{position:relative;height:0.98rem;  }

.seeYou{
	position:absolute;	
	line-height:1;
	left:50%;
	top:50%;
	transform: translate(-50%,-50%) scale(0.5);
	font-size:0.72rem;	

}
#content{ width:100%; overflow:auto;}
.arrow_img{width:0.24rem;height:0.46rem;vertical-align:top;}
.imgbox{width:0.24rem;height:0.46rem;padding-right:0.4rem;position:absolute;left:0.4rem;top:0.26rem;}


.signout{
	position:absolute;
	right:0.4rem;
	top:0;	
	padding-top:0.38rem;
	line-height: 1;	
	height:0.28rem;
	font-size:0.28rem;

}
#bottom{   
    background-color:#fff;
    height:0.98rem;
   padding-top:0.06rem;
   box-sizing: border-box;
    width:100%;   
}

#bottom img{width:0.44rem;height:0.44rem;font-size:0;}
#bottom div{display:flex;justify-content: center;align-items: center;flex-direction: row;}
#bottom span{padding-left:0.1rem;}
.top-t,.top-b{ position:relative; }
.top-t:before,.top-b:after{content: ''; position: absolute; left: 0;right:0;
background: #9c9c9b;height: 1px;-webkit-transform: scaleY(0.5);
transform: scaleY(0.5);  -webkit-transform-origin: left bottom;transform-origin: left bottom;    
}
.top-b:after{ bottom:0;}
.top-t:before{top:0;}


</style>