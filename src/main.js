import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from "element-ui"
import 'element-ui/lib/theme-chalk/index.css';

// import Vant from 'vant';
// import 'vant/lib/index.css';
import { Calendar,Cell } from 'vant';
import 'vant/lib/calendar/style';
import 'vant/lib/cell/style';


import mavonEditor from "mavon-editor"
import 'mavon-editor/dist/css/index.css'
// import 'mavon-editor/dist/highlightjs/styles/xcode.min.css'
import 'mavon-editor/dist/highlightjs/styles/github.min.css'
// import 'mavon-editor/dist/highlightjs/styles/github-gist.min.css'
// import 'mavon-editor/dist/highlightjs/styles/googlecode.min.css'
import 'mavon-editor/dist/markdown/github-markdown.min.css'
// import 'mavon-editor/src/lib/css/markdown.css'

Vue.use(mavonEditor)
Vue.use(Calendar);
Vue.use(Cell);

// mavonEditor.markdownIt

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

Vue.use(ElementUI)
// Vue.use(Vant)

router.beforeEach(function(to, from, next) {
    // 浏览器是否已保存登陆状态
  if (sessionStorage.getItem("token") === 'isLogin') {
      //本地存储中是否有token(uid)数据
      store.state.islogin = true
      document.title = to.meta.title
      next(); //表示已经登录
    } else if (to.meta.needLogin) {
      //未保存但需要登陆，使用next跳转到login页面
      document.title = to.meta.title
      next('/login')
    } else {
    //表示不需要登录
      document.title = to.meta.title
      next(); //继续往后走
    }
});



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
