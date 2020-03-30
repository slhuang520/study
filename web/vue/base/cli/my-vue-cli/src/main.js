import Vue from 'vue';
import App from './App.vue';
// import router from './router'; // router目前可以不使用
// import appServer from './server.vue'; // 引入server组件
import '../static/bootstrap/bootstrap.css'; // 引入外部css
// import $ from 'jquery'; // 引入外部js,这里已经可以不用手动引入了
// import '../static/bootstrap/bootstrap.js'; // 这样不行
import 'bootstrap'; // 引入外部js
import header from './components/common/header.vue';
import footer from './components/common/footer.vue';

Vue.config.productionTip = false;
// Vue.component('app-server', appServer); // 注册一个全局组件
Vue.component('app-header', header);
Vue.component('app-footer', footer);
$(function () {
  // alert(333);
});
new Vue({
  // router,
  render: h => h(App)
}).$mount('#app');
