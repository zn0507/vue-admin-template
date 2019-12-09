import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    permission: true or false     custom field
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      name: 'Dashboard',
      meta: { title: '仪表盘', icon: 'dashboard', permission: true }
    }]
  }
]

export const asyncRouterMap = [
  {
    path: '/article',
    component: Layout,
    redirect: '/article/search',
    name: 'Article',
    meta: { title: '文章', icon: 'example' },
    children: [
      {
        path: 'search',
        name: 'ArticleSearch',
        component: () => import('@/views/article/search/index'),
        meta: { title: '文章', icon: 'tree', permission: true }
      },
      {
        path: 'new',
        name: 'ArticleNew',
        component: () => import('@/views/article/new/index'),
        meta: { title: '新建文章', icon: 'table', roles: ['admin'], permission: true },
        hidden: true
      },
      {
        path: 'update/:id',
        name: 'ArticleUpdate',
        component: () => import('@/views/article/update/index'),
        meta: { title: '修改文章', icon: 'tree', roles: ['admin'], permission: true },
        hidden: true
      }
    ]
  },
  {
    path: '/category',
    component: Layout,
    redirect: '/category/search',
    name: 'Category',
    meta: { title: '类别', icon: 'example' },
    children: [
      {
        path: 'search',
        name: 'CategorySearch',
        component: () => import('@/views/category/search/index'),
        meta: { title: '类别', icon: 'tree', roles: ['admin'], permission: true }
      }
      // {
      //   path: 'new',
      //   name: 'CategoryNew',
      //   component: () => import('@/views/category/new/index'),
      //   meta: { title: '新建类别', icon: 'table' }
      // },
      // {
      //   path: 'update',
      //   name: 'CategoryUpdate',
      //   component: () => import('@/views/category/update/index'),
      //   meta: { title: '修改类别', icon: 'tree', roles: ['admin'] }
      // }
    ]
  },
  {
    path: '/comment',
    component: Layout,
    redirect: '/comment/search',
    name: 'Comment',
    meta: { title: '评论', icon: 'example' },
    children: [
      {
        path: 'search',
        name: 'CommentSearch',
        component: () => import('@/views/comment/search/index'),
        meta: { title: '搜索评论', icon: 'tree', permission: true }
      },
      {
        path: 'update',
        name: 'CommentUpdate',
        component: () => import('@/views/comment/update/index'),
        meta: { title: '回复评论', icon: 'tree', roles: ['admin'], permission: true }
      }
    ]
  },
  // {
  //   path: '/authorization',
  //   component: Layout,
  //   redirect: '/authorization/user',
  //   name: 'Authorization',
  //   meta: { title: '授权', icon: 'example', roles: ['admin'], permission: true },
  //   children: [
  //     {
  //       path: 'user',
  //       name: 'User',
  //       component: () => import('@/views/authorization/user/index'),
  //       meta: { title: '用户管理', icon: 'tree', roles: ['admin'], permission: true }
  //     },
  //     {
  //       path: 'role',
  //       name: 'Role',
  //       component: () => import('@/views/authorization/role/index'),
  //       meta: { title: '角色管理', icon: 'table', roles: ['admin'], permission: true }
  //     },
  //     {
  //       path: 'permission',
  //       name: 'Permission',
  //       component: () => import('@/views/authorization/permission/index'),
  //       meta: { title: '权限管理', icon: 'tree', roles: ['admin'], permission: true }
  //     }
  //   ]
  // },
  {
    path: '/resume',
    component: Layout,
    redirect: '/resume/search',
    name: 'Resume',
    meta: { title: '简历', icon: 'example' },
    children: [
      {
        path: 'search',
        name: 'ResumeSearch',
        component: () => import('@/views/resume/search/index'),
        meta: { title: '搜索简历', icon: 'tree', permission: true }
      },
      {
        path: 'new',
        name: 'ResumeNew',
        component: () => import('@/views/resume/new/index'),
        meta: { title: '新建简历', icon: 'table', permission: true }
      },
      {
        path: 'update',
        name: 'ResumeUpdate',
        component: () => import('@/views/resume/update/index'),
        meta: { title: '修改简历', icon: 'tree', permission: true }
      },
      {
        path: 'publish',
        name: 'ResumePublish',
        component: () => import('@/views/resume/publish/index'),
        meta: { title: '发布简历', icon: 'tree', roles: ['admin'], permission: true }
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    redirect: '/system/link',
    name: 'System',
    meta: { title: '系统设置', icon: 'example' },
    children: [
      {
        path: 'link',
        name: 'SystemLink',
        component: () => import('@/views/system/link/index'),
        meta: { title: '系统链接', icon: 'tree', roles: ['admin'], permission: true }
      },
      {
        path: 'others',
        name: 'SystemOthers',
        component: () => import('@/views/system/others/index'),
        meta: { title: '其他设置', icon: 'tree', roles: ['admin'], permission: true }
      }
    ]
  },
  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  base: '/admin/',
  routes: constantRouterMap
})
