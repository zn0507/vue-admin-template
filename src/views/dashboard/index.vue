<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name:{{ name }}</div>
    <div class="dashboard-text">roles:<span v-for="role in roles" :key="role">{{ role }}</span></div>
    <div>
      <el-row :gutter="10">
        <el-col :span="4">
          <el-card shadow="hover">
            分时访问量
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="hover">
            当日访问量
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="hover">
            累计访问量
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="hover">
            在线平均时长
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="hover">
            地域图
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="hover">
            累计访问量
          </el-card>
        </el-col>
      </el-row>
      <el-row>
        <div id="myChart" :style="{width: '300px', height: '300px'}"/>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
const echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/bar')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  mounted() {
    this.drawLine()
  },
  methods: {
    drawLine() {
      const myChart = echarts.init(document.getElementById('myChart'))
      myChart.setOption({
        title: { text: 'ECharts 入门示例' },
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
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
