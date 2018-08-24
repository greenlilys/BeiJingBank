<template>
	<div class="tn_header bw">
		<div class="content clear">
			<img class="fl" src="../assets/images/logo.jpg" alt="" />
			<ul class="fr">
				<li v-for="(v,i) in arr" v-bind:class="{active : i == cunrid}" @click="changeItem(v,i)">{{v}}</li>				
			</ul>
		</div>
	</div>
</template>

<script>
	
	export default{
		data(){
			return{
				arr:['首页','天牛租电','APP下载','品牌故事','联系我们'],
				mainview:['','/Battery','/Load','/Story','/Contant'],
				cunrid:'0'
			}
		},
		methods:{
			changeItem(v,i){
				this.cunrid = i;
				let path = '/Home' + this.mainview[i];
				this.$router.push({path:path});
			},
			rendertext(cunpath){
				var num = cunpath.lastIndexOf('/');
				var str = cunpath.substring(num);
				var index = this.mainview.indexOf(str);			
				this.cunrid = index > 0 ? index : '0';
			
			}
		},
		created(){	
			console.log('header--created')
			var cunpath = this.$router.history.current.fullPath;			
			this.rendertext(cunpath);
		},
		
		
		watch:{
			$route(to,from){
				var cunpath = to.fullPath;
				this.rendertext(cunpath);
				if(document.documentElement.scrollTop ) document.documentElement.scrollTop = 0;//标准浏览器
				if(document.body.scrollTop ) document.body.scrollTop = 0;//IE浏览器
				if(window.pageYOffset ) window.pageYOffset = 0;//火狐浏览器

			}
		},
		mounted(){
			console.log('header-mounted')
				
		}
	}
</script>

<style scoped>
	.tn_header{height:92px;width:100%;}
	.content{width:1200px;margin:0 auto;padding-top:36px;height:40px;line-height:40px;}
	.content img{height:40px;display:inline-block;}
	.content ul li{line-height: 40px;color:#000;font-size:14px;display:inline-block;padding:0 22px;cursor:pointer;}
	.content ul li:nth-child(5){padding-right:0;}
	.content ul li.active{color:#63b62f;}
</style>