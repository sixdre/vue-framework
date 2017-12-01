<template>
	<section class="section">
		<div class="section_breadcrumb">
			<strong class="title">列表</strong>
		</div>
		<div class="search_toolbar">
			<el-form :inline="true" :model="searchForm" class="demo-form-inline">
				<el-form-item label="发布人">
					<el-input v-model="searchForm.user" placeholder="发布人"></el-input>
				</el-form-item>
				<el-form-item label="活动区域">
					<el-select v-model="searchForm.region" placeholder="活动区域">
					<el-option label="区域一" value="shanghai"></el-option>
					<el-option label="区域二" value="beijing"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" icon="el-icon-search" size="small" @click="onSearch">查询</el-button>
					<el-button type="primary" size="small" v-if="hasPermission('add')" @click="handleAddDialog">新增</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="table_container">
			<el-table :data="users"  style="width: 100%;">
				<el-table-column type="selection" width="55">
				</el-table-column>
				<el-table-column type="index" width="60" label="排序">
				</el-table-column>
				<el-table-column prop="name" label="姓名">
				</el-table-column>
				<el-table-column prop="sex" label="性别" :formatter="formatSex">
				</el-table-column>
				<el-table-column prop="age" label="年龄">
				</el-table-column>
				<el-table-column prop="birth" label="生日">
				</el-table-column>
				<el-table-column prop="addr" label="地址" min-width="180">
				</el-table-column>
				<el-table-column label="操作" width="150">
					<template slot-scope="scope">
						<el-button size="small" v-if="hasPermission('edit')" @click="handleEditDialog(scope.row)">编辑</el-button>
						<el-button type="danger" v-if="hasPermission('remove')" size="small" @click="handleDel(scope.row.id)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" :page-size="20" :total="30" style="float:right;">
			</el-pagination>
		</el-col>



		<!--新增界面弹框-->
		<el-dialog :title="dialogTitle" :visible.sync="addFormVisible" :close-on-click-modal="false">
			<el-form :model="userForm" label-width="80px"  ref="addForm">
				<el-form-item label="姓名" prop="name">
					<el-input v-model="userForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="性别">
					<el-radio-group v-model="userForm.sex">
						<el-radio class="radio" :label="1">男</el-radio>
						<el-radio class="radio" :label="0">女</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="年龄">
					<el-input-number v-model="userForm.age" :min="0" :max="200"></el-input-number>
				</el-form-item>
				<el-form-item label="生日">
					<el-date-picker type="date" placeholder="选择日期" v-model="userForm.birth"></el-date-picker>
				</el-form-item>
				<el-form-item label="地址">
					<el-input type="textarea" v-model="userForm.addr"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addUserSubmit">提交</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>

export default{
	data(){
		return {
			searchForm:{
				user:'',
				region:''
			},
			userForm:{
				name:'张三',
				sex:1,
				age:18,
				birth:'1987-12-27',
				addr:'辽宁省 阜新市 阜新蒙古族自治县'
			},
			addFormVisible:false,
			//dialogTitle:'新增',
			isEdit:false,   //是否为更新编辑
			users:[{
				name:'张三',
				sex:1,
				age:18,
				birth:'1987-12-27',
				addr:'辽宁省 阜新市 阜新蒙古族自治县'
			},{
				name:'李四',
				sex:0,
				age:18,
				birth:'1987-12-27',
				addr:'辽宁省 阜新市 阜新蒙古族自治县'
			}]
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
		
	},
	methods:{
		//性别显示转换
		formatSex: function (row, column) {
			return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
		},
		//查询
		onSearch(){
			alert()
		},
		//重置表单
		resetForm(){
			this.userForm = {
				name:'',
				sex:null,
				age:null,
				birth:'',
				addr:''
			}
		},
		//新增弹框
		handleAddDialog(){
			this.resetForm();
			this.isEdit = false;
			this.addFormVisible = true;
		},
		//编辑弹框
		handleEditDialog(row){
			this.userForm.name = row.name; 
			this.userForm.sex = row.sex;
			this.userForm.age = row.age;
			this.userForm.birth = row.birth;
			this.userForm.addr = row.addr;

			this.isEdit = true;
			this.addFormVisible = true;
		},
		//删除当前记录
		handleDel(id) {
			this.$confirm('确认删除该记录吗?', '提示', {
				type: 'warning'
			}).then(() => {
				//this.listLoading = true;
				this.$message({
					message: '删除成功',
					type: 'success'
				});
			
			}).catch(() => {

			});
		},
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