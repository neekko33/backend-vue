import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Nprogress from 'nprogress'
import '../../node_modules/nprogress/nprogress.css'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/',
    redirect: '/dashboard',
    component: Home,
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        meta: { title: '后台管理' },
        component: () => import(/* webpackChunkName:"dashboard" */ '../pages/Index.vue'),
      },
      {
        path: 'type',
        name: 'type',
        meta: { title: '类型管理' },
        component: () => import(/* webpackChunkName:"type" */ '../pages/Type.vue'),
      },
      // {
      // 	path: 'message',
      // 	name: 'message',
      // 	meta: { title: '留言管理' },
      // 	component: () =>
      // 		import(/* webpackChunkName:"message" */ '../pages/Message.vue'),
      // },
      {
        path: 'article',
        name: 'article',
        meta: { title: '文章管理' },
        redirect: '/article/list',
        component: () => import(/* webpackChunkName:"article" */ '../pages/Article.vue'),
        children: [
          {
            path: 'list',
            name: 'list',
            meta: { title: '文章列表' },
            component: () => import(/* webpackChunkName:"article" */ '../pages/ArticleList.vue'),
          },
          {
            path: 'add',
            name: 'add',
            meta: { title: '新增文章' },
            component: () => import(/* webpackChunkName:"article" */ '../pages/EditArticle.vue'),
          },
          {
            path: 'update/:id',
            name: 'update',
            meta: { title: '编辑文章' },
            component: () => import(/* webpackChunkName:"article" */ '../pages/EditArticle.vue'),
          },
        ],
      },
      {
        path: 'user',
        name: 'user',
        meta: { title: '用户管理' },
        redirect: '/user/list',
        component: () => import(/* webpackChunkName:"user" */ '../pages/User.vue'),
        children:[
          {
            path: 'list',
            name: 'list',
            meta: {title: '新增用户'},
            component: ()=> import(/* webpackChunkName:"user" */ '../components/UserList.vue')
          },
          {
            path: 'create',
            name: 'create',
            meta: {title: '新增用户'},
            component: ()=> import(/* webpackChunkName:"user" */ '../components/Info.vue')
          }
        ]
      },
      {
        path: 'setting',
        name: 'setting',
        meta: { title: '个人设置' },
        redirect: '/setting/info',
        component: () => import(/* webpackChunkName:"setting" */ '../pages/Setting.vue'),
        children: [
          {
            path: 'info',
            name: 'info',
            meta: { title: '个人信息' },
            component: () => import(/* webpackChunkName:"setting" */ '../components/Info.vue'),
          },
          {
            path: 'password',
            name: 'password',
            meta: { title: '修改密码' },
            component: () => import(/* webpackChunkName:"setting" */ '../components/Password.vue'),
          },
        ],
      },
    ],
  },
]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  Nprogress.start()
  next()
})

router.afterEach((to, from) => {
  Nprogress.done()
})

export default router
