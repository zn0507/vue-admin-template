import request from '@/utils/request'

export function getAllPermissionEnums() {
  return request({
    url: '/permissionEnum',
    method: 'get'
  })
}

export function getAllPermissions(query) {
  return request({
    url: '/permissions',
    method: 'get',
    params: query
  })
}

export function getPermissionById(id) {
  return request({
    url: '/Permissions/list',
    method: 'get',
    params: { id }
  })
}

export function updatePermission(data) {
  return request({
    url: '/Permissions/create',
    method: 'post',
    data
  })
}

export function getAllRoles(query) {
  return request({
    url: '/role/list',
    method: 'get',
    params: query
  })
}

export function getRoleById(id) {
  return request({
    url: '/Role/list',
    method: 'get',
    params: { id }
  })
}

export function updateRole(data) {
  return request({
    url: '/Role/create',
    method: 'post',
    data
  })
}

export function getAllUsers(query) {
  return request({
    url: '/user/list',
    method: 'get',
    params: query
  })
}

export function getUserById(id) {
  return request({
    url: '/user/list',
    method: 'get',
    params: { id }
  })
}

export function updateUser(data) {
  return request({
    url: '/user/create',
    method: 'post',
    data
  })
}
