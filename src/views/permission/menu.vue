<template>
	<section class="section">
        <el-card>
            <div slot="header" class="clearfix">
                <span>菜单列表</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="createMenu">创建菜单</el-button>
            </div>
            <el-tree :data="menuList"
                default-expand-all 
                node-key="id"
                ref="tree"
                :props="defaultProps"
                :check-strictly="false"
                highlight-current
                :expand-on-click-node="false"
                >
            </el-tree>
        </el-card> 
	</section>
</template>

<script>
export default{
	data(){
		return {
            menuList:[],
            defaultProps: {
                children: 'child',
                label: 'name'
            },
		}
	},
	created(){
        this.getMenus();
	},
	methods:{
        //获取前端菜单列表
        async getMenus(){
            try{
                let res = await this.$Api.getMenuList()
                this.menuList = res.data.data;
            }catch(err){

            }
        },
        //创建菜单
        async createMenu(){
          
        },
	}
}

</script>

<style scoped lang="less">

</style>