<template>
  <div class="article-new-container">
    <el-form ref="form" :model="form">
      <el-form-item>
        <el-input v-model="form.title" :placeholder="$t('table.title')"/>
      </el-form-item>
      <el-row :gutter="5">
        <el-col :span="2">
          <el-switch
            v-model="isShowContent"
            active-text="摘要"
            inactive-text="正文"
            style="top: 10px;"/>
        </el-col>
        <el-col :span="3">
          <el-form-item>
            <el-select v-model="form.status" :placeholder="$t('table.status')" clearable>
              <el-option label="发布" value="publish"/>
              <el-option label="草稿" value="draft"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item>
            <el-select v-model="form.category.id" :placeholder="$t('table.category')" clearable style="width: 200px" class="filter-item">
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
        <el-col :span="2">
          <el-popover
            placement="bottom"
            width="250"
            trigger="click"
            content="<div class=&quot;scroll_title&quot;></div>">
            <el-button slot="reference">文章目录css</el-button>
          </el-popover>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="18">
          <markdown-editor v-show="!isShowContent" id="contentEditor" ref="contentEditor" v-model="form.content" :z-index="20" style="height: auto"/>
          <markdown-editor v-show="isShowContent" id="summaryEditor" ref="summaryEditor" v-model="form.summary.content" :z-index="20" style="height: auto"/>
        </el-col>
        <el-col :span="6">
          <el-form-item style="margin-bottom: 0" label-width="0">
            <el-col :span="24" style="height: 350px; " class="upload-picture">
              <el-scrollbar style="height: 100%;">
                <el-upload
                  ref="upload"
                  :file-list="pictureList"
                  :data="pictureProps"
                  :before-upload="beforeUpload"
                  :on-preview="handlePicturePreview"
                  :on-remove="handlePictureRemove"
                  :on-success="loadSuccess"
                  :on-error="loadError"
                  :auto-upload="false"
                  :headers="headers"
                  action="/api/artSer/picture/upload"
                  list-type="picture"
                >
                  <!--<el-button style="width: 200px" size="small" round>{{ $t('table.upload') }}</el-button>-->
                  <el-button slot="trigger" style="width: 200px" size="small" plain round>选取图片</el-button>
                  <el-button style="width: 200px" size="small" plain round @click="submitUpload">上传到服务器</el-button>
                </el-upload>
              </el-scrollbar>
            </el-col>
          </el-form-item>
          <el-row style="margin: 10px 0;">
            <el-button style="width: 200px" size="small" round plain @click="getAllPicture">获取文章所有图片</el-button>
          </el-row>
          <el-row>
            <el-col :span="24" style="height: 250px;" class="upload-picture">
              <el-scrollbar style="height: 100%;">
                <img v-for="pic in pictures" :key="pic.id" :src="pic.link" width="120" alt="" @click="showPic(pic)">
              </el-scrollbar>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button @click="onSubmit">保存</el-button>
        <el-button type="primary" @click="onPublish">发布</el-button>
      </el-form-item>
    </el-form>

    <el-dialog :visible.sync="dialogPictureVisible">
      <el-row>{{ dialogPictureName }}</el-row>
      <img :src="dialogPictureImageUrl" width="100%" alt="">
    </el-dialog>
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
        summary: {
          'code': '',
          'name': '',
          'createDate': '',
          'modificationDate': '',
          'status': 'publish',
          'createUser': store.getters.code,
          'lastModifyUser': store.getters.code,
          'content': '',
          'rank': 0
        },
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
        code: '',
        name: '',
        status: 'publish',
        id: ''
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
      article.modificationDate = new Date()
      article.createDate = new Date()
      article.createUser = '1'
      article.lastModifyUser = '1'
      article.summary.modificationDate = new Date()
      article.summary.createDate = new Date()
      article.summary.createUser = '1'
      article.summary.lastModifyUser = '1'
      article.menu = '"前言""搭建""编写""运营""结束"'
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
