import request from '@/utils/request'

export function getAllArticles(query) {
  return request({
    url: '/article/list',
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
    url: '/article/create',
    method: 'post',
    data
  })
}

export function getAllCategories(query) {
  return request({
    url: '/category/list',
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
    url: '/category/create',
    method: 'post',
    data
  })
}
