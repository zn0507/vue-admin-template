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
      meta: { title: '仪表盘', icon: 'dashboard' }
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
        name: 'Search',
        component: () => import('@/views/article/search/index'),
        meta: { title: '搜索文章', icon: 'tree', roles: ['admin'] }
      },
      {
        path: 'new',
        name: 'New',
        component: () => import('@/views/article/new/index'),
        meta: { title: '新建文章', icon: 'table' }
      },
      {
        path: 'update',
        name: 'Update',
        component: () => import('@/views/article/update/index'),
        meta: { title: '修改文章', icon: 'tree', roles: ['admin'] }
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
        name: 'Search',
        component: () => import('@/views/category/search/index'),
        meta: { title: '搜索类别', icon: 'tree', roles: ['admin'] }
      },
      {
        path: 'new',
        name: 'New',
        component: () => import('@/views/category/new/index'),
        meta: { title: '新建类别', icon: 'table' }
      },
      {
        path: 'update',
        name: 'Update',
        component: () => import('@/views/category/update/index'),
        meta: { title: '修改类别', icon: 'tree', roles: ['admin'] }
      }
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
        name: 'Search',
        component: () => import('@/views/comment/search/index'),
        meta: { title: '搜索评论', icon: 'tree', roles: ['admin'] }
      },
      {
        path: 'update',
        name: 'Update',
        component: () => import('@/views/comment/update/index'),
        meta: { title: '回复评论', icon: 'tree', roles: ['admin'] }
      }
    ]
  },
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/search',
    name: 'Permission',
    meta: { title: '权限', icon: 'example' },
    children: [
      {
        path: 'search',
        name: 'Search',
        component: () => import('@/views/permission/search/index'),
        meta: { title: '搜索权限', icon: 'tree', roles: ['admin'] }
      },
      {
        path: 'new',
        name: 'New',
        component: () => import('@/views/permission/new/index'),
        meta: { title: '新建权限', icon: 'table' }
      },
      {
        path: 'update',
        name: 'Update',
        component: () => import('@/views/permission/update/index'),
        meta: { title: '修改权限', icon: 'tree', roles: ['admin'] }
      }
    ]
  },
  {
    path: '/resume',
    component: Layout,
    redirect: '/resume/search',
    name: 'Resume',
    meta: { title: '简历', icon: 'example' },
    children: [
      {
        path: 'search',
        name: 'Search',
        component: () => import('@/views/resume/search/index'),
        meta: { title: '搜索简历', icon: 'tree', roles: ['admin'] }
      },
      {
        path: 'new',
        name: 'New',
        component: () => import('@/views/resume/new/index'),
        meta: { title: '新建简历', icon: 'table' }
      },
      {
        path: 'update',
        name: 'Update',
        component: () => import('@/views/resume/update/index'),
        meta: { title: '修改简历', icon: 'tree', roles: ['admin'] }
      },
      {
        path: 'publish',
        name: 'Publish',
        component: () => import('@/views/resume/publish/index'),
        meta: { title: '发布简历', icon: 'tree', roles: ['admin'] }
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
        name: 'Link',
        component: () => import('@/views/system/link/index'),
        meta: { title: '系统链接', icon: 'tree', roles: ['admin'] }
      },
      {
        path: 'others',
        name: 'Others',
        component: () => import('@/views/system/others/index'),
        meta: { title: '其他设置', icon: 'tree', roles: ['admin'] }
      }
    ]
  },
  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
