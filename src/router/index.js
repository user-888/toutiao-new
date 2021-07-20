import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/index.vue'
import Home from '@/views/home/'
import Layout from '@/views/layout/'
import Article from '@/views/article/'
import Publish from '@/views/publish/'
import Image from '@/views/image/'
import Comment from '@/views/comment/'
import Settings from '@/views/settings/'

Vue.use(VueRouter)

// 路由配置表
const routes = [
 {
   path: '/login',
   name: 'login',
   component: Login
 },
 {
   path: '/',
  //  命名路由layout有一个默认的子路由，这个名字没有意义，正确的做法是：如果有默认的子路由，就不要给父路由起名字了
  //  name: 'layout',
   component: Layout,
   children: [
      {
        path: '',  // path 为空会作为默认子路由渲染
        name: 'home',
        component: Home
      },
      {
        path: '/article',  
        name: 'article',
        component: Article
      },
      {
        path: '/publish',  
        name: 'publish',
        component: Publish
      },
      {
        path: '/image',  
        name: 'image',
        component: Image
      },
      {
        path: '/comment',  
        name: 'comment',
        component: Comment
      },
      {
        path: '/settings',  
        name: 'settings',
        component: Settings
      },
   ]
 }

]

const router = new VueRouter({
  routes
})

// 路由导航守卫：说白了所有页面的导航都会经过这里
// 守卫页面的导航的
// to：要去的路由信息
// from：来自哪里的路由信息
// next：放行方法
router.beforeEach((to, from, next) => {
   // 如果要访问的页面不是 /login，校验登录状态
  // 如果没有登录，则跳转到登录页面
  // 如果登录了，则允许通过
  // 允许通过
  // next()
  const user = JSON.parse(window.localStorage.getItem('user'))
  // console.log(to);
  if (to.path !== '/login') {
     if (user) {
      //  已登录，允许通过
       next ()
     } else {
      //  没有登录，跳转到登录页面
       next ('/login')
     }
  } else {
    // 登录页面，正常允许通过
    next()
  }
})
export default router
