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
      class="vfr-form-render"
      ref="render"
      v-model="schema"
      @select="handleSelect"
      @cancel="handleCancel"
    ></vfr-form-render>
    <!-- 表单属性配置 -->
    <vfr-property-layout
      class="vfr-property-layout"
      v-model="config"
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
      default: () => ({
        values: {
          key1: '1',
          key2: '2',
        },
        items: [
          {
            id: 'MTYxMTA0MDY2MTQ2OA==',
            key: 'key1',
            name: '测试',
            type: 'input',
          },
          {
            id: 'MTYxMTA0MDY3NjE4NA==',
            key: 'key2',
            name: '测试2',
            type: 'input',
          },
        ],
        configs: {
          grid: 1,
          labelWidth: 10,
          layout: 'vertical',
          editable: false,
        },
      }),
    },
  },
  computed: {
    // 表单配置项（包含表单配置及字段配置值与表单项）
    config: {
      get() {
        return {
          form: { values: this.schema.configs, items: generateFormItems() },
          field: this.field,
        }
      },
      set(val) {
        // 双向绑定数据回传
        this.field = val.field
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
    handleSelect(id, formItem) {
      this.field.values = formItem
      // 根据FormType获取对应的FormItems
      this.field.items = generateFormItems('input')
    },
    // 表单布局，取消选中表单字段
    handleCancel() {
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