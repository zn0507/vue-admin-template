<template>
  <div class="article-update-container">
    <el-form ref="form" :model="form" label-width="50px" label-position="left">
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item :label="$t('table.title')">
            <el-input v-model="form.title"/>
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
        <!--<el-col :span="3">-->
        <!--<el-form-item :label="$t('table.comments')" prop="comments" label-width="60px" >-->
        <!--<el-input-number v-model="form.comments" :min="0" controls-position="right" style="width: 120px"/>-->
        <!--</el-form-item>-->
        <!--</el-col>-->
        <el-col :span="3">
          <el-form-item :label="$t('table.summaryRank')" label-width="70px" >
            <el-input-number v-model="form.articleSummary.rank" :min="0" controls-position="right" style="width: 120px"/>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item :label="$t('table.rank')" prop="rank" label-width="60px" >
            <el-input-number v-model="form.rank" :min="0" controls-position="right" style="width: 120px"/>
          </el-form-item>
        </el-col>
      </el-row>
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
            <el-select v-model="form.articleCategory" :placeholder="$t('table.category')" value-key="id">
              <el-option v-for="item in category" :key="item.id" :label="item.name" :value="item.id"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-form-item label-width="0">
            <el-select v-model="form.articleType" placeholder="类型" value-key="code" @change="changeArticleType">
              <el-option v-for="item in type" :key="item.code" :label="item.name" :value="item.code" />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="2">
          <el-button plain>修改文章目录</el-button>
        </el-col>

        <el-col :span="3">
          <el-form-item :label="$t('table.createDate')" prop="rank" label-width="70px" >
            <el-date-picker v-model="form.createDate" type="date" style="width: 140px"/>
          </el-form-item>
        </el-col>
        <el-col :span="6" style="margin-left: 10px">
          <el-form-item v-show="isShowLink" :label="$t('table.link')" label-width="70px">
            <el-input v-model="form.link"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="18">
          <markdown-editor v-show="!isShowContent" id="contentEditor" ref="contentEditor" v-model="form.content" :z-index="20" style="height: auto"/>
          <markdown-editor v-show="isShowContent" id="summaryEditor" ref="summaryEditor" v-model="form.articleSummary.content" :z-index="20" style="height: auto"/>
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
                  action="/picture/upload"
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
      <el-form-item label-width="0">
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
import { getAllArticle, getAllCategory, updateArticle, PicturePrefix, getAllPicture } from '@/api/article'
import store from '@/store'

export default {
  name: 'ArticleUpdate',
  components: { MarkdownEditor },
  directives: {
    waves
  },
  data() {
    return {
      listLoading: false,
      dialogPictureImageUrl: '',
      dialogPictureVisible: false,
      dialogPictureName: '',
      isShowUpload: false,
      isShowContent: false,
      isShowLink: false,
      pictureProps: {
        articleId: ''
      },
      picQuery: {
        page: 1,
        limit: 10,
        code: '',
        name: '',
        status: 'publish',
        id: '',
        articleId: ''
      },
      form: {
        title: '',
        content: '',
        articleSummary: {},
        status: '',
        articleType: '',
        link: '',
        likes: 0,
        readings: 0,
        comments: 0,
        rank: 0,
        createDate: '',
        modificationDate: '',
        articleCategory: {},
        createUser: '',
        lastModifyUser: store.getters.code
      },
      query: {
        page: 1,
        limit: 10,
        code: '',
        name: '',
        status: 'publish',
        id: '',
        title: '',
        category: '',
        createDate: ''
      },
      pictureList: [],
      html: '',
      category: [],
      pQuery: {
        page: 0,
        limit: 0,
        code: '',
        name: '',
        status: 'publish',
        id: ''
      },
      type: [{
        code: 'original',
        name: '原创'
      }, {
        code: 'reprinted',
        name: '转载'
      }],
      pictures: []
    }
  },
  beforeMount() {
    getAllCategory(this.pQuery)
      .then(res => {
        this.category = res.data.content
      })
    this.query.id = this.$route.params.id
    this.getArticle(this.query)
    this.isShowLink = this.form.articleType === 'original'
  },
  methods: {
    getPictures(query) {
      getAllPicture(query)
        .then(res => {
          res.data.content.forEach(pic => {
            const picTemp = Object.assign({}, pic)
            picTemp.link = PicturePrefix + picTemp.link
            this.pictures.push(picTemp)
          })
        })
    },
    getArticle(query) {
      this.listLoading = true
      getAllArticle(query)
        .then(res => {
          this.form = res.data.content[0]
          this.form.articleCategory = this.form.articleCategory.id
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
      this.pictureProps.articleId = this.form.id
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
    },
    submitUpload() {
      this.$refs.upload.submit()
    },
    onSubmit() {
      const article = Object.assign({}, this.form)
      article.menu = ''
      article.articleCategory = { 'id': this.form.articleCategory }
      this.saveArticle(article)
    },
    onPublish() {
      const article = Object.assign({}, this.form)
      article.menu = ''
      article.articleCategory = { 'id': this.form.articleCategory }
      article.status = 'publish'
      this.saveArticle(article)
    },
    markdown2Html() {
      import('showdown').then(showdown => {
        const converter = new showdown.Converter()
        this.form.content = converter.makeHtml(this.form.content)
        this.form.articleSummary.content = converter.makeHtml(this.form.articleSummary.content)
      })
    },
    changeArticleType(val) {
      this.isShowLink = val !== 'original'
    },
    getAllPicture() {
      this.pictures = []
      this.picQuery.articleId = this.form.id
      this.getPictures(this.picQuery)
    },
    showPic(val) {
      this.dialogPictureVisible = true
      this.dialogPictureImageUrl = val.link
      this.dialogPictureName = val.link
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
