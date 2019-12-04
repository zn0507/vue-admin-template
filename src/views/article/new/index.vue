<template>
  <div class="article-new-container">
    <el-form ref="form" :model="form">
      <el-form-item>
        <el-input v-model="form.title" :placeholder="$t('table.title')"/>
      </el-form-item>
      <el-row :gutter="5">
        <!-- <el-col :span="2">
          <el-switch
            v-model="isShowContent"
            active-text="摘要"
            inactive-text="正文"
            style="top: 10px;"/>
        </el-col> -->
        <el-col :span="3">
          <el-form-item>
            <el-select v-model="form.status" :placeholder="$t('table.status')" clearable>
              <el-option label="发布" value="Publish"/>
              <el-option label="草稿" value="Draft"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item>
            <el-select v-model="form.category.id" :placeholder="$t('table.category')" filterable clearable style="width: 200px" class="filter-item">
              <el-option v-for="item in category" :key="item.id" :label="item.name" :value="item.id"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item>
            <el-select v-model="form.type" :placeholder="$t('table.type')" clearable>
              <el-option label="原创" value="original"/>
              <el-option label="转载" value="reprinted"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col v-show="isShowLink" :span="7">
          <el-form-item>
            <el-input v-model="form.link" :placeholder="$t('table.link')"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <markdown-editor v-show="!isShowContent" id="contentEditor" ref="contentEditor" v-model="form.content" :z-index="20" style="height: auto"/>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button @click="onSubmit">保存</el-button>
        <el-button type="primary" @click="onPublish">发布</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import '@/styles/article.css'
import waves from '@/directive/waves'
import MarkdownEditor from '@/components/MarkdownEditor'
import { updateArticle, getAllCategory } from '@/api/article'
import store from '@/store'
import { getToken } from '@/utils/auth'
export default {
  name: 'ArticleNew',
  components: { MarkdownEditor },
  directives: {
    waves
  },
  data() {
    return {
      isShowLink: false,
      dialogPictureName: '',
      dialogPictureImageUrl: '',
      dialogPictureVisible: false,
      isShowUpload: false,
      isShowContent: false,
      form: {
        title: '',
        content: '',
        status: '',
        type: '',
        link: '',
        likes: 0,
        readings: 0,
        comments: 0,
        rank: 0,
        createDate: '',
        modificationDate: '',
        category: { 'id': '' },
        createUser: store.getters.code,
        lastModifyUser: store.getters.code,
        menu: ''
      },
      pQuery: {
        page: 0,
        limit: 0,
        name: '',
        id: '',
        showPage: true
      },
      category: [],
      pictureList: [],
      pictureProps: {
        articleId: ''
      },
      html: '',
      headers: {
        'Authorization': getToken()
      }
    }
  },
  watch: {
    form: {
      handler(val, oldVal) {
        // console.log(val)
        // console.log(oldVal)
      },
      deep: true
    },
    'form.type'(val) {
      this.isShowLink = val === 'reprinted'
    }
  },
  beforeMount() {
    getAllCategory(this.pQuery)
      .then(res => {
        this.category = res.data.content
      })
  },
  methods: {
    saveArticle(data) {
      updateArticle(data)
        .then(res => {
          if (res.status === 200) {
            this.$message({
              message: '操作成功',
              type: 'success'
            })
            this.$router.push('/article/update/' + res.data.content.id)
          }
        })
    },
    handlePicturePreview(file) {
      this.dialogPictureImageUrl = file.url
      this.dialogPictureVisible = true
    },
    handlePictureRemove(file, fileList) {
      console.log(file, fileList)
    },
    beforeUpload(file) {
      // console.log(file)
      // const isLt2M = file.size / 1024 / 1024 < 2;
      // console.log('size:' + file.size / 1024 + 'KB')
      // this.pictureProps.articleId = this.form.id
    },
    onSubmit() {
      const article = Object.assign({}, this.form)
      this.saveArticle(article)
    },
    onPublish() {
    },
    markdown2Html() {
      import('showdown').then(showdown => {
        const converter = new showdown.Converter()
        this.form.content = converter.makeHtml(this.form.content)
        this.form.summary = converter.makeHtml(this.form.summary)
      })
    },
    loadSuccess(res) {
      if (res === 'SUCCESS') {
        this.$message({
          message: '上传成功',
          type: 'success'
        })
      } else {
        this.$message.error('上传失败')
      }
    },
    loadError() {
      this.$refs.upload.clearFiles()
      this.$message.error('上传失败')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .article-new {
    &-container {
      margin: 30px;
    }
    &-text {
      font-size: 30px;
      line-height: 46px;
    }
  }
</style>
