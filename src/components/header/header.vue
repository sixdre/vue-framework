<template>
    <el-row class="app-header">
        <router-link to="/" style="color:#fff;">
            <img class="logo" :src='logoUrl' alt="">  
           管理平台
        </router-link>
        <div class="userinfo">
            <el-dropdown trigger="click">
                <span class="el-dropdown-link userinfo-inner"> 
                    <img :src="avatar"/> {{username}} 
                     <i class="el-icon-caret-bottom" style="color:#fff"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </el-row>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    data(){
        return {
            logoUrl:require('../../assets/images/logo.png')
        }
    },
	computed: {
		...mapGetters([
            'username',
            'avatar'
        ]),
    },

    methods:{
        logout(){
            this.$confirm('确定退出吗?', '提示', {
				type: 'warning'
			}).then(() => {
				this.$store.dispatch('user/logout').then(()=>{
                    this.$router.push('login')
                })
			}).catch(() => {

			});
        }
    }
}
</script>

<style lang="less" scoped>
.app-header{
    margin: 0 -20px;
    padding: 0 20px;
    background: url(../../assets/images/header_bg.png);
    line-height: 60px;
    .logo{
        vertical-align: middle;
    }
    .userinfo {
        text-align: right;
        padding-right: 10px;
        float: right;
        .userinfo-inner {
            cursor: pointer;
            color:#fff;
            img {
                width: 40px;
                height: 40px;
                border-radius: 20px;
                vertical-align: middle;
            }
        }
    }
}
</style>