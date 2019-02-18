<template>
  <div class="role-container">
    <div class="permission-filter-container">
      <el-row :gutter="20">
        <el-col :span="3">
          <el-input :placeholder="$t('table.code')" class="filter-item"/>
        </el-col>
        <el-col :span="3">
          <el-input :placeholder="$t('table.name')" class="filter-item"/>
        </el-col>
        <el-col :span="3">
          <el-select v-model="statusFilter" :placeholder="$t('table.status')" clearable class="filter-item">
            <el-option v-for="item in status" :key="item" :label="item" :value="item"/>
          </el-select>
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
      <el-table-column :label="$t('table.permission')" width="100" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.permission }}</span>
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
      <el-table-column :label="$t('table.createUser')" width="100" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createUser }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.lastModifyUser')" width="120" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.lastModifyUser }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.status')" width="100px" align="center">
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

    <el-dialog :title="$t('table.edit')" :visible.sync="isShow" width="600px">
      <el-form ref="dataForm" :rules="rules" :inline="true" :model="permissionTemp" label-position="center" label-width="70px" style="width: 600px">
        <el-form-item :label="$t('table.code')" prop="code">
          <el-input v-model="permissionTemp.code" :disabled="true" />
        </el-form-item>
        <el-form-item :label="$t('table.name')" prop="name">
          <el-input v-model="permissionTemp.name" />
        </el-form-item>
        <el-form-item :label="$t('table.status')">
          <el-select v-model="permissionTemp.status" class="filter-item" style="width: 185px" clearable>
            <el-option v-for="item in status" :key="item" :label="item | statusFilters" :value="item"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('table.permission')" prop="permission">
          <el-select v-model="permissionTemp.permission" class="filter-item" style="width: 185px" clearable>
            <el-option v-for="item in permission" :key="item" :label="item" :value="item"/>
          </el-select>
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
export default {
  name: 'Role',
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
      permission: [
        'All', 'Resume', 'Article', 'Category'
      ],
      isShowCreate: false,
      isShow: false,
      statusFilter: '',
      status: ['publish', 'draft'],
      total: 3,
      listQuery: {
        page: 1,
        limit: 20
      },
      list: [
        {
          code: '123',
          name: '123',
          status: 'draft',
          permission: 'All',
          createDate: '2019-01-14',
          modifyDate: '2019-01-14',
          createUser: 'system',
          lastModifyUser: 'system'
        },
        {
          code: '12312322',
          name: '12312321',
          status: 'publish',
          permission: 'Article',
          createDate: '2019-01-14',
          modifyDate: '2019-01-14',
          createUser: 'system',
          lastModifyUser: 'system'
        },
        {
          code: '123',
          name: '123',
          status: 'publish',
          permission: 'Resume',
          createDate: '2019-01-14',
          modifyDate: '2019-01-14',
          createUser: 'system',
          lastModifyUser: 'system'
        }
      ],
      permissionTemp: {
        code: '',
        name: '',
        status: '',
        permission: ''
      },
      rules: {
        // type: [{ required: true, message: 'type is required', trigger: 'change' }],
        // timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        // title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      }
    }
  },
  methods: {
    handleCreate() {
    },
    handleUpdate(row) {
      this.permissionTemp = Object.assign({}, row)
      this.isShow = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleModifyStatus(row, status) {
      // this.$message({
      //   message: '操作成功',
      //   type: 'success'
      // })
      row.status = status
    },
    updateData() {
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.role {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>