<template>
    <div>
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="选择日期">
            <el-select v-model="month" filterable placeholder="请选择" @change="changeMonth">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div id="main" style="width: 80%;height:550px;margin:0 auto" ref="myChart"></div>
    </div>
</template>

<script>
    import moment from "moment"
    import echarts from 'echarts'
    export default {
      data(){
        var option = {
          tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            data: []
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis:  {
            type: 'value'
          },
          yAxis: {
            type: 'category',
            data: []
          },
          series: [
            /*{
              name: '搜索引擎',
              type: 'bar',
              stack: '总量',
              label: {
                normal: {
                  show: true,
                  position: 'insideRight'
                }
              },
              data: [820, 832, 901, 934, 1290, 1330, 1320]
            }*/
          ]
        };
        return {
          year:'',
          month:'',
          seven:'',
          option,
          myChart:{},
          options: []
        }
      },
      methods:{
        setEchart () {
          let dom = this.$refs.myChart;
          this.myChart = echarts.init(dom);
          this.myChart.setOption(this.option);
        },
          // 获取订单点击量 ajax
        onOrderClicks(oid) {
			let res ={data:{"ret":0,"positions":["111","广告位3","广告位4"],"data":[{"name":"阳泉市","data":[1,10,0]},{"name":"上海市","data":[1,8,0]},{"name":"济南市","data":[1,9,0]},{"name":"青岛市","data":[1,1,11]}]}};
            // this.$api.onOrderClicks(oid).then(res => {
              if (res.data.ret === 0) {
                console.log(res)
                this.option.yAxis.data = res.data.positions;
                this.option.legend.data = res.data.data.map(item=>item.name )
                this.option.series = res.data.data.map(item=>{
                    return {
						name: item.name,
						type: 'bar',
						stack: '总量',
						label: {
							normal: {
								show: true,
								position: 'insideRight'
							}
                    	},
                      	data: item.data
                    }
				})
				console.log(this.option)

                this.setEchart();
              }
            // }).catch(err => {
            //   console.log(err)
            //   alert('失败')
            // })
          },
        changeMonth(value){
          this.onPlatformClicks(value)
        }
      },

      created () {
        //获取当然时间戳
        let time= moment().format('YYYY-MM-DD HH:mm:ss');
        let year = moment(time).format('YYYY');
        let month_id = moment(time).format('M');
        this.options.push({value:'',label:'全年'})
        this.options.push({value:0,label:'最近7天'})
        for(let i=1;i<=month_id;i++){
          this.options.push({value:i,label:year+"年"+i+'月'})
        }
        console.log(this.options)
      },
      mounted() {
        this.onOrderClicks(this.$route.query.id)
        this.setEchart()
      },
    }
</script>
