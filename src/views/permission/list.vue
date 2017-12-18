<template>
	<section class="section">
        <div class="section_breadcrumb">
			<strong class="title">权限列表</strong>
		</div>
		<div class="search_toolbar">
			<el-form :inline="true" class="demo-form-inline">
				<el-form-item>
					<el-button type="primary" size="small" @click="handleAddDialog">新增</el-button>
					<!-- <el-button type="primary" size="small" >批量删除</el-button> -->
				</el-form-item>
			</el-form>
		</div>

        <div class="table_container">
			<el-table :data="permissionList"  style="width: 100%;">
				<el-table-column type="selection" width="55">
				</el-table-column>
				<el-table-column type="index" width="60" label="排序">
				</el-table-column>
				<el-table-column prop="name" label="权限名">
				</el-table-column>
				<el-table-column prop="resource" label="权限">
				</el-table-column>
				<el-table-column prop="tag" label="所属分类">
					<template slot-scope="scope">
						{{scope.row.tagName}}
					</template>
				</el-table-column>
				<el-table-column prop="type" label="请求类型">
				</el-table-column>
				<el-table-column label="操作" width="150">
					<template slot-scope="scope">
						<!-- <el-button size="mini" >编辑</el-button> -->
						<!-- <el-button size="mini" type="danger" >删除</el-button> -->
					</template>
				</el-table-column>
			</el-table>
		</div>


		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination 
				 layout="prev, pager, next"
				 background
				 :page-size="pageParams.limit" 
				 @current-change="pageChange" 
				 :total="pageParams.count" style="float:right;">
			</el-pagination>
		</el-col>	

		<!--新增界面弹框-->
		 <el-dialog :visible.sync="addFormVisible" :close-on-click-modal="false">
			<el-form :model="form" :rules="rules" label-width="80px"  :ref="formName">
				<el-form-item label="权限名" prop="name">
					<el-input v-model="form.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="权限路由" prop="resource">
					<el-input v-model="form.resource" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="请求形式" prop="type">
					<el-checkbox-group v-model="form.type">
						<el-checkbox v-for="item in httpTypes" :key="item" :label="item"></el-checkbox>
					</el-checkbox-group>
				</el-form-item>
				<el-form-item label="权限分类" prop="tag">
					<el-select v-model="form.tag" placeholder="请选择分类">
						<el-option
						v-for="item in menuList"
						:key="item.id"
						:label="item.name"
						:value="item.id">
						</el-option>
					</el-select>
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
			formName:'form',
			form:{
				name:'',
				resource:'',
				type:[],
				tag:''
			},
			pageParams:{
				limit:8,
				page:1,
				count:null,
			},
			httpTypes:['get','post','delete','put'],
            addFormVisible:false,
			permissionList:[],
			menuList:[],
			rules: {
				name: [
					{ required: true, message: '请输入权限名称', trigger: 'blur' }
				],
				resource: [
					{ required: true, message: '请输入请求地址', trigger: 'blur' }
				],
				type: [
					{ type:'array', required: true, message: '请选择请求类型', trigger: 'change'}
				],
				tag: [
					{ type:'number', required: true, message: '请选择所属分类', trigger: 'change'}
				]
			}
		}
	},
	created(){
		this.getMenus();
		this.getPermissionList()
	},
	methods:{
        handleAddDialog(){
            this.addFormVisible = true;
		},
		async getPermissionList(){
			 try{
                let res = await this.$Api.getPermissionList(this.pageParams);
				this.permissionList = res.data.data;
				this.pageParams.count = res.data.count;
            }catch(err){

            }
		},
		pageChange(val){
			this.pageParams.page = val;
			this.getPermissionList();
		},
		async getMenus(){
            try{
                let res = await this.$Api.getMenuList()
                this.menuList = res.data.data;
            }catch(err){

            }
        },
		addSubmit(){
			let formName = this.formName;
			this.$refs[formName].validate(async (valid) => {
				if (valid) {
					try{
						let res = await this.$Api.createPermission(this.form);
						if(res.data.code===1){
							this.$message({
								showClose: true,
								message: res.data.msg,
								type: 'success'
							});
							this.addFormVisible=false;
							this.getPermissionList();
						}else{
							this.$message.error(res.data.msg);
						}
					}catch(err){

					}
				} else {
					return false;
				}
			})
			
		}
	}
}

</script>

<style scoped lang="less">

</style>