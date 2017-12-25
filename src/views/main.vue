<template>
  <div>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="选择日期">
        <el-select v-model="month" filterable placeholder="请选择" @change="changeMonth">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
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
  data() {
    var option = {
      //color: ['#003366', '#006699', '#4cabce', '#e5323e'],
      color: ['#006699'],
      title: {
        text: '各个平台点击量'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'line'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      toolbox: {
        show: true,
        x: 'right',
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['line', 'bar',] },
          restore: { show: true },
          saveAsImage: { show: true },

        }
      },
      legend: {
        data: ['总点击量']
      },
      xAxis: {
        data: []
      },
      yAxis: {},
      series: [{
        name: '总点击量',
        type: 'bar',
        data: []
      }]
    };

    var pieOption  = {
        title : {
            text: '某站点用户访问来源',
            subtext: '纯属虚构',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter:"{a} <br/> {b} : {c} ({d}%)"
        },
        legend: {
            orient : 'vertical',
            x : 'left',
            data:[]
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
                name:'总点击量',
                type:'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                  {value:335, name:'直接访问'},
                  {value:310, name:'邮件营销'},
                  {value:234, name:'联盟广告'},
                  {value:135, name:'视频广告'},
                  {value:1548, name:'搜索引擎'}
                ]
            }
        ]
    };





    return {
      year: '',
      month: '',
      seven: '',
      option,
      pieOption,
      myChart: {},
      options: []
    }
  },
  methods: {
    setEchart() {
      let dom = this.$refs.myChart;
      this.myChart = echarts.init(dom);
      this.myChart.setOption(this.option);
    },
    // 获取平台点击量 ajax
    onPlatformClicks(month) {
      // this.$api.onPlatformClicks(month).then(res => {
      //   if (res.data.ret === 0) {
      var result = [{ "id": 13, "name": "平台5", "num": 9 }, { "id": 12, "name": "平台4", "num": 11 }, { "id": 17, "name": "平台9", "num": 4 }, { "id": 4, "name": "平台1", "num": 1 }];
      console.log(result)
      if (result.length) {
        this.option.xAxis.data = result.map(item => item.name);
        this.option.series[0].data = result.map(item => item.num);

        this.pieOption.legend.data = result.map(item => item.name);
        this.pieOption.series[0].data = result.map(item =>{
          return {
            value:item.num,
            name:item.name
          }
        });


      } else {
        this.option.xAxis.data = []
        this.option.series[0].data = []
      }
      this.setEchart();
      // }
      // }).catch(err => {
      //   console.log(err)
      //   alert('失败')
      // })
    },

    changeEchartsType(){
        this.myChart.setOption(this.pieOption);
    },

    changeMonth(value) {
      this.onPlatformClicks(value)
    }
  },

  created() {
    //获取当然时间戳
    let time = moment().format('YYYY-MM-DD HH:mm:ss');
    let year = moment(time).format('YYYY');
    let month_id = moment(time).format('M');
    this.options.push({ value: '', label: '全年' })
    this.options.push({ value: -1, label: '上一年' })
    this.options.push({ value: 0, label: '最近7天' })
    for (let i = 1; i <= month_id; i++) {
      this.options.push({ value: i, label: year + "年" + i + '月' })
    }
    console.log(this.options)
  },
  mounted() {
    this.onPlatformClicks(this.month)
  },
}
</script>
