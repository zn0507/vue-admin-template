<template>
  <div class="link-container">
    link
    <el-button @click="getToken">123123123</el-button>
  </div>
</template>

<script>
import { getJwtToken } from '@/api/auth'
export default {
  name: 'Link',
  data() {
    return {
      auth: {
        username: 'admin',
        password: 'admin'
      }
    }
  },
  methods: {
    getToken() {
      getJwtToken(this.auth)
        .then(res => {
          console.log(res)
        })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.link {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
