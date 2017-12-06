<template>
	<section class="section">
		<div class="section_breadcrumb">
			<strong class="title">角色管理</strong>
		</div>
		 <div class="search_toolbar">
			<el-form :inline="true"  class="demo-form-inline">
				<el-form-item>
					<el-button type="primary" size="small" @click="handleAddDialog">新增</el-button>
				</el-form-item>
			</el-form>
		</div> 
		<div class="table_container">
			<el-table :data="roles"  style="width: 100%;">
				<el-table-column type="index" width="60" label="排序">
				</el-table-column>
				<el-table-column prop="name" label="角色名称">
				</el-table-column>
				<el-table-column prop="createdAt" label="创建时间">
				</el-table-column>
				<el-table-column prop="updatedAt" label="更新时间">
				</el-table-column>
				<el-table-column label="操作" width="150">
					<template slot-scope="scope">
                        <el-button size="small" v-if="!scope.row.permission" @click="handlePermissionDialog(scope.row)">分配权限</el-button>
                        <router-link tag="button" v-else :to="{path: '/permission',query:{id:scope.row.id}}">修改权限</router-link>
                        <!-- <el-button size="small" v-if="scope.row.permission.length" @click="handlePermissionEditDialog(scope.row)">修改权限</el-button> -->
					</template>
				</el-table-column>
			</el-table>
		</div>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" :page-size="20" :total="30" style="float:right;">
			</el-pagination>
		</el-col>


        <!--分配权限弹框  -->
        <el-dialog :visible.sync="dialogVisible" :close-on-click-modal="false">
            <el-form label-width="80px" style="width:200px">
                <el-form-item label="角色名称">
                    <el-input v-model="role.name" :disabled="true" readonly></el-input>
                </el-form-item>
            </el-form>
            <el-card>
                <div slot="header" class="clearfix">
                    <span>权限分配</span>
                    <el-button style="float: right; padding: 3px 0" type="text" @click="createPermission">分配权限</el-button>
                </div>
                <el-tree :data="permissions"
                    show-checkbox 
                    default-expand-all 
                    node-key="id"
                    ref="tree"
                    :props="defaultProps"
                    :check-strictly="false"
                    highlight-current
                    :expand-on-click-node="false"
                    :render-content="renderContent"
                    >
                </el-tree>
            </el-card> 
		</el-dialog>

		<!--新增界面弹框-->
		 <el-dialog :visible.sync="addFormVisible" :close-on-click-modal="false">
			<el-form :model="form" label-width="80px"  ref="form">
				<el-form-item label="角色名称" prop="name">
					<el-input v-model="form.name" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit">提交</el-button>
			</div>
		</el-dialog> 
	</section>
</template>

<script>
import per from '@/components/per/per.vue'

export default{
    components: { per },
	data(){
		return {
            form:{
				name:null
            },
			role:{
                id:null,
				name:null,
			},
            dialogVisible:false,
            addFormVisible:false,
			isEdit:false,   //是否为更新编辑
            roles:[],
            permissions:[],
            menuList:[],
            defaultProps: {
                children: 'child',
                label: 'name'
            },
		}
	},
	computed:{
		dialogTitle(){
			if(this.isEdit){
				return '编辑'
			}else{
				return '新增'
			}
		}
	},
	created(){
        this.getRoles();
        //this.getMenuList();
	},
	methods:{
        handleAddDialog(){
            this.addFormVisible = true;
        },
        //分配权限弹框
		async handlePermissionDialog(row){
			this.isEdit = true;
            this.role.id = row.id;
            this.role.name = row.name;
            let res = await this.$Api.getMenuList();
            this.permissions = res.data.data;
            this.$nextTick(()=>{
                this.dialogVisible = true;
            })
        },
        //修改权限弹框
        async handlePermissionEditDialog(row){
            this.role.id = row.id;
            this.role.name = row.name;
            let res = await this.$Api.getPermission( row.id);
            this.permissions = res.data.data;
            this.dialogVisible = true;
            this.$nextTick(()=>{
                this.$refs.tree.setCheckedKeys(res.data.ids);
                //this.$refs.tree.setCheckedNodes(res.data.data);
                 //this.permissions = res.data.data;
                // this.$refs.tree.updateKeyChildren(0,res.data.data)
            })
            // if(res.data.code===1){
            //     this.permissions = res.data.data;
            // }else{
            //     this.$message.error('权限列表获取失败');
            // }
        },
        //创建权限
        async createPermission(){
            let roleId = this.role.id;
            let val = this.$refs.tree.getCheckedNodes();
            let res = await this.$Api.createPermission(roleId,val);
            if(res.data.code===1){
                this.$message({
                    showClose: true,
                    message: res.data.msg,
                    type: 'success'
                });
                this.dialogVisible=false;
                this.getRoles();
            }else{
                this.$message.error(res.data.msg);
            }
        },
        //获取所有的角色
        async getRoles(){
            let res = await this.$Api.getRoles();
            if(res.data.code===1){
                this.roles = res.data.data;
            }else{
                this.$message.error(res.data.msg);
            }
        },
        //新增角色
        async addSubmit(){
            let roleName = this.form.name;
            let res = await this.$Api.createRole(roleName);
             if(res.data.code===1){
                this.$message({
                    showClose: true,
                    message: res.data.msg,
                    type: 'success'
                });
                this.addFormVisible=false,
                this.getRoles();
            }else{
                this.$message.error(res.data.msg);
            }
        },
        setPermission(ev,data,val){
            if(ev){
                if( data.indexOf(val)==-1){
                    data.push(val);
                }
            }else{
                if( data.indexOf(val)!=-1){
                    for(var i=0; i<data.length; i++) {
                        if(data[i] == val) {
                            data.splice(i, 1);
                            break;
                        }
                    }
                }
            }
        },
      
        renderContent(h, { node, data, store }) {
            function pdxuan(data,val){
                return data.includes(val);
            }

            return h('div',{attrs:{style:"display: flex;justify-content: space-between;width:100%;"}},[
                h('span',node.label),
                h('span',[
                    h('el-checkbox',{attrs:{label:'add',checked:pdxuan(data.permission,'add')},on:{
                            change:($event)=>{
                                this.setPermission($event,data.permission,'add');
                            // return false;
                        }
                    }},'新增'),
                    h('el-checkbox',{attrs:{label:'edit',checked:pdxuan(data.permission,'edit')},on:{
                        change:($event)=>{
                            this.setPermission($event,data.permission,'edit');
                            //return false;
                        }
                    }},'修改'),
                    h('el-checkbox',{attrs:{label:'remove',checked:pdxuan(data.permission,'remove')},on:{
                        change:($event)=>{
                            this.setPermission($event,data.permission,'remove');
                            // return false;
                        }
                    }},'删除')
                 ])
            ])
            
        }
	}
}

</script>

<style scoped lang="less">
.section{
    .section_breadcrumb{
        padding: 10px 20px;
        margin-bottom: 10px;
        background-color: #f3f3f3;
        border-bottom: 1px solid #eee;
        overflow: hidden;
        .title{
            font-size: 18px;
        }
    }
    .search_toolbar{
        background: #eff3f8;
        padding: 10px;
        margin: 10px 0;
        margin-left: 20px;
        .el-form-item {
            margin-bottom: 0px;
        }
    }
    .table_container{
        margin-left: 20px;
        .el-table__header-wrapper {
            background-color: #44a704;
        }
    }

}

</style>