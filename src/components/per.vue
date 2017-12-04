<template>
    <div class="menus_wrapper">
        <div class="menus_head">
            <span class="menus_title">栏目名称</span>
            <div class="menus_op">
                <span>编辑</span>
                <span>删除</span>
                <span>修改</span>
            </div>
        </div>
        <div v-for="(item,index) in menus" :key="index">
            <div v-if="item.child&&item.child.length>0">
                <div class="menus_item">
                    <span><el-checkbox ></el-checkbox></span>
                    <div class="item_grid">
                        <span class="menus_title">{{item.name}}</span>
                        <div class="menus_op">
                            <span><el-checkbox ></el-checkbox></span>
                            <span><el-checkbox ></el-checkbox></span>
                            <span><el-checkbox ></el-checkbox></span>
                        </div>
                    </div>
                </div>
                <div v-for="(child,index) in item.child" :key="index">
					<per class='nest-menu' v-if='child.child&&child.child.length>0'  :menus='[child]'> </per>
                    <div class="childDiv menus_item"  v-else>
                        <span><el-checkbox ></el-checkbox></span>
                        <div class="item_grid">
                            <span class="menus_title">{{child.name}}</span>
                            <div class="menus_op">
                                <span><el-checkbox ></el-checkbox></span>
                                <span><el-checkbox ></el-checkbox></span>
                                <span><el-checkbox ></el-checkbox></span>
                            </div>
                        </div>
                    </div> 
        		</div>
            </div>

            <div  v-else class="menus_item">
                <span><el-checkbox ></el-checkbox></span>
                <div class="item_grid">
                    <span class="menus_title">{{item.name}}</span>
                    <div class="menus_op">
                        <span><el-checkbox ></el-checkbox></span>
                        <span><el-checkbox ></el-checkbox></span>
                        <span><el-checkbox ></el-checkbox></span>
                    </div>
                </div>
            </div> 
        </div>

        <div style="margin-top:40px;">
            <el-button @click="submitPer">提交</el-button>
        </div> 
    </div>     
  
</template>

<script>
export default {
    name: 'per',
	props: {
		menus: {
			type: Array
        },
    },
    data(){
        return {
            ops:['remove','edit','add']
        }
    },
    methods:{
        submitPer(){
            console.log(this.menus)
            this.$emit('selectPer',)
        }
    }
   
}
</script>

<style lang="less" scoped>
.menus_wrapper{
    width: 400px;
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
            width: 150px;
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