<template>
	<div>
		<el-switch v-model="dd" @change.native="ss"></el-switch>
	</div>
</template>

<script>
export default{
	data(){
		return {
			dd:true
		}
	},
	
	created(){
		
	},
	methods:{
		//查询
		ss(){
			alert()
			return false;
		},
	}
}
</script>

<style lang="less">
</style>