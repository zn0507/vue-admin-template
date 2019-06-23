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
  name: 'LineChart',
  mounted() {
    this.drawLine()
  },
  methods: {
    drawLine() {
      const datat = [
        ['2000-01-05', 1], ['2000-01-06', 11], ['2000-01-07', 135], ['2000-01-08', 111], ['2000-01-09', 129], ['2000-01-11', 135],
        ['2000-02-05', 116], ['2000-02-06', 129], ['2000-02-07', 135], ['2000-02-08', 116], ['2000-02-09', 129], ['2000-02-11', 135],
        ['2000-03-05', 116], ['2000-03-06', 129], ['2000-03-07', 135], ['2000-03-08', 116], ['2000-03-09', 500], ['2000-03-11', 135],
        ['2000-04-05', 116], ['2000-04-06', 129], ['2000-04-07', 135], ['2000-04-08', 116], ['2000-04-09', 129], ['2000-04-11', 135],
        ['2000-05-05', 116], ['2000-05-06', 129], ['2000-05-07', 135], ['2000-05-08', 116], ['2000-05-09', 129], ['2000-05-11', 135],
        ['2000-06-05', 116], ['2000-06-06', 129], ['2000-06-07', 135], ['2000-06-08', 116], ['2000-06-09', 129], ['2000-06-11', 135],
        ['2000-07-05', 116], ['2000-07-06', 129], ['2000-07-07', 135], ['2000-07-08', 116], ['2000-07-09', 129], ['2000-07-11', 135],
        ['2000-08-05', 116], ['2000-08-06', 129], ['2000-08-07', 135], ['2000-08-08', 116], ['2000-08-09', 129], ['2000-08-11', 135],
        ['2000-09-05', 116], ['2000-09-06', 129], ['2000-09-07', 135], ['2000-09-08', 116], ['2000-09-09', 129], ['2000-09-11', 135]
      ]
      const myChart = echarts.init(document.getElementById('dashboard-lineChart'))
      myChart.setOption({
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          data: datat.map(item => item[0])
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
          data: datat.map(item => item[1]),
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
