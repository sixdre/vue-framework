<template>
	<div class='menu-wrapper'>
		<el-submenu index="3">
			<template slot="title"><i class="el-icon-message"></i>导航</template>
			<el-menu-item index="/article/publish">下拉一</el-menu-item>
			<el-menu-item index="/article/list">下拉二</el-menu-item>
		</el-submenu>
		<el-menu-item index="2">
			<i class="el-icon-menu"></i>
			<span slot="title">导航二</span>
        </el-menu-item>
	</div>
</template>

<script>
</script>

<style>
</style>