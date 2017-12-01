<template>
    <div class="app-header">
        这是头部
        当前用户角色ID:{{role}}
        <el-button type="text">退出</el-button>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
	computed: {
		// 使用对象展开运算符将 getter 混入 computed 对象中
		...mapGetters([
			'role'
		])
	}
}
</script>

<style lang="less" scoped>

</style>