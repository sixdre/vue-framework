<template>
	<el-menu :router="true"  background-color="#545c64"  text-color="#fff"
	        active-text-color="#ffd04b"
	        style="height: 100%;width: 200px;" mode="vertical" 
	        :default-active="$route.path">
	    <nav-item></nav-item>
	</el-menu>
</template>

<script>
	import navItem from './navItem.vue'
	export default {
  		components: { navItem },
	}
</script>

<style scoped>

</style>