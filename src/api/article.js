import request from '@/utils/request'
// import { delNullQueryInfo } from '@/utils/index'
export const ArticlePrefix = ''
export const PicturePrefix = 'http://localhost:81/article/'

export const ArtQueryInfo = {
  page: 0,
  limit: 0,
  id: '',
  code: '',
  name: '',
  status: 'Publish'
}

export function getAllArticle(query) {
  // delNullQueryInfo(query)
  return request({
    url: ArticlePrefix + '/article/list',
    method: 'get',
    params: query
  })
}

export function getArticleById(id) {
  return request({
    url: ArticlePrefix + '/article/list',
    method: 'get',
    params: { id }
  })
}

export function updateArticle(data) {
  return request({
    url: ArticlePrefix + '/article/save',
    method: 'post',
    data
  })
}

export function getAllCategory() {
  // delNullQueryInfo(query)
  return request({
    url: ArticlePrefix + '/category/list',
    method: 'get'
  })
}

export function getCategoryById(id) {
  return request({
    url: ArticlePrefix + '/category/list',
    method: 'get',
    params: { id }
  })
}

export function updateCategory(data) {
  return request({
    url: ArticlePrefix + '/category/save',
    method: 'post',
    data
  })
}

export function getAllPicture(query) {
  // delNullQueryInfo(query)
  return request({
    url: ArticlePrefix + '/articlePicture',
    method: 'get',
    params: query
  })
}
