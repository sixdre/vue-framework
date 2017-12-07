<template>
	<section class="section">
		<div class="section_breadcrumb">
			<strong class="title">用户列表</strong>
		</div>
		<div class="table_container">
			<el-table :data="users"  style="width: 100%;">
				<el-table-column type="index" width="60" label="排序">
				</el-table-column>
				<el-table-column prop="username" label="用户名称">
					<template slot-scope="scope">
						<el-badge v-if="scope.row.roleSuper" is-dot style="margin-top:5px;">
							{{scope.row.username}}
						</el-badge>
						<span v-else>{{scope.row.username}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="roleName" label="角色名称">
				</el-table-column>
				<el-table-column prop="createdAt" label="创建时间">
				</el-table-column>
				<el-table-column prop="updatedAt" label="更新时间">
				</el-table-column>
				<el-table-column label="操作" width="150">
					<template slot-scope="scope">
						<el-button size="small" v-if="!scope.row.roleId" @click="handleRoleDialog(scope.row)">分配角色</el-button>
                        <el-button size="small" v-else @click="handleRoleDialog(scope.row)">修改角色</el-button>
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
			<el-form :model="form" label-width="80px"  ref="form">
				<el-form-item label="用户名" prop="name">
					<el-input v-model="form.username" readonly :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="角色名称" prop="roleId">
					<el-radio-group v-model="form.roleId">
						<el-radio v-for="role in roles" :label="role.id" :key="role.name">{{role.name}}</el-radio>
					</el-radio-group>
				</el-form-item>
			</el-form>
		   	<div slot="footer" class="dialog-footer">
				<el-button @click.native="dialogVisible = false">取消</el-button>
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
				username:'',
				userId:'',
				roleId:''
			},
            dialogVisible:false,
			users:[],
			roles:[]
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
		handleRoleDialog(row){
			this.form.username=row.username;
			this.form.userId=row.id;
			this.form.roleId=row.roleId;
			this.dialogVisible = true;
		},
        //获取用户列表
        async getUsers(){
           let res = await this.$Api.getUsers();
            if(res.data.code===1){
                this.users = res.data.data;
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
		async addSubmit(){
			let res = await this.$Api.updateUserRole(this.form.userId,this.form.roleId);
			if(res.data.code===1){
                this.$message({
                    showClose: true,
                    message: res.data.msg,
                    type: 'success'
				});
				this.getUsers();
				this.dialogVisible = false;
            }else{
                this.$message.error(res.data.msg);
            }
		}
       
	}
}

</script>

<style scoped lang="less">

</style>