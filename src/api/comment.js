import request from '@/utils/request'

export const ComtPrefix = '/comtSer'

export function getAllComments(query) {
  return request({
    url: '/comment/list',
    method: 'get',
    params: query
  })
}
