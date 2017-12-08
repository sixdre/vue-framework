<template>
	<section class="section">
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
	</section>
</template>

<script>
export default{
	data(){
		return {
			role:{
                id:null,
				name:null,
			},
            dialogVisible:false,
            permissions:[],
            menuList:[],
            defaultProps: {
                children: 'child',
                label: 'name'
            },
		}
	},
	created(){
        this.getPermissionForUpdate();
	},
	methods:{
        getPermissionForUpdate(){
            let roleId = this.$route.query.id;
            this.role.id = roleId;
            if(roleId){
                this.$Api.getPermissionForUpdate(roleId).then((res)=>{
                    this.permissions = res.data.data;
                    this.$nextTick(()=>{
                        this.$refs.tree.setCheckedKeys(res.data.ids);
                    })
                });
            }else{
                this.$router.push('/role');
            }
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
                this.$router.push('/role')
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

</style>