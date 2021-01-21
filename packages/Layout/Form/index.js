// 导入组件，组件必须声明 name
import FormRender from './src/form-render'
import FormField from './src/form-field'
import FormToolbar from './src/form-toolbar'
import FormItem from './src/form-item'
// 为组件提供 install 安装方法，供按需引入
FormRender.install = function(Vue) {
  Vue.component(FormRender.name, FormRender)
}
FormField.install = function(Vue) {
  Vue.component(FormField.name, FormField)
}
FormToolbar.install = function(Vue) {
  Vue.component(FormToolbar.name, FormToolbar)
}
FormItem.install = function(Vue) {
  Vue.component(FormItem.name, FormItem)
}
// 导出组件
export default {
  FormRender,
  FormField,
  FormToolbar,
  FormItem
}
