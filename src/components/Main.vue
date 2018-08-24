<template>
<div>	
	<Header></Header>	
	<router-view></router-view>
	<Footer></Footer>
</div>
</template>

<script>
	import Header from './Header'
	import Footer from './Footer'
	export default {
		name:'Main',
		components:{
			Header,
			Footer
		}
	}
</script>

<style scoped>
</style>