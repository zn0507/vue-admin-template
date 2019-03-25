import request from '@/utils/request'

export const ArticlePrefix = '/api/artSer'
export const PicturePrefix = 'http://localhost:81/article/'

export const ArtQueryInfo = {
}

export function getAllArticle(query) {
  return request({
    url: ArticlePrefix + '/article',
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
    url: ArticlePrefix + '/article',
    method: 'post',
    data
  })
}

export function getAllCategory(query) {
  return request({
    url: ArticlePrefix + '/articleCategory',
    method: 'get',
    params: query
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
    url: ArticlePrefix + '/articleCategory',
    method: 'post',
    data
  })
}

export function getAllPicture(query) {
  return ArticlePrefix + request({
    url: '/articlePicture',
    method: 'get',
    params: query
  })
}
