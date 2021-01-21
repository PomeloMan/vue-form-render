// 导入组件，组件必须声明 name
import PropertyLayout from './src'
// 为组件提供 install 安装方法，供按需引入
PropertyLayout.install = function(Vue) {
  Vue.component(PropertyLayout.name, PropertyLayout)
}
// 导出组件
export default PropertyLayout
