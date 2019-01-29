<template>
  <div class="article-update-container">
    <el-form ref="form" :model="form" label-width="50px" label-position="left">
      <el-form-item :label="$t('table.title')">
        <el-input v-model="form.title"/>
      </el-form-item>
      <el-row :gutter="5">
        <el-col :span="2">
          <el-switch
            v-model="isShowContent"
            active-text="摘要"
            inactive-text="正文"
            style="top: 10px;"/>
        </el-col>
        <el-col :span="5">
          <el-form-item>
            <el-select v-model="form.status" :label="$t('table.status')">
              <el-option label="发布" value="publish"/>
              <el-option label="草稿" value="draft"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item>
            <el-select v-model="form.category" placeholder="类别">
              <el-option label="java" value="java"/>
              <el-option label="springboot" value="springboot"/>
              <el-option label="springboot1" value="springboot1"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item>
            <el-select v-model="form.type" placeholder="类型">
              <el-option label="原创" value="original"/>
              <el-option label="转载" value="reprinted"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="18">
          <markdown-editor v-show="isShowContent" id="contentEditor" ref="contentEditor" v-model="form.content" :z-index="20" style="height: auto"/>
          <markdown-editor v-show="!isShowContent" id="summaryEditor" ref="summaryEditor" v-model="form.summary" :z-index="20" style="height: auto"/>
        </el-col>
        <el-col :span="6">
          <el-form-item style="margin-bottom: 0">
            <el-col :span="24" style="height: 650px; " class="upload-picture">
              <el-scrollbar style="height: 100%;">
                <el-upload
                  v-show="isShowContent"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  list-type="picture-card"
                >
                  <i class="el-icon-plus"/>
                </el-upload>
                <el-upload
                  v-show="!isShowContent"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  list-type="picture-card"
                >
                  <i class="el-icon-plus"/>
                </el-upload>
              </el-scrollbar>
            </el-col>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button @click="onSubmit">保存</el-button>
        <el-button type="primary" @click="onPublish">发布</el-button>
      </el-form-item>
    </el-form>

    <el-dialog :title="$t('table.upload')" :visible.sync="isShowUpload" center>
      <el-upload
        v-show="isShowContent"
        action="https://jsonplaceholder.typicode.com/posts/"
        list-type="picture-card"
      >
        <i class="el-icon-plus"/>
      </el-upload>
      <el-upload
        v-show="!isShowContent"
        action="https://jsonplaceholder.typicode.com/posts/"
        list-type="picture-card"
      >
        <i class="el-icon-plus"/>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import '@/styles/article.css'
import waves from '@/directive/waves'
import MarkdownEditor from '@/components/MarkdownEditor'
export default {
  name: 'ArticleUpdate',
  components: { MarkdownEditor },
  directives: {
    waves
  },
  data() {
    return {
      isShowUpload: false,
      isShowContent: false,
      form: {
        title: '',
        content: '',
        summary: '',
        status: '',
        category: '',
        type: '',
        link: ''
      },
      contentPictureList: [],
      summaryPictureList: [],
      html: ''
    }
  },
  methods: {
    onSubmit() {

    },
    onPublish() {
    },
    markdown2Html() {
      import('showdown').then(showdown => {
        const converter = new showdown.Converter()
        this.html = converter.makeHtml(this.form.content)
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.article-update {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
