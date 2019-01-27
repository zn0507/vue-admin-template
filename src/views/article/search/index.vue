<template>
  <div class="article-search-container">
    <div class="article-filter-container">
      <el-input placeholder="文章编号" style="width: 200px;" class="filter-item"/>
      <el-select v-model="categoryFilter" placeholder="文章类别" clearable style="width: 200px" class="filter-item">
        <el-option v-for="item in category" :key="item" :label="item" :value="item"/>
      </el-select>
      <el-date-picker v-model="dateFilter" type="date" placeholder="选择日期" style="width: 150px"/>
      <el-select v-model="statusFilter" placeholder="状态" clearable style="width: 100px" class="filter-item">
        <el-option v-for="item in status" :key="item" :label="item" :value="item"/>
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" >搜索</el-button>
    </div>

    <el-table
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%">
      <el-table-column label="编号" align="center" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.code }}</span>
        </template>
      </el-table-column>
      <el-table-column label="类别" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.category }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="100" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.timestamp }}</span>
        </template>
      </el-table-column>
      <el-table-column label="标题" width="550px" align="center">
        <template slot-scope="scope" >
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="阅读数" width="80" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.readNumber }}</span>
        </template>
      </el-table-column>
      <!--<el-table-column label="点赞数" width="100px" align="center">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.likeNumber }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column label="排名数" width="100px" align="center">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.rankNumber }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column label="评论数" width="100px" align="center">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.commentNumber }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column label="状态" width="100px" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusTypeFilter">{{ scope.row.status | statusFilters }}</el-tag>
        </template>
      </el-table-column>
      <!--<el-table-column label="类型" width="150px" align="center">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.type }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column label="操作" align="center" width="250px" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button v-waves type="primary" size="mini">编辑</el-button>
          <el-button v-waves type="primary" size="mini">编辑</el-button>
          <el-button v-waves type="primary" size="mini">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--<div class="article-pagination-container">-->
    <!--<el-pagination v-show="total>0" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" :total="total" current-page="1" background layout="total, sizes, prev, pager, next, jumper"  @current-change="handleCurrentChange"/>-->
    <!--</div>-->
  </div>
</template>

<script>
import waves from '@/directive/waves'
export default {
  name: 'ArticleSearch',
  directives: {
    waves
  },
  filters: {
    statusTypeFilter(status) {
      const statusMap = {
        publish: 'success',
        draft: 'info',
        delete: 'danger'
      }
      return statusMap[status]
    },
    statusFilters(status) {
      const statusMap = {
        publish: '发布',
        draft: '草稿',
        delete: '删除'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      category: ['java', 'nginx', 'springboot'],
      categoryFilter: '',
      dateFilter: '',
      statusFilter: '',
      status: ['发布', '草稿', '删除'],
      list: [
        {
          code: 'art1',
          category: 'java',
          timestamp: '2001-02-02',
          title: 'springboot(十七)：使用Spring Boot上传文件',
          status: 'publish',
          readNumber: 1222
        },
        {
          code: 'art12111',
          category: 'java',
          timestamp: '2001-02-02',
          title: 'springboot(十七)：使用Spring Boot上传文件',
          status: 'draft',
          readNumber: 1222
        },
        {
          code: 'art12111',
          category: 'java',
          timestamp: '2001-02-02',
          title: 'springboot(十七)：使用Spring Boot上传文件',
          status: 'delete',
          readNumber: 1222
        }

      ]
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.article-search {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
