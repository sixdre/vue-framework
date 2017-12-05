<template>
    <div class="menus_wrapper">
        <perItem :menus="data" @changeper="changePer"></perItem>
        <div style="margin-top:40px;">
            <el-button @click="submitPer">提交</el-button>
        </div> 
    </div>     
  
</template>

<script>
import perItem from './perItem.vue'
export default {
    components: { perItem },
    name: 'per',
	props: {
		data: {
			type: Array
        },
    },
    data(){
        return {
           menusdata:[]
        }
    },
    methods:{
        submitPer(){
            this.$emit('confirmper',this.menusdata)
        },
        changePer(data){
            this.menusdata = data;
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