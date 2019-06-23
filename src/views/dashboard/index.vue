<template>
  <div class="dashboard-container">
    <!--    <div class="dashboard-text">name:{{ name }}</div>-->
    <!--    <div class="dashboard-text">roles:<span v-for="role in roles" :key="role">{{ role }}</span></div>-->
    <div>
      <el-row :gutter="10">
        <el-col :span="4">
          <el-row>
            <el-card shadow="hover">
              当日访问量
              <count-to :start-val="0" :end-val="102400" :duration="3000" class="card-panel-num"/>
            </el-card>
          </el-row>
          <el-row>
            <el-card shadow="hover">
              累计访问量
              <count-to :start-val="0" :end-val="102400" :duration="3000" class="card-panel-num"/>
            </el-card>
          </el-row>
        </el-col>
        <el-col :span="4">
          <el-row>
            <el-card shadow="hover">
              当日平均时长
              <count-to :start-val="0" :end-val="90" :duration="3000" class="card-panel-num"/>
            </el-card>
          </el-row>
          <el-row>
            <el-card shadow="hover">
              总计平均时长
              <count-to :start-val="0" :end-val="90" :duration="3000" class="card-panel-num"/>
            </el-card>
          </el-row>
        </el-col>
        <el-col :span="5">
          <el-row class="type-select">
            <el-select v-model="dataType">
              <el-option
                v-for="item in dataTypes"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
            </el-select>
          </el-row>
          <el-row>
            <el-date-picker
              :picker-options="dateOptions"
              v-model="date"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"/>
          </el-row>
        </el-col>
      </el-row>
      <el-row>
        <line-chart v-show="dataType === 'line'" :line-data="lineData"/>
        <map-chart v-show="dataType === 'map'" :map-data="mapData"/>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CountTo from 'vue-count-to'
import LineChart from './echarts/LineChart'
import MapChart from './echarts/MapChart'
export default {
  name: 'Dashboard',
  components: {
    CountTo,
    LineChart,
    MapChart
  },
  data() {
    return {
      dateOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近六个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 180)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一年',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 365)
              picker.$emit('pick', [start, end])
            }
          }]
      },
      date: [new Date(), new Date()],
      dataTypes: [{
        value: 'line',
        label: '折线图'
      }, {
        value: 'map',
        label: '地域图'
      }],
      dataType: 'line',
      lineData: [
        ['2000-01-05 00:00', 1], ['2000-01-05 03:00', 10], ['2000-01-05 06:00', 30], ['2000-01-06', 60], ['2000-01-07', 135], ['2000-01-08', 111], ['2000-01-09', 129], ['2000-01-11', 135],
        ['2000-02-05', 116], ['2000-02-06', 129], ['2000-02-07', 135], ['2000-02-08', 116], ['2000-02-09', 129], ['2000-02-11', 135],
        ['2000-03-05', 116], ['2000-03-06', 129], ['2000-03-07', 135], ['2000-03-08', 116], ['2000-03-09', 500], ['2000-03-11', 135],
        ['2000-04-05', 116], ['2000-04-06', 129], ['2000-04-07', 135], ['2000-04-08', 116], ['2000-04-09', 129], ['2000-04-11', 135],
        ['2000-05-05', 116], ['2000-05-06', 129], ['2000-05-07', 135], ['2000-05-08', 116], ['2000-05-09', 129], ['2000-05-11', 135],
        ['2000-06-05', 116], ['2000-06-06', 129], ['2000-06-07', 135], ['2000-06-08', 116], ['2000-06-09', 129], ['2000-06-11', 135],
        ['2000-07-05', 116], ['2000-07-06', 129], ['2000-07-07', 135], ['2000-07-08', 116], ['2000-07-09', 129], ['2000-07-11', 135],
        ['2000-08-05', 116], ['2000-08-06', 129], ['2000-08-07', 135], ['2000-08-08', 116], ['2000-08-09', 129], ['2000-08-11', 135],
        ['2000-09-05', 116], ['2000-09-06', 129], ['2000-09-07', 135], ['2000-09-08', 116], ['2000-09-09', 129], ['2000-09-11', 135]
      ],
      mapData: []
    }
  },

  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  watch: {
    dataType(newType, oldType) {
      // change echarts
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .el-row {
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .dashboard {
    &-container {
      margin: 30px;
    }

    &-text {
      font-size: 30px;
      line-height: 46px;
    }
  }
  .card-panel-num {
    font-size: 30px;
    color: #23549d;
    margin-left: 30px;
  }
  .el-card__body {
    padding: 10px;
  }
  .type-select {
    margin-bottom: 56px;
  }
</style>
