<template>
    <div :id="id" :style="{height:height,width:width}"></div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'EchartsComponent',
  props: {
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '400px'
    },
    height: {
      type: String,
      default: '400px'
    },
    option: {
      type: Object,
      default: function () {
        return { }
      }
    }
  },
  data () {
    return {
      defaultOption: {
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      }
    }
  },
  mounted () {
    // 基于准备好的dom，初始化echarts实例
    let myChart = echarts.init(document.getElementById(this.id))
    // 绘制图表
    myChart.setOption(this.option)
  }
}
</script>
