<template>
  <!-- 左侧组件库布局 -->
  <div class="vfr-generator">
    <!-- 组件菜单 -->
    <vfr-component-layout
      class="vfr-component-layout"
      @select="addFormItem"
    ></vfr-component-layout>
    <!-- 表单 -->
    <vfr-form-render
      ref="render"
      class="vfr-form-render"
      v-model="schema"
      @select="selectFormField"
      @cancel="unSelectFormField"
    ></vfr-form-render>
    <!-- 表单属性配置 -->
    <vfr-property-layout
      ref="property"
      class="vfr-property-layout"
      v-model="schema"
      :configs="configs"
    ></vfr-property-layout>
  </div>
</template>

<script>
import ComponentLayout from '../../Layout/Component'
import FormLayout from '../../Layout/Form'
import PropertyLayout from '../../Layout/Property'
import { generateFormItems } from '../../Utils'
export default {
  name: 'vue-form-render',
  components: {
    VfrComponentLayout: ComponentLayout,
    VfrFormRender: FormLayout.FormRender,
    VfrPropertyLayout: PropertyLayout,
  },
  model: {
    prop: 'data',
    event: 'change',
  },
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    schema: {
      get() {
        return this.data
      },
      set(val) {
        this.$emit('change', val)
      },
    },
    configs: {
      get() {
        return {
          formItems: generateFormItems(),
          fieldItems: this.selectedFieldItems,
        }
      },
    },
  },
  data() {
    return {
      // 选中项表单组件属性配置字段
      selectedFieldItems: null,
    }
  },
  methods: {
    // 添加表单组件
    addFormItem(formItem) {
      this.$nextTick(() => {
        const { schema } = this
        schema.properties[formItem.id] = formItem
        schema.values[formItem.key] = undefined
        this.schema = { ...schema }
        const { render } = this.$refs
        if (render) {
          render.id = formItem.id
          this.selectFormField(formItem)
        }
      })
    },
    // 表单布局，选中表单字段
    selectFormField(formItem) {
      setTimeout(() => {
        delete formItem._key
        const { schema } = this
        schema.__selected__ = { ...formItem } // 标记选中项
        this.schema = { ...schema } // 重新赋值刷新子元素schema数据
        // 根据FormType获取对应的FormItems
        this.selectedFieldItems = generateFormItems(formItem.type)
        this.$refs.property.activeKey = 'field-config'
      }, 0)
    },
    // 表单布局，取消选中表单字段
    unSelectFormField() {
      this.selectedFieldItems = null
      this.$refs.property.activeKey = 'form-config'
    },
  },
}
</script>

<style lang="less" scoped>
.vfr-generator {
  height: 100%;
  display: flex;
  .vfr-component-layout {
    padding: 16px 8px;
  }
}
</style>