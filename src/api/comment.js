import request from '@/utils/request'

export function getAllComments(query) {
  return request({
    url: '/comment/list',
    method: 'get',
    params: query
  })
}
