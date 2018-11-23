<template>
	<div class="inputbox flex-wrap flex-horizontal">
		<div class="pre flex-wrap flex-justify-center flex-align-center" @click="prenum"><span class="sets">-</span></div>
		<div class="num flex-wrap flex-justify-center flex-align-center"> <span class="sets">{{num}}</span></div>
		<div class="add flex-wrap flex-justify-center flex-align-center" @click="addnum"><span class="sets">+</span></div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				num:0
			}
		},
		methods:{
			prenum(){
				if(this.num == 0) return;
				this.num--;
			},
			addnum(){
				this.num++;
			}
		}
	}
</script>

<style scoped>
	.inputbox{				
		border:0.02rem #cac9ce solid;
		border-radius:0.1rem;	
		overflow: hidden;
	}
	.inputbox div{			
		height:0.64rem;				
	}
	
	.sets{
		font-size:3.6rem;	
		transform: scale(0.1);
		/*font-size:0.36rem;	*/
	}
	.pre,.add{
		background:#F9F9F9;
		text-align: center;
		color:#939598;
		width:0.6rem;			
	}
	.add:active{background:#cac9ce;}
	.pre:active{background:#cac9ce;}	
	.num{
		width:0.8rem;
		text-align: center;
		border-left:1px #cac9ce solid;
		border-right:1px #cac9ce solid;
		color:#5c5b60;
	}


</style>