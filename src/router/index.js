import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import('views/auth/Login')
const Home = () => import('views/home/Home')
const Detail = () => import ('views/detail/Detail')
const Admin = () => import ('views/admin/Admin')
const About = () => import ('views/admin/About')
const Summary = () => import ('views/admin/Summary')
const NewPost = () => import ('views/admin/NewPost')
const EditPost = () => import ('views/admin/EditPost')
const EditAbout = () => import ('views/admin/EditAbout')

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta:{
      needLogin:false,
      title:"首页"
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta:{
      needLogin:false,
      title:'登陆'
    }
  },
  {
    path: '/post/:id',
    component: Detail,
    meta:{
      needLogin:false,
      title:'文章详情'
    },
    
  },
  {
    path:'/admin/:type',
    name: 'Admin',
    component: Admin,
    meta:{
      needLogin:true,
      title:'管理'
    },
  },
  {
    path:'/summary',
    name: 'Summary',
    component: Summary,
    meta:{
      needLogin:false,
      title:'归档'
    }
  },
  {
    path:'/about',
    name: 'About',
    component: About,
    meta:{
      needLogin:false,
      title:"关于"
    }
  },
  {
    path:'/newPost',
    component: NewPost,
    meta:{
      needLogin:true,
      title:'新建文章'
    }
  },
  {
    path:'/editPost/:id',
    component: EditPost,
    meta:{
      needLogin:true,
      title:'编辑文章'
    }
  },{
    path:'/editAbout',
    component: EditAbout,
    meta:{
      needLogin:true,
      title:'编辑关于'
    }
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
