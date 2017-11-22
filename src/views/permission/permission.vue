<template>
    <div>
        <el-tree :data="data2"
             show-checkbox default-expand-all 
             node-key="id" ref="tree"
             @check-change="nodeClick"
             @current-change="nodeChange"
             :props="defaultProps"
              :check-strictly="false" highlight-current>
        </el-tree>
        <div class="buttons">
            <el-button @click="getCheckedNodes">通过 node 获取</el-button>
            <el-button @click="getCheckedKeys">通过 key 获取</el-button>
            <el-button @click="setCheckedNodes">通过 node 设置</el-button>
            <el-button @click="setCheckedKeys">通过 key 设置</el-button>
            <el-button @click="resetChecked">清空</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            data2: [{
                id: 1,
                label: '文章',
                path: '/article',
                children: [{
                    id: 4,
                    label: '文章发布',
                    path: '/article/publish',
                    children: [{
                        label: '添加',
                    },{
                        label: '删除',
                    }]
                }, {
                    id: 4,
                    label: '文章列表',
                    path: '/article/publish',
                }]
            }],
             defaultProps: {
                children: 'child',
                label: 'name'
            }
        }
    },
    created(){
        this.getNavList()
    },
    methods: {
        async getNavList(){
            let res = await this.$Api.getNavList();
            this.data2 = res.data.data;
        },
        nodeClick(a1,a2,a3){
            // console.log(a1.$treeNodeId)
            // console.log(a2)
            // console.log(a3)
           
        },
        nodeChange(da,node){
            // console.log(node)
        },
        getCheckedNodes() {
            console.log(this.$refs.tree.getCheckedNodes());
        },
        getCheckedKeys() {
            console.log(this.$refs.tree.getCheckedKeys());
        },
        setCheckedNodes() {
            this.$refs.tree.setCheckedNodes([{
                id: 5,
                label: '二级 2-1'
            }, {
                id: 9,
                label: '三级 1-1-1'
            }]);
        },
        setCheckedKeys() {
            this.$refs.tree.setCheckedKeys([3]);
        },
        resetChecked() {
            this.$refs.tree.setCheckedKeys([]);
        }
    }
};
</script>

<style lang="less">

</style>