<template>
	<section class="section">
		<div class="section_breadcrumb">
			<strong class="title">用户列表</strong>
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
				<el-table-column prop="name" label="用户名称">
				</el-table-column>
				<el-table-column prop="createdAt" label="创建时间">
				</el-table-column>
				<el-table-column prop="updatedAt" label="更新时间">
				</el-table-column>
				<el-table-column label="操作" width="150">
					<template slot-scope="scope">
                        <el-button size="small" @click="handleRoleDialog(scope.row)">分配角色</el-button>
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
           
		</el-dialog>

		<!--新增界面弹框-->
		 <el-dialog :visible.sync="addFormVisible" :close-on-click-modal="false">
			<el-form :model="form" label-width="80px"  ref="form">
				<el-form-item label="用户名称" prop="name">
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
export default{
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
        this.getUsers();
        this.getRoles();
	},
	methods:{
        handleAddDialog(){
            this.addFormVisible = true;
        },
        //获取用户列表
        async getUsers(){
          
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
        //新增用户
        async addSubmit(){
         
        }
	}
}

</script>

<style scoped lang="less">

</style>