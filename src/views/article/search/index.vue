<template>
  <div class="article-search-container">
    <div class="article-filter-container">
      <el-input v-model="listQuery.code" placeholder="文章编号" style="width: 200px" class="filter-item"/>
      <el-input v-model="listQuery.title" placeholder="文章标题" style="width: 400px" class="filter-item"/>
      <el-select v-model="listQuery.categoryId" placeholder="文章类别" clearable filterable style="width: 200px" class="filter-item">
        <el-option v-for="item in category" :key="item.id" :label="item.name" :value="item.id"/>
      </el-select>
      <el-date-picker v-model="listQuery.createDate" type="date" placeholder="创建日期" style="width: 150px"/>
      <el-select v-model="listQuery.status" placeholder="状态" clearable style="width: 100px" class="filter-item">
        <el-option v-for="item in status" :key="item" :label="item" :value="item"/>
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="articleList"
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
          <span>{{ scope.row.category.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="100" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createDate }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.modifyDate')" width="100" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.modificationDate }}</span>
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
          <el-button v-waves type="primary" size="mini" @click="handleEditContent(scope.row.id)">编辑正文</el-button>
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

    <el-dialog :title="$t('table.editArticle')" :visible.sync="isShow">
      <el-form ref="dataForm" :rules="rules" :inline="true" :model="articleTemp" label-position="center" label-width="70px" style="width: 800px; margin-left:50px;">
        <el-form-item :label="$t('table.code')" prop="code" >
          <el-input v-model="articleTemp.code" :disabled="true" style="width: 300px"/>
        </el-form-item>
        <el-form-item :label="$t('table.title')" prop="title">
          <el-input v-model="articleTemp.title" :disabled="true" style="width: 300px"/>
        </el-form-item>
        <el-form-item :label="$t('table.category')">
          <el-select v-model="articleTemp.category.id" :placeholder="$t('table.category')" clearable style="width: 200px">
            <el-option v-for="item in category" :key="item.id" :label="item.name" :value="item.id"/>
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
        <!--<el-form-item :label="$t('table.comments')" prop="comments">-->
        <!--<el-input-number v-model="articleTemp.comments" :min="0" controls-position="right" style="width: 300px"/>-->
        <!--</el-form-item>-->
        <el-form-item :label="$t('table.rank')" prop="rank">
          <el-input-number v-model="articleTemp.rank" :min="0" controls-position="right" style="width: 300px"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="updateData()">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import waves from '@/directive/waves'
import { updateArticle, getAllArticle, getAllCategory } from '@/api/article'
import store from '@/store'
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
      category: [],
      isShowCreate: false,
      isShow: false,
      isNew: false,
      statusFilter: '',
      status: ['publish', 'draft'],
      total: 0,
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 10,
        code: '',
        name: '',
        status: '',
        id: '',
        title: '',
        categoryId: '',
        createDate: ''
      },
      pQuery: {
        page: 0,
        limit: 0,
        code: '',
        name: '',
        status: 'publish',
        id: ''
      },
      articleList: [],
      articleTemp: {
        code: '',
        name: '',
        status: '',
        createUser: '',
        lastModifyUser: store.getters.code,
        createDate: '',
        modificationDate: '',
        category: { 'id': '' },
        title: '',
        readings: 0,
        likes: 0,
        comments: 0,
        rank: 0
      },
      rules: {
        // type: [{ required: true, message: 'type is required', trigger: 'change' }],
        // timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        // title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      }
    }
  },
  beforeMount() {
    getAllCategory(this.pQuery)
      .then(res => {
        this.category = res.data.content
      })
  },
  methods: {
    getArticles(query) {
      this.listLoading = true
      getAllArticle(query)
        .then(res => {
          this.articleList = res.data.content
          // Just to simulate the time of the request
          // setTimeout(() => {
          //   this.listLoading = false
          // }, 1000)
          this.total = res.data.total
          this.listLoading = false
        })
    },
    saveArticle(data) {
      updateArticle(data)
        .then(res => {
          if (res.status === 200) {
            this.$message({
              message: '操作成功',
              type: 'success'
            })
          }
        })
    },
    handleSearch() {
      this.listQuery.page = 1
      this.getArticles(this.listQuery)
    },
    handleCreate() {
      this.resetTemp()
      this.isNew = true
      this.isShow = true
      this.articleTemp.createDate = new Date()
      this.articleTemp.modificationDate = new Date()
      // this.permissionTemp.createUser
      // this.permissionTemp.lastModifyUser
    },
    handleUpdate(row) {
      this.isNew = false
      this.articleTemp = Object.assign({}, row)
      this.isShow = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleModifyStatus(row, status) {
      row.status = status
      // row.modificationDate = new Date()
      // row.lastModifyUser
      row.menu = ''
      this.saveArticle(row)
    },
    updateData() {
      const article = Object.assign({}, this.articleTemp)
      article.menu = ''
      this.saveArticle(article)
      this.isShow = false
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getArticles(this.listQuery)
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getArticles(this.listQuery)
    },
    resetTemp() {
      this.articleTemp = {
        code: '',
        name: '',
        status: '',
        createUser: '',
        lastModifyUser: '',
        createDate: '',
        modificationDate: '',
        category: '',
        title: '',
        readings: 0,
        likes: 0,
        comments: 0,
        rank: 0
      }
    },
    handleEditContent(id) {
      this.$router.push('/article/update/' + id)
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
