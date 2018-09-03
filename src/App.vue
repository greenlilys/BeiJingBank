<template>
	<div id="app">
		<router-view/>
	</div>
</template>

<script>
	export default {
		name: 'App',
		methods: {
			init() {
				if (document.all && document.querySelector && !document.addEventListener) {
					alert("为了给您提供更优质的网页浏览体验，建议使用IE9及以上版本的浏览器");
				}
			}
		},
		mounted() {
			this.init();
		}
	}
</script>

<style>
	#app {
		font-family: '微软雅黑', Arial, 'Avenir', Helvetica, sans-serif;
	}
</style>