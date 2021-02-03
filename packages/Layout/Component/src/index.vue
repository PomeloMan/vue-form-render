<template>
  <!-- 左侧组件库布局 -->
  <div class="vfr-component-layout">
    <slot name="basic">
      <div>
        <p>{{ translate('component.base') }}</p>
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
import { TanslateHandler } from '../../../Locale/index'
import Divider from 'ant-design-vue/lib/divider'
import { generateTimeBase64 } from '../../../Utils'

export default {
  name: 'vfr-component-layout',
  mixins: [TanslateHandler],
  components: {
    ADivider: Divider,
  },
  props: {
    locale: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    defaultOptions() {
      return [
        {
          value: 'option1',
          label: this.translate('component.option', { num: 1 }),
        },
        {
          value: 'option2',
          label: this.translate('component.option', { num: 2 }),
        },
      ]
    },
    basicComponents() {
      const { defaultOptions } = this
      return [
        { name: this.translate('component.input'), type: 'input' },
        { name: this.translate('component.textarea'), type: 'textarea' },
        {
          name: this.translate('component.input-number'),
          type: 'input-number',
        },
        { name: this.translate('component.date-picker'), type: 'date-picker' },
        { name: this.translate('component.time-picker'), type: 'time-picker' },
        { name: this.translate('component.checkbox'), type: 'checkbox' },
        { name: this.translate('component.switch'), type: 'switch' },
        {
          name: this.translate('component.select'),
          type: 'select',
          options: defaultOptions,
          values: defaultOptions.map((o) => o.value),
          labels: defaultOptions.map((o) => o.label),
        },
        {
          name: this.translate('component.radio'),
          type: 'radio',
          options: defaultOptions,
          values: defaultOptions.map((o) => o.value),
          labels: defaultOptions.map((o) => o.label),
        },
        {
          name: this.translate('component.checkbox-group'),
          type: 'checkbox-group',
          options: defaultOptions,
          values: defaultOptions.map((o) => o.value),
          labels: defaultOptions.map((o) => o.label),
        },
      ]
    },
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