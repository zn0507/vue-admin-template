import request from '@/utils/request'

export const ArticlePrefix = '/artSer'
export const PicturePrefix = 'http://localhost:81/article/'

export function getAllArticle(query) {
  return request({
    url: '/article',
    method: 'get',
    params: query
  })
}

export function getArticleById(id) {
  return request({
    url: '/article/list',
    method: 'get',
    params: { id }
  })
}

export function updateArticle(data) {
  return request({
    url: '/article',
    method: 'post',
    data
  })
}

export function getAllCategory(query) {
  return request({
    url: '/articleCategory',
    method: 'get',
    params: query
  })
}

export function getCategoryById(id) {
  return request({
    url: '/category/list',
    method: 'get',
    params: { id }
  })
}

export function updateCategory(data) {
  return request({
    url: '/articleCategory',
    method: 'post',
    data
  })
}

export function getAllPicture(query) {
  return request({
    url: '/articlePicture',
    method: 'get',
    params: query
  })
}
