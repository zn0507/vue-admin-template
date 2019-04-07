import request from '@/utils/request'

export const AuthPrefix = '/api/authSer'

export const AuthQueryInfo = {
  page: 0,
  limit: 0,
  id: '',
  code: '',
  name: '',
  status: 'publish'
}

export function get(query) {
  return request({
    url: AuthPrefix + '/permission',
    method: 'get',
    params: query
  })
}

export function getJwtToken(params) {
  return request({
    url: AuthPrefix + '/oauth/token',
    method: 'post',
    params: {
      grant_type: 'password',
      username: params.username,
      password: params.password
    },
    auth: {
      username: 'web',
      password: 'secret'
    }
  })
}

export function refreshJwtToken(data) {
  return request({
    url: AuthPrefix + '/oauth/refresh',
    method: 'post',
    data
  })
}
