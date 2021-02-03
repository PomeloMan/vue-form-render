import Vue from 'vue'
import App from './App.vue'

import 'ant-design-vue/dist/antd.css'
import Antd from 'ant-design-vue'
Vue.use(Antd)
// 导入组件库
import vueFormRender from '../packages'
// 注册组件库
Vue.use(vueFormRender.Generator)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
