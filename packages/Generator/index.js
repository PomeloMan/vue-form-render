// 导入组件，组件必须声明 name
import FormRenderGenerator from './src'
// 为组件提供 install 安装方法，供按需引入
FormRenderGenerator.install = function (Vue) {
  Vue.component(FormRenderGenerator.name, FormRenderGenerator)
}
// 导出组件
export default FormRenderGenerator