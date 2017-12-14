<template>
    <div class="app-header">
        这是头部
        当前用户:{{username}} 
        角色:{{role}}
        <el-button type="text" @click="logout()">退出</el-button>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
	computed: {
		// 使用对象展开运算符将 getter 混入 computed 对象中
		...mapGetters([
            'role',
            'username'
		])
    },
    methods:{
        logout(){
            this.$confirm('确定退出吗?', '提示', {
				type: 'warning'
			}).then(() => {
				this.$store.dispatch('user/logout').then(()=>{
                    this.$router.push('login')
                })
			}).catch(() => {

			});
            
        }
    }
}
</script>

<style lang="less" scoped>

</style>