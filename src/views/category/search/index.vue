<template>
  <div class="category-search-container">
    <div class="article-filter-container">
      <el-row :gutter="20">
        <el-col :span="3">
          <el-input :placeholder="$t('table.code')" class="filter-item"/>
        </el-col>
        <el-col :span="3">
          <el-input :placeholder="$t('table.name')" class="filter-item"/>
        </el-col>
        <el-col :span="2">
          <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" >搜索</el-button>
        </el-col>
        <el-col :span="2">
          <el-button v-waves class="filter-item" type="warning" icon="el-icon-plus" @click="handleCreate()">新建</el-button>
        </el-col>
      </el-row>
    </div>

    <el-table
      :data="list"
      border
      fit
      highlight-current-row
      row-class-name="article-search-table-row"
      cell-style="padding:2px;"
      style="margin: 10px 0">
      <el-table-column :label="$t('table.code')" align="center" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.code }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.name')" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.rank')" width="100" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.rank }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.createDate')" width="100" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createDate }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.modifyDate')" width="100" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.modifyDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="100px" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusTypeFilter">{{ scope.row.status | statusFilters }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="200" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button v-waves type="primary" size="mini" @click="handleUpdate(scope.row)">{{ $t('table.edit') }}</el-button>
          <el-button v-if="scope.row.status==='draft'" size="mini" type="success" @click="handleModifyStatus(scope.row,'publish')">{{ $t('table.publish') }}
          </el-button>
          <el-button v-if="scope.row.status==='publish'" size="mini" type="danger" @click="handleModifyStatus(scope.row,'draft')">{{ $t('table.draft') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="category-pagination-container">
      <el-pagination v-show="total>0" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>

    <el-dialog :title="$t('table.edit')" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :inline="true" :model="categoryTemp" label-position="center" label-width="70px" style="width: 800px; margin-left:50px;">
        <el-form-item :label="$t('table.code')" prop="code">
          <el-input v-model="categoryTemp.code" :disabled="true" style="width: 300px"/>
        </el-form-item>
        <el-form-item :label="$t('table.name')" prop="title">
          <el-input v-model="categoryTemp.name" style="width: 300px"/>
        </el-form-item>
        <el-form-item :label="$t('table.status')">
          <el-select v-model="categoryTemp.status" class="filter-item" style="width: 300px">
            <el-option v-for="item in status" :key="item" :label="item | statusFilters" :value="item"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('table.rank')" prop="rank">
          <el-input-number v-model="categoryTemp.rank" :min="0" controls-position="right" style="width: 300px"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="updateData()">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="$t('table.create')" :visible.sync="dialogCreateFormVisible">
      <el-form ref="dataForm" :rules="rules" :inline="true" :model="categoryTemp" label-position="center" label-width="70px" style="width: 800px; margin-left:50px;">
        <el-form-item :label="$t('table.name')" prop="title">
          <el-input v-model="categoryTemp.name" style="width: 300px"/>
        </el-form-item>
        <el-form-item :label="$t('table.status')">
          <el-select v-model="categoryTemp.status" class="filter-item" style="width: 300px">
            <el-option v-for="item in status" :key="item" :label="item | statusFilters" :value="item"/>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogCreateFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="createData()">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import waves from '@/directive/waves'
export default {
  name: 'CategorySearch',
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
      status: [
        'publish',
        'draft'
      ],
      listLoading: true,
      dialogCreateFormVisible: false,
      dialogFormVisible: false,
      total: 3,
      listQuery: {
        page: 1,
        limit: 20
      },
      list: [
        {
          code: 'cate1',
          name: 'springboot',
          rank: 22,
          status: 'publish',
          modifyDate: '2018-11-1',
          createDate: '2018-1-1'
        },
        {
          code: 'cate2',
          name: 'springboot',
          rank: 222,
          status: 'publish',
          modifyDate: '2018-11-1',
          createDate: '2018-1-1'
        },
        {
          code: 'cate3',
          name: 'springboot',
          rank: 123,
          status: 'draft',
          modifyDate: '2018-11-1',
          createDate: '2018-1-1'
        },
        {
          code: 'cate4',
          name: 'springboot',
          rank: 2244,
          status: 'publish',
          modifyDate: '2018-11-1',
          createDate: '2018-1-1'
        },
        {
          code: 'cate12111',
          name: 'springboot',
          rank: 432,
          status: 'draft',
          modifyDate: '2018-11-1',
          createDate: '2018-1-1'
        }
      ],
      categoryTemp: {
        code: '',
        name: '',
        status: 'publish',
        rank: 0
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
    handleUpdate(row) {
      this.categoryTemp = Object.assign({}, row)
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleCreate(row) {
      this.categoryTemp = Object.assign({}, row)
      this.dialogCreateFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      // update
    },
    createData() {
      // create
    },
    handleModifyStatus(row, status) {
      // this.$message({
      //   message: '操作成功',
      //   type: 'success'
      // })
      row.status = status
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
.category-search {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
