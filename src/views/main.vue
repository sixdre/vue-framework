<template>
	<div>
		<div id="echart" style="width: 600px;height:400px;" ref="myChart"></div>
	</div>
</template>

<script>
import echarts from 'echarts'

export default {
	data(){
		var option = {
			title: {
				text: '平台点击数'
			},
			tooltip: {},
			legend: {
				data:['点击数']
			},
			xAxis: {
				data: []
			},
			yAxis: {},
			series: [{
				name: '点击数',
				type: 'bar',
				data: []
			}]
		};
		var option2 = {
			title : {
				text: '平台点击数',
				x:'center'
			},
			tooltip : {
				trigger: 'item',
				formatter: "{a} <br/>{b} : {c} ({d}%)"
			},
			legend: {
				orient : 'vertical',
				x : 'left',
				data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
			},
			toolbox: {
				show : true,
				feature : {
					mark : {show: true},
					dataView : {show: true, readOnly: false},
					magicType : {
						show: true, 
						type: ['pie', 'funnel'],
						option: {
							funnel: {
								x: '25%',
								width: '50%',
								funnelAlign: 'left',
								max: 1548
							}
						}
					},
					restore : {show: true},
					saveAsImage : {show: true}
				}
			},
			calculable : true,
			series : [
				{
					name:'访问来源',
					type:'pie',
					radius : '55%',
					center: ['50%', '60%'],
					data:[
						{value:335, name:'直接访问'},
						{value:310, name:'邮件营销'},
						{value:234, name:'联盟广告'},
						{value:275, name:'视频广告'},
						{value:1548, name:'搜索引擎'}
					]
				}
			]
		};
		return {
			option,
			option2,
			myChart:{}
		}
	},
	mounted(){
		this.getData();
	},
	methods:{
		setEchart () {
			let dom = this.$refs.myChart;
			this.myChart = echarts.init(dom);
			this.myChart.setOption(this.option2);
		},
		getData(){
			setTimeout(()=>{
				let mockData = [{id:1,name:'cs4',nums:15},{id:1,name:'cs6',nums:17}];
				this.option.xAxis.data = mockData.map(item=> item.name);
				this.option.series[0].data = mockData.map(item=> item.nums);
				this.setEchart();
			})
		}
	}
}
</script>

<style>

</style>