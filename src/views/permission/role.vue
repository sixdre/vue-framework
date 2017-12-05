<template>
	<section class="section">
		<div class="section_breadcrumb">
			<strong class="title">列表</strong>
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
				<el-table-column type="selection" width="55">
				</el-table-column>
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
                        <el-button size="small" @click="handlePermissionDialog(scope.row)">分配权限</el-button>
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
            <el-input v-model="role.name" :readonly="true"></el-input>
			<div class="menus_wrapper">
                <div class="menus_head">
                    <span class="menus_title">栏目名称</span>
                    <div class="menus_op">
                        <span>编辑</span>
                        <span>删除</span>
                        <span>添加</span>
                    </div>
                </div>
                <per :data="permissions" @confirmper="createPermission"></per>
            </div>
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
            permissions:[]
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
        this.getMenuList();
	},
	methods:{
        handleAddDialog(){
            this.addFormVisible = true;
        },
        //获取所有的菜单
        async getMenuList(){
            let res = await this.$Api.getMenuList();
            this.permissions = res.data.data;
        },
        //创建权限
        async createPermission(val){
            let roleId = this.role.id;
            let res = await this.$Api.createPermission(roleId,val);
            if(res.data.code===1){
                this.$message({
                    showClose: true,
                    message: res.data.msg,
                    type: 'success'
                });
                this.dialogVisible=false;
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
        // async getPermissionByRoleId(id){
        //     let res = await this.$Api.getPermission(id);
        //     if(res.data.code===1){
        //         this.permissions = res.data.data;
        //     }else{
        //         this.$message.error('权限列表获取失败');
        //     }
        // },
		//分配权限弹框
		handlePermissionDialog(row){
			this.isEdit = true;
            this.dialogVisible = true;
            this.role.id = row.id;
            this.role.name = row.name;
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
    .menus_wrapper{
    width: 600px;
    .menus_head{
        justify-content: space-between;
    }
    .menus_head,.menus_item{
        display: flex;
        align-items: center;
        border-top: 1px solid #ddd;
        .item_grid{
            display: flex;
            flex: auto;
            justify-content: space-between;
        }
        .menus_op{
            display: flex;
            width: 350px;
            span{
                flex: 1;
                align-items: center;
                text-align: center;
            }
        }
        span{
            padding: 5px 8px;
        }
    }
    .menus_head{
        line-height: 1.8;
        background-color: #ddd;
    }
   
    .menus_title{
        display: inline-block;
      
    }
    .childDiv{
        .item_grid{
            padding-left: 30px;
        }
    }
}
</style>