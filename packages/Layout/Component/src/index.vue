<template>
  <!-- 左侧组件库布局 -->
  <div class="vfr-component-layout">
    <slot name="basic">
      <div>
        <p>基础组件</p>
        <ul>
          <template v-for="comp in basicComponents">
            <div :key="comp.id" draggable="true">
              <li class="list-item" @click="select(comp)">
                {{ comp.name }}
              </li>
            </div>
          </template>
        </ul>
      </div>
    </slot>
    <a-divider></a-divider>
    <slot name="advanced"></slot>
  </div>
</template>

<script>
import Divider from 'ant-design-vue/lib/divider'
import { generateTimeBase64 } from '../../../Utils'

const basicComponents = [
  { name: '输入框', type: 'input' },
  { name: '大输入框', type: 'textarea' },
  { name: '数字输入框', type: 'input-number' },
  { name: '日期选择', type: 'date-picker' },
  { name: '时间选择', type: 'time-picker' },
  { name: '是否选择', type: 'checkbox' },
]

export default {
  name: 'vfr-component-layout',
  components: {
    ADivider: Divider,
  },
  data() {
    return {
      basicComponents,
    }
  },
  methods: {
    select(formItem) {
      formItem.id = generateTimeBase64()
      formItem.key = `${formItem.type}_${formItem.id.substr(10, 8)}`
      this.$emit('select', { ...formItem })
    },
  },
}
</script>

<style lang="less" scoped>
@import '../../../style.less';
ul {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  padding-left: 0;
  width: 256px;
}
.list-item {
  width: 120px;
  height: 36px;
  margin: 4px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: @background-color-base;
  &:hover {
    color: @primary-color;
    border: 1px dashed @primary-color;
  }
}
</style>