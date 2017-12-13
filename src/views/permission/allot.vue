<template>
    <section class="section">
        <div class="section_breadcrumb">
            <strong class="title">权限分配</strong>
        </div>
        <div class="search_toolbar">
            <el-form label-width="80px" style="width:200px">
                <el-form-item label="角色名称">
                    <el-input v-model="role.id" :disabled="true" readonly></el-input>
                </el-form-item>
            </el-form>
        </div>
        <el-card>
            <div slot="header" class="clearfix">
                <span>菜单分配（前端显示）</span>
            </div>
            <el-tree :data="menuList" show-checkbox default-expand-all 
                node-key="id" ref="tree" 
                :props="defaultProps" 
                :check-strictly="false" 
                highlight-current 
                :expand-on-click-node="false" >
                <!-- :render-content="renderContent"> -->
            </el-tree>
        </el-card>

        <el-card style="margin-top:40px;">
            <div slot="header" class="clearfix">
                <span>资源分配（后台请求）</span>
            </div>
            <el-row class="resource_wrapper">
                <el-col :md="8" v-for="(item,index) in resourceList" :key="index" ref="resource">
                    <h4 class="title">{{item.name}}</h4>
                    <ul v-if="item.resource&&item.resource.length">
                        <li v-for="(val,i) in item.resource" :key="i">
                            <el-checkbox v-model="resourceIds" :label="val.id">{{val.name}}</el-checkbox>
                        </li>
                    </ul>
                </el-col>
            </el-row>
        </el-card>

        <div style="text-align:center;margin-top:20px;">
            <el-button type="primary" @click="submit">提交</el-button>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            role: {
                id: null,
                name: null,
            },
            resourceList: [],
            resourceIds:[],
            menuList: [],
            defaultProps: {
                children: 'child',
                label: 'name'
            },
        }
    },
    created() {
        this.role.id = this.$route.query.id;
        this.getMenusPermission();
        this.getRolePermission();
        this.getMenuList();
    },
    methods: {
        handleAddDialog() {
            this.addFormVisible = true;
        },
        async getMenuList(){
            let res = await this.$Api.getMenuList();
            this.menuList =  res.data.data;
        },
        async getRolePermission(){
            let roleId = this.role.id;
            let res = await this.$Api.getRolePermission(roleId);
            if(res.data.code==1){
                this.resourceIds = res.data.resource;
                this.$nextTick(()=>{
                    this.$refs.tree.setCheckedKeys(res.data.menu.checkIds);
                })
            }else{
                this.$message.error(res.data.msg);
            }
        },
        async getMenusPermission() {
            let res = await this.$Api.getMenusPermission();
            this.resourceList = res.data.data;
        },
        async submit() {
            let roleId = this.role.id;
            let menus = this.$refs.tree.getCheckedNodes();
            let resource = this.resourceIds;
            let res = await this.$Api.saveRolePermission(roleId, menus, resource);
            if (res.data.code === 1) {
                this.$message({
                    showClose: true,
                    message: res.data.msg,
                    type: 'success'
                });
                this.$router.push('/permission/role')
            } else {
                this.$message.error(res.data.msg);
            }
        },
        setPermission(ev, data, val) {
            if (ev) {
                if (data.indexOf(val) == -1) {
                    data.push(val);
                }
            } else {
                if (data.indexOf(val) != -1) {
                    for (var i = 0; i < data.length; i++) {
                        if (data[i] == val) {
                            data.splice(i, 1);
                            break;
                        }
                    }
                }
            }
        },

        renderContent(h, { node, data, store }) {
            function pdxuan(data, val) {
                return data.includes(val);
            }

            return h('div', { attrs: { style: "display: flex;justify-content: space-between;width:100%;" } }, [
                h('span', node.label),
                h('span', [
                    h('el-checkbox', {
                        attrs: { label: 'add', checked: pdxuan(data.permission, 'add') }, on: {
                            change: ($event) => {
                                this.setPermission($event, data.permission, 'add');
                                // return false;
                            }
                        }
                    }, '新增'),
                    h('el-checkbox', {
                        attrs: { label: 'edit', checked: pdxuan(data.permission, 'edit') }, on: {
                            change: ($event) => {
                                this.setPermission($event, data.permission, 'edit');
                                //return false;
                            }
                        }
                    }, '修改'),
                    h('el-checkbox', {
                        attrs: { label: 'remove', checked: pdxuan(data.permission, 'remove') }, on: {
                            change: ($event) => {
                                this.setPermission($event, data.permission, 'remove');
                                // return false;
                            }
                        }
                    }, '删除')
                ])
            ])

        }
    }
}

</script>

<style scoped lang="less">
.resource_wrapper{
    h4{
        margin-bottom: 15px;
    }
    li{
        margin-bottom: 10px;
        label{
            font-size: 14px;
            vertical-align: top;
        }
    }
}
</style>