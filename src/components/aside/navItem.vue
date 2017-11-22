<template>
	<div class='menu-wrapper'>
		<div v-for="(item,index) in navList" :key="index">
			<el-submenu index="3" v-if="item.child&&item.child.length>0">
				<template slot="title"> <i class="el-icon-message"></i>{{item.name}} </template>
				<template v-for="(child,index) in item.child" >
					<el-menu-item v-if="!child.hidden" :index="child.path" :key="index">{{child.name}}</el-menu-item>
        		</template>
			</el-submenu>
			
			<el-menu-item v-else :index="item.path" >
				<i class="el-icon-menu"></i>
				<span slot="title">{{item.name}}</span>
			</el-menu-item>
			
		</div>
		<!-- <el-submenu index="3">
			<template slot="title"> <i class="el-icon-message"></i>导航 </template>
			<el-menu-item index="/article/publish">下拉一</el-menu-item>
			<el-menu-item index="/article/list">下拉二</el-menu-item>
		</el-submenu>
		<el-menu-item index="2">
			<i class="el-icon-menu"></i>
			<span slot="title">导航二{{navList}}</span>
		</el-menu-item> -->
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
	data() {
		return {
		
		}
	},
	computed: {
		// 使用对象展开运算符将 getter 混入 computed 对象中
		...mapGetters([
			'navList'
		])
	}
}
</script>

<style>

</style>