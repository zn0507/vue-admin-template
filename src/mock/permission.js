
const permissionEnums = [
  'All'
]

const permissions = [
  {
    'id': '1',
    'code': '1',
    'name': '1',
    'createDate': 1548974819703,
    'modificationDate': 1548974821321,
    'status': 'publish',
    'createUser': '1',
    'lastModifyUser': '1',
    'permission': 'All'
  },
  {
    'id': '4028860f68e74d6e0168e74d9d2a0000',
    'code': 'Dashboard',
    'name': 'Dashboard',
    'createDate': 1550068849948,
    'modificationDate': 1550068849948,
    'status': 'publish',
    'createUser': 'system',
    'lastModifyUser': 'system',
    'permission': 'Dashboard'
  },
  {
    'id': '4028860f68e74d6e0168e74d9d360001',
    'code': 'Article',
    'name': 'Article',
    'createDate': 1550068849974,
    'modificationDate': 1550068849974,
    'status': 'publish',
    'createUser': 'system',
    'lastModifyUser': 'system',
    'permission': 'Article'
  },
  {
    'id': '4028860f68e74d6e0168e74d9d370002',
    'code': 'ArticleSearch',
    'name': 'ArticleSearch',
    'createDate': 1550068849975,
    'modificationDate': 1550068849975,
    'status': 'publish',
    'createUser': 'system',
    'lastModifyUser': 'system',
    'permission': 'ArticleSearch'
  },
  {
    'id': '4028860f68e74d6e0168e74d9d370003',
    'code': 'ArticleNew',
    'name': 'ArticleNew',
    'createDate': 1550068849975,
    'modificationDate': 1550068849975,
    'status': 'publish',
    'createUser': 'system',
    'lastModifyUser': 'system',
    'permission': 'ArticleNew'
  },
  {
    'id': '4028860f68e74d6e0168e74d9d380004',
    'code': 'ArticleUpdate',
    'name': 'ArticleUpdate',
    'createDate': 1550068849975,
    'modificationDate': 1550068849975,
    'status': 'publish',
    'createUser': 'system',
    'lastModifyUser': 'system',
    'permission': 'ArticleUpdate'
  },
  {
    'id': '4028860f68e74d6e0168e74d9d390005',
    'code': 'Category',
    'name': 'Category',
    'createDate': 1550068849976,
    'modificationDate': 1550068849976,
    'status': 'publish',
    'createUser': 'system',
    'lastModifyUser': 'system',
    'permission': 'Category'
  },
  {
    'id': '4028860f68e74d6e0168e74d9d390006',
    'code': 'CategoryNew',
    'name': 'CategoryNew',
    'createDate': 1550068849977,
    'modificationDate': 1550068849977,
    'status': 'publish',
    'createUser': 'system',
    'lastModifyUser': 'system',
    'permission': 'CategoryNew'
  },
  {
    'id': '4028860f68e74d6e0168e74d9d390007',
    'code': 'CategorySearch',
    'name': 'CategorySearch',
    'createDate': 1550068849977,
    'modificationDate': 1550068849977,
    'status': 'publish',
    'createUser': 'system',
    'lastModifyUser': 'system',
    'permission': 'CategorySearch'
  },
  {
    'id': '4028860f68e74d6e0168e74d9d390008',
    'code': 'CategoryUpdate',
    'name': 'CategoryUpdate',
    'createDate': 1550068849977,
    'modificationDate': 1550068849977,
    'status': 'publish',
    'createUser': 'system',
    'lastModifyUser': 'system',
    'permission': 'CategoryUpdate'
  },
  {
    'id': '4028860f68e74d6e0168e74d9d3a0009',
    'code': 'Comment',
    'name': 'Comment',
    'createDate': 1550068849977,
    'modificationDate': 1550068849977,
    'status': 'publish',
    'createUser': 'system',
    'lastModifyUser': 'system',
    'permission': 'Comment'
  },
  {
    'id': '4028860f68e74d6e0168e74d9d3a000a',
    'code': 'CommentSearch',
    'name': 'CommentSearch',
    'createDate': 1550068849978,
    'modificationDate': 1550068849978,
    'status': 'publish',
    'createUser': 'system',
    'lastModifyUser': 'system',
    'permission': 'CommentSearch'
  },
  {
    'id': '4028860f68e74d6e0168e74d9d3a000b',
    'code': 'CommentUpdate',
    'name': 'CommentUpdate',
    'createDate': 1550068849978,
    'modificationDate': 1550068849978,
    'status': 'publish',
    'createUser': 'system',
    'lastModifyUser': 'system',
    'permission': 'CommentUpdate'
  },
  {
    'id': '4028860f68e74d6e0168e74d9d3a000c',
    'code': 'Resume',
    'name': 'Resume',
    'createDate': 1550068849978,
    'modificationDate': 1550068849978,
    'status': 'publish',
    'createUser': 'system',
    'lastModifyUser': 'system',
    'permission': 'Resume'
  },
  {
    'id': '4028860f68e74d6e0168e74d9d3b000d',
    'code': 'ResumeNew',
    'name': 'ResumeNew',
    'createDate': 1550068849979,
    'modificationDate': 1550068849979,
    'status': 'publish',
    'createUser': 'system',
    'lastModifyUser': 'system',
    'permission': 'ResumeNew'
  },
  {
    'id': '4028860f68e74d6e0168e74d9d3b000e',
    'code': 'ResumeSearch',
    'name': 'ResumeSearch',
    'createDate': 1550068849979,
    'modificationDate': 1550068849979,
    'status': 'publish',
    'createUser': 'system',
    'lastModifyUser': 'system',
    'permission': 'ResumeSearch'
  },
  {
    'id': '4028860f68e74d6e0168e74d9d3c000f',
    'code': 'ResumeUpdate',
    'name': 'ResumeUpdate',
    'createDate': 1550068849979,
    'modificationDate': 1550068849979,
    'status': 'publish',
    'createUser': 'system',
    'lastModifyUser': 'system',
    'permission': 'ResumeUpdate'
  },
  {
    'id': '4028860f68e74d6e0168e74d9d3d0010',
    'code': 'ResumePublish',
    'name': 'ResumePublish',
    'createDate': 1550068849981,
    'modificationDate': 1550068849981,
    'status': 'publish',
    'createUser': 'system',
    'lastModifyUser': 'system',
    'permission': 'ResumePublish'
  },
  {
    'id': '4028860f68e74d6e0168e74d9d3d0011',
    'code': 'System',
    'name': 'System',
    'createDate': 1550068849981,
    'modificationDate': 1550068849981,
    'status': 'publish',
    'createUser': 'system',
    'lastModifyUser': 'system',
    'permission': 'System'
  },
  {
    'id': '4028860f68e74d6e0168e74d9d3d0012',
    'code': 'SystemLink',
    'name': 'SystemLink',
    'createDate': 1550068849981,
    'modificationDate': 1550068849981,
    'status': 'publish',
    'createUser': 'system',
    'lastModifyUser': 'system',
    'permission': 'SystemLink'
  },
  {
    'id': '4028860f68e74d6e0168e74d9d3e0013',
    'code': 'SystemOthers',
    'name': 'SystemOthers',
    'createDate': 1550068849982,
    'modificationDate': 1550068849982,
    'status': 'publish',
    'createUser': 'system',
    'lastModifyUser': 'system',
    'permission': 'SystemOthers'
  },
  {
    'id': '4028860f68e74d6e0168e74d9d3e0014',
    'code': 'User',
    'name': 'User',
    'createDate': 1550068849982,
    'modificationDate': 1550068849982,
    'status': 'publish',
    'createUser': 'system',
    'lastModifyUser': 'system',
    'permission': 'User'
  },
  {
    'id': '4028860f68e74d6e0168e74d9d3e0015',
    'code': 'UserNew',
    'name': 'UserNew',
    'createDate': 1550068849982,
    'modificationDate': 1550068849982,
    'status': 'publish',
    'createUser': 'system',
    'lastModifyUser': 'system',
    'permission': 'UserNew'
  },
  {
    'id': '4028860f68e74d6e0168e74d9d3f0016',
    'code': 'UserSearch',
    'name': 'UserSearch',
    'createDate': 1550068849982,
    'modificationDate': 1550068849982,
    'status': 'publish',
    'createUser': 'system',
    'lastModifyUser': 'system',
    'permission': 'UserSearch'
  },
  {
    'id': '4028860f68e74d6e0168e74d9d3f0017',
    'code': 'UserUpdate',
    'name': 'UserUpdate',
    'createDate': 1550068849983,
    'modificationDate': 1550068849983,
    'status': 'publish',
    'createUser': 'system',
    'lastModifyUser': 'system',
    'permission': 'UserUpdate'
  },
  {
    'id': '4028860f68e74d6e0168e74d9d3f0018',
    'code': 'Role',
    'name': 'Role',
    'createDate': 1550068849983,
    'modificationDate': 1550068849983,
    'status': 'publish',
    'createUser': 'system',
    'lastModifyUser': 'system',
    'permission': 'Role'
  },
  {
    'id': '4028860f68e74d6e0168e74d9d3f0019',
    'code': 'RoleNew',
    'name': 'RoleNew',
    'createDate': 1550068849983,
    'modificationDate': 1550068849983,
    'status': 'publish',
    'createUser': 'system',
    'lastModifyUser': 'system',
    'permission': 'RoleNew'
  },
  {
    'id': '4028860f68e74d6e0168e74d9d40001a',
    'code': 'RoleSearch',
    'name': 'RoleSearch',
    'createDate': 1550068849984,
    'modificationDate': 1550068849984,
    'status': 'publish',
    'createUser': 'system',
    'lastModifyUser': 'system',
    'permission': 'RoleSearch'
  },
  {
    'id': '4028860f68e74d6e0168e74d9d41001b',
    'code': 'RoleUpdate',
    'name': 'RoleUpdate',
    'createDate': 1550068849985,
    'modificationDate': 1550068849985,
    'status': 'publish',
    'createUser': 'system',
    'lastModifyUser': 'system',
    'permission': 'RoleUpdate'
  }
]

export default {
  permissionEnums: () => permissionEnums,
  permissions: () => permissions
}
