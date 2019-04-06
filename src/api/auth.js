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

export function getJwtToken(data) {
  return request({
    url: AuthPrefix + '/oauth/token',
    method: 'post',
    data: JSON.stringify({
      grant_type: 'password',
      username: 'admin',
      password: 'admin'
    }),
    headers: {
      'Content-Type': 'application/json'
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
