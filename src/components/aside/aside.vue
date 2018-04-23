<template>
	<el-menu :router="true"  background-color="#545c64"  text-color="#fff"
	        active-text-color="#ffd04b"
	        style="height: 100%;" mode="vertical" 
			:collapse="false"
	        :default-active="$route.path">
	    <el-submenu index="3">
			<template slot="title"><i class="el-icon-message"></i>导航</template>
			<el-menu-item index="/article/list">下拉二</el-menu-item>
		</el-submenu>
	</el-menu>
</template>

<script>

</script>

<style scoped>

</style>