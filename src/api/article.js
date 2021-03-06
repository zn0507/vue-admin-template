import request from '@/utils/request'
import { PREFIX } from '@/constant/constant'
// import { delNullQueryInfo } from '@/utils/index'
export const ArticlePrefix = PREFIX
// export const PicturePrefix = 'http://localhost:81/blog/article/'
export const PicturePrefix = 'http://localhost:80/blogpics/article/'

export const ArtQueryInfo = {
  page: 0,
  limit: 0,
  id: '',
  code: '',
  name: '',
  status: 'Publish',
  showPage: false
}

export const CategoryQueryInfo = {
  page: 0,
  limit: 0,
  id: '',
  name: '',
  showPage: false
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

export function getAllCategory(query) {
  // delNullQueryInfo(query)
  return request({
    url: ArticlePrefix + '/category/list',
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
