<template>
  <!-- 左侧组件库布局 -->
  <div class="vfr-generator">
    <!-- 组件菜单 -->
    <vfr-component-layout
      class="vfr-component-layout"
      @addFormItem="addFormItem"
    ></vfr-component-layout>
    <!-- 表单 -->
    <vfr-form-render
      ref="render"
      class="vfr-form-render"
      :schema="configs.schema"
      @select="handleSelect"
      @cancel="handleCancel"
    ></vfr-form-render>
    <!-- 表单属性配置 -->
    <vfr-property-layout
      ref="property"
      class="vfr-property-layout"
      :configs="configs.property"
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
  props: {
    schema: {
      type: Object,
      default: () => ({}),
    },
  },
  watch: {
    'configs.property.field.values': {
      handler(val, old) {
        if (val && !old) {
          // 从无到有，自动切到字段配置Tab
          this.$refs.property.activeKey = 'field-config'
        } else if (!val && old) {
          // 从有到无，自动切换到表单配置Tab
          this.$refs.property.activeKey = 'form-config'
        }
        // 检查字段key字段是否变更，如果变更同步改schema数据
        if (val && val.origin && val.key !== val.origin.key) {
          const values = { ...this.schema.values }
          values[val.key] = values[val.origin.key]
          delete values[val.origin.key]
          this.schema.values = values
          val.origin.key = val.key // 更新旧对象属性
        }
      },
      immediate: true,
      deep: true,
    },
  },
  computed: {
    configs: {
      get() {
        return {
          schema: this.schema,
          property: {
            // 属性面板
            form: { values: this.schema.configs, items: generateFormItems() }, // 表单配置
            field: { values: this.field.values, items: this.field.items }, // 字段配置
          },
        }
      },
      set(val) {
        console.log(val)
      },
    },
  },
  data() {
    return {
      // 表单组件属性配置字段
      field: {
        values: null,
        items: null,
      },
    }
  },
  methods: {
    // 添加表单组件
    addFormItem(formItem) {
      this.$nextTick(() => {
        if (this.$refs.render) {
          this.$refs.render.selectedItemId = formItem.id
        }
        const { items } = this.schema
        items.push(formItem)
      })
    },
    // 表单布局，选中表单字段
    handleSelect(formItem) {
      // this.handleCancel()
      setTimeout(() => {
        this.field.values = formItem
        this.field.values.origin = { ...formItem } // 由于watch监听对象获取不到旧对象属性，这里添加origin属性存储旧对象
        // 根据FormType获取对应的FormItems
        this.field.items = generateFormItems(formItem.type)
      }, 0)
    },
    // 表单布局，取消选中表单字段
    handleCancel() {
      if (this.field.values && this.field.values.origin)
        delete this.field.values.origin
      this.field.values = null
      this.field.items = null
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