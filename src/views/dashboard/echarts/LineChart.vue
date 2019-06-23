<template>
  <div id="dashboard-lineChart" :style="{width: '1500px', height: '500px', margin: '50px 0 0 0'}"/>
</template>

<script>
const echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/line')
require('echarts/lib/component/axis')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/dataZoom')
require('echarts/lib/component/visualMap')
require('echarts/extension/dataTool')
export default {
  /* eslint-disable vue/require-prop-types */
  name: 'LineChart',
  props: ['lineData'],
  mounted() {
    this.drawLine()
  },
  methods: {
    drawLine() {
      const myChart = echarts.init(document.getElementById('dashboard-lineChart'))
      myChart.setOption({
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          data: this.lineData.map(item => item[0])
        },
        yAxis: {
          splitLine: {
            show: false
          }
        },
        toolbox: {
          left: 'center',
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
          }
        },
        dataZoom: [{
          startValue: '2014-06-01'
        }, {
          type: 'inside'
        }],
        visualMap: {
          top: 10,
          right: 10,
          pieces: [{
            gt: 0,
            lte: 50,
            color: '#096'
          }, {
            gt: 50,
            lte: 100,
            color: '#ffde33'
          }, {
            gt: 100,
            lte: 150,
            color: '#ff9933'
          }, {
            gt: 150,
            lte: 200,
            color: '#cc0033'
          }, {
            gt: 200,
            lte: 300,
            color: '#660099'
          }, {
            gt: 300,
            color: '#7e0023'
          }],
          outOfRange: {
            color: '#999'
          }
        },
        series: {
          type: 'line',
          data: this.lineData.map(item => item[1]),
          markLine: {
            silent: true,
            data: [{
              yAxis: 50
            }, {
              yAxis: 100
            }, {
              yAxis: 150
            }, {
              yAxis: 200
            }, {
              yAxis: 300
            }]
          }
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
