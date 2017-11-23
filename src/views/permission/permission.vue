<template>
    <div>
        <el-tree :data="pathList"
            show-checkbox default-expand-all 
            node-key="id" ref="tree"

            :props="defaultProps"

            :check-strictly="false" highlight-current>
        </el-tree>
        <div class="buttons">
            <el-button @click="getCheckedNodes">通过 node 获取</el-button>
            <el-button @click="getCheckedKeys">通过 key 获取</el-button>
        </div> 
      
        <div style="margin-top:20px;">
            <p>已选择的path ID： {{selectPaths}}</p>
        </div>
        
    </div>
</template>

<script>
// var dataList = [{"id":"1","cdmc":"网格管理","checked":true,"children":[{"id":"2","cdmc":"社区列表","checked":true},{"id":"3","cdmc":"网格列表","checked":true},{"id":"4","cdmc":"社工管理","checked":true}]},{"id":"5","cdmc":"人口信息","checked":false,"children":[{"id":"6","cdmc":"人口列表","checked":false}]},{"id":"7","cdmc":"政策法规","checked":false,"children":[{"id":"8","cdmc":"分类管理","checked":false},{"id":"9","cdmc":"内容管理","checked":false}]},{"id":"10","cdmc":"业务指南","checked":false,"children":[{"id":"11","cdmc":"分类管理","checked":false},{"id":"12","cdmc":"内容管理","checked":false}]},{"id":"13","cdmc":"日新广记","checked":false,"children":[{"id":"14","cdmc":"日新广记列表","checked":false}]},{"id":"15","cdmc":"公益银行","checked":false,"children":[{"id":"16","cdmc":"积分列表","checked":false}]},{"id":"17","cdmc":"设置管理","checked":true,"children":[{"id":"18","cdmc":"角色管理","checked":true},{"id":"19","cdmc":"管理员列表","checked":false},{"id":"20","cdmc":"操作日志","checked":false}]}]

// var d;

export default {
    data() {
        return {
            pathList: [],
            defaultProps: {
                children: 'child',
                label: 'name'
            },
            selectPaths:[]
        }
    },
    created(){
        this.getNavList()


    },
    methods: {
        async getNavList(){
            let res = await this.$Api.getNavList();
            this.pathList = res.data.data;
            console.log(this.pathList)
        },
        getCheckedNodes() {
            console.log(this.$refs.tree.getCheckedNodes());
        },
        getCheckedKeys() {
           this.selectPaths = this.$refs.tree.getCheckedKeys();
        },
       
    }
};
</script>

<style lang="less">

</style>