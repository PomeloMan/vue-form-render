// 导入组件，组件必须声明 name
import ComponentLayout from './src'
// 为组件提供 install 安装方法，供按需引入
ComponentLayout.install = function(Vue) {
  Vue.component(ComponentLayout.name, ComponentLayout)
}
// 导出组件
export default ComponentLayout
