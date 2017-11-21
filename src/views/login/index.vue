<template>
	<div class="login-container">
		<el-input placeholder="请输入内容"></el-input>
	</div>
</template>

<script>
	export default {
		name: 'login',
		data() {
			return {
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				}
			}
		},
		methods: {
			onSubmit() {
				console.log('submit!');
			}
		}
	}
</script>

<style lang="less">
	@base: #f938ab;
	.tips {
		color: @base;
	}
</style>