<template>
  <div class="article-update-container">
    <el-form ref="form" :model="form" label-width="50px" label-position="left">
      <el-form-item :label="$t('table.title')">
        <el-input v-model="form.title"/>
      </el-form-item>
      <el-row :gutter="10">
        <el-col :span="2">
          <el-switch
            v-model="isShowContent"
            active-text="摘要"
            inactive-text="正文"
            style="top: 10px;"/>
        </el-col>
        <el-col :span="2">
          <el-form-item label-width="0">
            <el-select v-model="form.category" :placeholder="$t('table.category')" clearable>
              <el-option label="java" value="java"/>
              <el-option label="springboot" value="springboot"/>
              <el-option label="springboot1" value="springboot1"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-form-item label-width="0">
            <el-select v-model="form.type" placeholder="类型">
              <el-option label="原创" value="original"/>
              <el-option label="转载" value="reprinted"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item :label="$t('table.readings')" prop="readings" label-width="60px">
            <el-input-number v-model="form.readings" :min="0" controls-position="right" style="width: 120px"/>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item :label="$t('table.likes')" prop="likes" label-width="60px" >
            <el-input-number v-model="form.likes" :min="0" controls-position="right" style="width: 120px"/>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item :label="$t('table.comments')" prop="comments" label-width="60px" >
            <el-input-number v-model="form.comments" :min="0" controls-position="right" style="width: 120px"/>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item :label="$t('table.rank')" prop="rank" label-width="60px" >
            <el-input-number v-model="form.rank" :min="0" controls-position="right" style="width: 120px"/>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item :label="$t('table.create')" prop="rank" label-width="60px" >
            <el-date-picker v-model="form.createDate" type="date" style="width: 140px"/>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item :label="$t('table.modify')" prop="rank" label-width="60px" >
            <el-date-picker v-model="form.modifyDate" type="date" style="width: 140px"/>
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
                  :file-list="contentPictureList"
                  :before-upload="beforeUpload"
                  :on-preview="handlePicturePreview"
                  :on-remove="handlePictureRemove"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  list-type="picture"
                >
                  <el-button style="width: 200px" size="small" round>{{ $t('table.upload') }}</el-button>
                </el-upload>
                <el-upload
                  v-show="!isShowContent"
                  :file-list="summaryPictureList"
                  :on-preview="handlePicturePreview"
                  :on-remove="handlePictureRemove"
                  :before-upload="beforeUpload"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  list-type="picture"
                >
                  <el-button style="width: 200px" size="small" round>{{ $t('table.upload') }}</el-button>
                </el-upload>
              </el-scrollbar>
            </el-col>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label-width="0">
        <el-button @click="onSubmit">保存</el-button>
        <el-button type="primary" @click="onPublish">发布</el-button>
      </el-form-item>
    </el-form>

    <el-dialog :visible.sync="dialogPictureVisible">
      <img :src="dialogPictureImageUrl" width="100%" alt="">
    </el-dialog>

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
      dialogPictureImageUrl: '',
      dialogPictureVisible: false,
      isShowUpload: false,
      isShowContent: false,
      form: {
        title: '',
        content: '',
        summary: '',
        status: '',
        category: '',
        type: '',
        link: '',
        likes: 0,
        readings: 0,
        comments: 0,
        rank: 0,
        createDate: '',
        modifyDate: ''
      },
      contentPictureList: [],
      summaryPictureList: [],
      html: ''
    }
  },
  methods: {
    handlePicturePreview(file) {
      this.dialogPictureImageUrl = file.url
      this.dialogPictureVisible = true
    },
    handlePictureRemove(file, fileList) {
      console.log(file, fileList)
    },
    beforeUpload(file) {
      console.log(file)
      // const isLt2M = file.size / 1024 / 1024 < 2;
      console.log('size:' + file.size / 1024 + 'KB')
    },
    onSubmit() {

    },
    onPublish() {
    },
    markdown2Html() {
      import('showdown').then(showdown => {
        const converter = new showdown.Converter()
        this.form.content = converter.makeHtml(this.form.content)
        this.form.summary = converter.makeHtml(this.form.summary)
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
