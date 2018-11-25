// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store.js'
import router from './router'

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import './assets/common.css'

import {httpPost,httpGet,ye,fail,GLOBALconfig,bus,sendTitle} from './assets/common'

Vue.prototype.$post=httpPost;
Vue.prototype.$get=httpGet;
Vue.prototype.$ye=ye; 
Vue.prototype.$fail=fail;
Vue.prototype.$GLOBALconfig=GLOBALconfig;
Vue.prototype.$bus = bus;
Vue.prototype.$sendTitle = sendTitle;

Vue.use(ElementUI);
Vue.use(MintUI)
Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
