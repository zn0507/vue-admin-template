import request from '@/utils/request'

export const UserPrefix = '/api/userSer'

export const UserQueryInfo = {
  page: 0,
  limit: 0,
  id: '',
  code: '',
  name: '',
  status: 'publish',
  orderDesc: [],
  orderAsc: []
}

export function getAllPermissionEnums() {
  return request({
    url: UserPrefix + '/permissionEnum',
    method: 'get'
  })
}

export function getAllPermissions(query) {
  return request({
    url: UserPrefix + '/permission',
    method: 'get',
    params: query
  })
}

export function updatePermission(data) {
  return request({
    url: UserPrefix + '/permission',
    method: 'post',
    data
  })
}

export function getPermissionById(id) {
  return request({
    url: UserPrefix + '/Permissions/list',
    method: 'get',
    params: { id }
  })
}

export function getAllRoles(query) {
  return request({
    url: UserPrefix + '/role',
    method: 'get',
    params: query
  })
}

export function getRoleById(id) {
  return request({
    url: UserPrefix + '/Role/list',
    method: 'get',
    params: { id }
  })
}

export function updateRole(data) {
  return request({
    url: UserPrefix + '/role',
    method: 'post',
    data
  })
}

export function getAllUsers(query) {
  return request({
    url: UserPrefix + '/user',
    method: 'get',
    params: query
  })
}

export function getUserById(id) {
  return request({
    url: UserPrefix + '/user/list',
    method: 'get',
    params: { id }
  })
}

export function updateUser(data) {
  return request({
    url: UserPrefix + '/user',
    method: 'post',
    data
  })
}
