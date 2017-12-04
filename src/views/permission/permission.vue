<template>
    <div >

        <el-form ref="permissionForm" label-width="80px">
            <el-form-item label="角色名称">
                <el-input v-model="roleName" style="width:300px"></el-input>
            </el-form-item>
            <el-button @click="createRole">提交</el-button>
        </el-form>

        <el-card style="width:400px;">
            <div slot="header" class="clearfix">
                <span>权限分配</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="getCheckedKeys">分配权限</el-button>
            </div>
            <el-tree :data="pathList"
                show-checkbox default-expand-all 
                node-key="id" ref="tree"
                :props="defaultProps"
                :check-strictly="false" highlight-current
                >
            </el-tree>
        </el-card>
        

        <!-- <table class="table">
            <col width="200" />
            <col width="50" />
            <col width="50" />
            <col width="50" />
            <thead>
                <tr>
                    <th>栏目名称</th>
                    <th>编辑</th>
                    <th>删除</th>
                    <th>修改</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,index) in pathList" :key="index">
                    <td>{{item.name}}</td>
                    <td><input type="checkbox"></td>
                    <td><input type="checkbox"></td>
                    <td><input type="checkbox"></td>
                </tr>
            </tbody>
        </table> -->

        <div>
            <p><span>栏目名称</span><span>编辑</span><span>删除</span><span>修改</span></p>
        </div>






        <div class="buttons">
            <el-button @click="createPermission">提交</el-button>
        </div> 
      
        <div style="margin-top:20px;">
            <p>已选择的path ID： {{permissionForm.menuIds}}</p>
        </div>
        
         <!--
        <el-dialog
        title="分配权限"
        :visible.sync="dialogVisible"
        width="36%">
            <el-transfer v-model="value1" :data="data"></el-transfer>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="disPermission">确 定</el-button>
            </span>
        </el-dialog> -->






    </div>
</template>

<script>
// var dataList = [{"id":"1","cdmc":"网格管理","checked":true,"children":[{"id":"2","cdmc":"社区列表","checked":true},{"id":"3","cdmc":"网格列表","checked":true},{"id":"4","cdmc":"社工管理","checked":true}]},{"id":"5","cdmc":"人口信息","checked":false,"children":[{"id":"6","cdmc":"人口列表","checked":false}]},{"id":"7","cdmc":"政策法规","checked":false,"children":[{"id":"8","cdmc":"分类管理","checked":false},{"id":"9","cdmc":"内容管理","checked":false}]},{"id":"10","cdmc":"业务指南","checked":false,"children":[{"id":"11","cdmc":"分类管理","checked":false},{"id":"12","cdmc":"内容管理","checked":false}]},{"id":"13","cdmc":"日新广记","checked":false,"children":[{"id":"14","cdmc":"日新广记列表","checked":false}]},{"id":"15","cdmc":"公益银行","checked":false,"children":[{"id":"16","cdmc":"积分列表","checked":false}]},{"id":"17","cdmc":"设置管理","checked":true,"children":[{"id":"18","cdmc":"角色管理","checked":true},{"id":"19","cdmc":"管理员列表","checked":false},{"id":"20","cdmc":"操作日志","checked":false}]}]

// var d;
export default {
    data() {
        const generateData = _ => {
            return [{
                key: 1,
                label: '修改',
            },{
                key: 2,
                label: '删除',
            },{
                key: 3,
                label: '更新',
            }];
        };
        return {
            data: generateData(),
            value1: [],
            dialogVisible:false,
            roleName:null,
            permissionForm:{
                roleName:'12334',
                menuIds:'1,2,3',
            },
            pathList: [],
            selectMenus:[],
            defaultProps: {
                children: 'child',
                label: 'name'
            },
            selectPaths:[]
        }
    },
    created(){
        this.getMenuList()


    },
    methods: {
        //分配权限
        disPermission(){

        },
        //创建角色
        async createRole(){
            let res = await this.$Api.createRole(this.roleName);
            if(res.data.code===1){
                this.$message({
                    showClose: true,
                    message: res.data.msg,
                    type: 'success'
                });
            }else{
                this.$message.error(res.data.msg);
            }
            
        },
        selectMenu(item,index){
            console.log(item.checked)
            if(item.checked){
                this.selectMenus.push(item);
            }else{
                 this.selectMenus.splice(index,1);
            }

            console.log(this.selectMenus)
        },
        //获取所有的菜单
        async getMenuList(){
            let res = await this.$Api.getMenuList();
            this.pathList = res.data.data;
        },
        getCheckedNodes() {
            console.log(this.$refs.tree.getCheckedNodes());
        },
        getCheckedKeys() {
            alert(this.$refs.tree.getCheckedKeys())

           //this.permissionForm.menuIds = this.$refs.tree.getCheckedKeys().join(',');
        },
        async createPermission(){
            let res = await this.$Api.getPermission()
            let data = res.data.data;
            this.$store.commit('permission/setList', data)
            //  let res = await this.$Api.createPermission(this.permissionForm)
            //  let data = res.data.data;
            // // this.$store.commit('permission/setList', data)
            //  console.log(res.data.data)
        },
        renderContent(h, { node, data, store }) {
            return h('span',[
                h('span',node.label),
                h('el-checkbox',{attrs:{'v-model':"checked"},on:{
                    change:function(){
                        console.log(store)
                    }
                }},'新增'),
                 h('el-checkbox',{attrs:{value:2},on:{
                    change:function(){
                        alert()
                    }
                }},'修改'),
                 h('el-checkbox',{attrs:{value:3},on:{
                    change:function(){
                        alert()
                    }
                }},'删除')
            ])
            
            
            // `
            //     <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
            //         <span>
            //         <span>{node.label}</span>
            //         </span>
            //         <span>
            //         <el-button style="font-size: 12px;" type="text" on-click={ () => this.append(data) }>Append</el-button>
            //         <el-button style="font-size: 12px;" type="text" on-click={ () => this.remove(node, data) }>Delete</el-button>
            //         </span>
            //     </span>)`
        }
       
    }
};
</script>

<style lang="less">
.table{
    th,td{
        text-align: center;
    }
   
}
.el-transfer-panel__body {
    height:100px;
}
</style>