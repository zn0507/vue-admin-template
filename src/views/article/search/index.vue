<template>
  <div class="article-search-container">
    <div class="article-filter-container">
      <el-input placeholder="文章编号" style="width: 200px" class="filter-item"/>
      <el-input placeholder="文章标题" style="width: 400px" class="filter-item"/>
      <el-select v-model="categoryFilter" placeholder="文章类别" clearable style="width: 200px" class="filter-item">
        <el-option v-for="item in category" :key="item" :label="item" :value="item"/>
      </el-select>
      <el-date-picker v-model="dateFilter" type="date" placeholder="创建日期" style="width: 150px"/>
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
      row-class-name="article-search-table-row"
      cell-style="padding:2px;"
      style="margin: 10px 0">
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
          <span>{{ scope.row.readings }}</span>
        </template>
      </el-table-column>
      <!--<el-table-column label="点赞数" width="100px" align="center">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.likeNumber }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column :label="$t('table.rank')" width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.rank }}</span>
        </template>
      </el-table-column>
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
      <el-table-column label="操作" align="center" width="300" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button v-waves type="primary" size="mini" @click="handleEditContent(scope.row.code)">编辑正文</el-button>
          <el-button v-waves type="primary" size="mini" @click="handleUpdate(scope.row)">修改参数</el-button>
          <el-button v-if="scope.row.status==='draft'" size="mini" type="success" @click="handleModifyStatus(scope.row,'publish')">{{ $t('table.publish') }}
          </el-button>
          <el-button v-if="scope.row.status==='publish'" size="mini" type="danger" @click="handleModifyStatus(scope.row,'draft')">{{ $t('table.draft') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="article-pagination-container">
      <el-pagination v-show="total>0" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>

    <el-dialog :title="$t('table.editArticle')" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :inline="true" :model="articleTemp" label-position="center" label-width="70px" style="width: 800px; margin-left:50px;">
        <el-form-item :label="$t('table.code')" prop="code" >
          <el-input v-model="articleTemp.code" :disabled="true" style="width: 300px"/>
        </el-form-item>
        <el-form-item :label="$t('table.title')" prop="title">
          <el-input v-model="articleTemp.title" :disabled="true" style="width: 300px"/>
        </el-form-item>
        <el-form-item :label="$t('table.category')">
          <el-select v-model="articleTemp.category" class="filter-item" style="width: 300px">
            <el-option v-for="item in category" :key="item" :label="item" :value="item"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('table.status')" >
          <el-select v-model="articleTemp.status" class="filter-item" style="width: 300px">
            <el-option v-for="item in status" :key="item" :label="item | statusFilters" :value="item"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('table.readings')" prop="readings">
          <el-input-number v-model="articleTemp.readings" :min="0" controls-position="right" style="width: 300px"/>
        </el-form-item>
        <el-form-item :label="$t('table.likes')" prop="likes">
          <el-input-number v-model="articleTemp.likes" :min="0" controls-position="right" style="width: 300px"/>
        </el-form-item>
        <el-form-item :label="$t('table.comments')" prop="comments">
          <el-input-number v-model="articleTemp.comments" :min="0" controls-position="right" style="width: 300px"/>
        </el-form-item>
        <el-form-item :label="$t('table.rank')" prop="rank">
          <el-input-number v-model="articleTemp.rank" :min="0" controls-position="right" style="width: 300px"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="updateData()">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import waves from '@/directive/waves'
// import { parseTime } from '@/utils'
export default {
  name: 'ArticleSearch',
  directives: {
    waves
  },
  filters: {
    statusTypeFilter(status) {
      const statusMap = {
        publish: 'success',
        draft: 'danger'
      }
      return statusMap[status]
    },
    statusFilters(status) {
      const statusMap = {
        publish: '发布',
        draft: '草稿'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      listLoading: true,
      dialogFormVisible: false,
      category: ['java', 'nginx', 'springboot'],
      categoryFilter: '',
      dateFilter: '',
      statusFilter: '',
      status: ['publish', 'draft'],
      total: 3,
      listQuery: {
        page: 1,
        limit: 20
      },
      list: [
        {
          code: 'art1',
          category: 'java',
          timestamp: '2001-02-02',
          title: 'springboot(十七)：使用Spring Boot上传文件1231312312313123',
          status: 'publish',
          readings: 1222,
          likes: 1233,
          comments: 20,
          rank: 2000
        },
        {
          code: 'art12111',
          category: 'java',
          timestamp: '2001-02-02',
          title: 'springboot(十七)：使用Spring Boot上传文件',
          status: 'publish',
          readings: 22,
          likes: 1233,
          comments: 2,
          rank: 2351
        },
        {
          code: 'art12111',
          category: 'java',
          timestamp: '2001-02-02',
          title: 'springboot(十七)：使用Spring Boot上传文件',
          status: 'draft',
          readings: 222,
          likes: 1233,
          comments: 244,
          rank: 1112
        }

      ],
      articleTemp: {
        code: '',
        category: '',
        timestamp: '',
        title: '',
        status: '',
        readNumber: 0
      },
      rules: {
        // type: [{ required: true, message: 'type is required', trigger: 'change' }],
        // timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        // title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      this.listLoading = false
      // fetchList(this.listQuery).then(response => {
      //   this.list = response.data.items
      //   this.total = response.data.total
      //
      //   // Just to simulate the time of the request
      //   setTimeout(() => {
      //     this.listLoading = false
      //   }, 1.5 * 1000)
      // })
    },
    handleModifyStatus(row, status) {
      // this.$message({
      //   message: '操作成功',
      //   type: 'success'
      // })
      row.status = status
    },
    handleEditContent(code) {
      // 转到update页面
    },
    handleUpdate(row) {
      this.articleTemp = Object.assign({}, row)
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      // 更新article
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      // this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      // this.getList()
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
  &-table-row {
    height: 40px;
  }
}
</style>
