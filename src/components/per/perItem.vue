<template>
    <div class="menus_wrapper">
        <div v-for="(item,index) in menus" :key="index">
            <div v-if="item.child&&item.child.length>0">
                <div class="menus_item">
                    <span><el-checkbox @change="checkCur(item,$event)"></el-checkbox></span>
                    <div class="item_grid">
                        <span class="menus_title">{{item.name}}</span>
                        <div class="menus_op">
                            <el-checkbox-group v-model="item.permission" >
                                <el-checkbox label="edit"></el-checkbox>
                                <el-checkbox label="remove"></el-checkbox>
                                <el-checkbox label="add"></el-checkbox>
                            </el-checkbox-group>
                        </div>
                    </div>
                </div>
                <div class="childDiv" v-for="(child,index) in item.child" :key="index">
                    <div class="childDiv" v-if='child.child&&child.child.length>0' >
                        <per-item class='nest-menu'  :menus='[child]'> </per-item>
                    </div>
                    <div class=" menus_item" v-else>
                        <span><el-checkbox @change="checkCur(child,$event)"></el-checkbox></span>
                        <div class="item_grid">
                            <span class="menus_title">{{child.name}}</span>
                            <div class="menus_op">
                                 <el-checkbox-group v-model="child.permission" >
                                    <el-checkbox label="edit"></el-checkbox>
                                    <el-checkbox label="remove"></el-checkbox>
                                    <el-checkbox label="add"></el-checkbox>
                                </el-checkbox-group>
                            </div>
                        </div>
                    </div> 
        		</div>
            </div>

            <div  v-else class="menus_item">
                <span><el-checkbox @change="checkCur(item,$event)"></el-checkbox></span>
                <div class="item_grid">
                    <span class="menus_title">{{item.name}}</span>
                    <div class="menus_op">
                        <el-checkbox-group v-model="item.permission" >
                            <el-checkbox label="edit"></el-checkbox>
                            <el-checkbox label="remove"></el-checkbox>
                            <el-checkbox label="add"></el-checkbox>
                        </el-checkbox-group>
                    </div>
                </div>
            </div> 
        </div>
    </div>     
  
</template>

<script>
export default {
    name: 'perItem',
	props: {
		menus: {
			type: Array
        },
    },
    data(){
        return {
            ops:['remove','edit','add'],
            checkIds:[],
        }
    },
    methods:{
        submitPer(){
            console.log(this.menus)
            this.$emit('selectPer')
        },
        checkInclude(id,arr){
            var flag = false;
            arr.forEach(item=>{
                if(item.id==id){
                    flag = true;
                }
            })
            return flag;
        },
        checkCur(item,event){
            var checked = event;
            var obj={
                id:item.id,
                permission:item.permission
            }
            if(checked){
                if(!this.checkInclude(item.id,this.checkIds)){
                    this.checkIds.push(obj);
                }
            }else{
                 this.checkIds.forEach((val,index)=>{
                    if(val.id==item.id){
                        this.checkIds.splice(index,1);
                        return ;
                    }
                })
            }
            this.$emit('changeper',this.checkIds)
        }
    }
   
}
</script>

<style lang="less" scoped>
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