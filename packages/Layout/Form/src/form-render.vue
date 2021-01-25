<template>
  <!-- 左侧组件库布局 -->
  <div class="vfr-form-render">
    <div class="vfr-wrapper">
      <slot>
        <vfr-form-toolbar :menus="menus"></vfr-form-toolbar>
        <div class="vfr-container" @click="cancelSelect">
          <a-form-model
            ref="form"
            :model="formData"
            :labelCol="labelCol()"
            :wrapperCol="wrapperCol()"
          >
            <draggable
              :disabled="!editable"
              v-model="formItems"
              @start="drag = true"
              @end="drag = false"
              v-bind="dragAttributes"
              handle=".drag-handler"
              style="width: 100%"
            >
              <transition-group style="display: block">
                <template v-for="(formItem, index) in formItems">
                  <div :key="formItem.id" @click="select(formItem)">
                    <vfr-form-field
                      :labelCol="() => labelCol(formItem)"
                      :wrapperCol="() => wrapperCol(formItem)"
                      v-model="formData"
                      v-bind="{
                        id,
                        index,
                        configs,
                        formItem,
                        hidden: formItem.hidden,
                      }"
                      :class="{
                        active: id === formItem.id,
                        editable: editable,
                      }"
                      :style="{ width: elementWidth(formItem) }"
                    ></vfr-form-field>
                  </div>
                </template>
              </transition-group>
            </draggable>
          </a-form-model>
        </div>
      </slot>
    </div>

    <a-modal v-model="previewModalVisible" :footer="null">
      <a-textarea
        :auto-size="{ minRows: 16, maxRows: 16 }"
        v-model="schemaJson"
      ></a-textarea>
      <!-- <pre>{{ JSON.stringify(this.schema, null, 2) }}</pre> -->
    </a-modal>
  </div>
</template>

<script>
import FormModel from 'ant-design-vue/lib/form-model'
import Input from 'ant-design-vue/lib/input'

import FormField from './form-field'
import FormToolbar from './form-toolbar'

import Draggable from 'vuedraggable'
import { generateToolbarMenus } from '../../../Utils'

export const layoutConfig = {
  horizontal: {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  },
  vertical: {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
  },
}

export default {
  name: 'vfr-form-render',
  components: {
    AFormModel: FormModel,
    ATextarea: Input.TextArea,
    VfrFormField: FormField,
    VfrFormToolbar: FormToolbar,
    Draggable,
  },
  model: {
    prop: 'schema',
    event: 'change',
  },
  props: {
    // 表单
    schema: {
      type: Object,
      default: () => ({ values: {}, items: [], configs: {} }),
    },
  },
  watch: {
    schema: {
      handler(val) {
        console.log(val)
        this.$emit('change', val)
      },
      immediate: true,
      deep: true,
    },
  },
  computed: {
    // JSON格式化
    schemaJson() {
      return JSON.stringify(this.schema, null, 2)
    },
    // 表单配置信息
    configs() {
      return this.schema.configs
    },
    // 是否可编辑；true:编辑装填，false:预览装填
    editable: {
      get() {
        return this.configs.editable
      },
      set(val) {
        this.configs.editable = val
      },
    },
    // 表单内容
    formData: {
      get() {
        return this.schema.values
      },
      set(val) {
        this.schema.values = val
      },
    },
    // 表单项集合
    formItems: {
      get() {
        return this.schema.items
      },
      set(val) {
        this.schema.items = val
      },
    },
    // 拖拽组件属性
    dragAttributes() {
      return {
        animation: 200, // 动画时间ms
        group: 'formItems', // 分组
        disabled: false,
        ghostClass: 'ghost', // 拖拽时元素添加的class名称
      }
    },
    // 元素宽度；获取字段配置，如果字段有配置width则使用字段配置，否则使用表单配置
    elementWidth() {
      return function (formItem) {
        if (formItem.width) {
          return formItem.width + '%'
        }
        return 100 / this.configs.grid + '%'
      }
    },
    // 标签宽度；获取字段配置，如果字段有配置width则使用字段配置，否则使用表单配置
    labelCol() {
      return function (formItem) {
        if (formItem && formItem.labelWidth) {
          return { span: Math.round((24 * formItem.labelWidth) / 100) }
        }
        if (
          this.configs.labelWidth !== null &&
          this.configs.layout === 'horizontal'
        ) {
          return { span: Math.round((24 * this.configs.labelWidth) / 100) }
        }
        return layoutConfig[this.configs.layout].labelCol
      }
    },
    // 表单组件宽度；获取标签宽度字段，并计算
    wrapperCol() {
      return function (formItem) {
        if (formItem && formItem.labelWidth) {
          return { span: 24 - Math.round((24 * formItem.labelWidth) / 100) }
        }
        if (
          this.configs.labelWidth !== null &&
          this.configs.layout === 'horizontal'
        ) {
          return {
            span: 24 - Math.round((24 * this.configs.labelWidth) / 100),
          }
        }
        return layoutConfig[this.configs.layout].wrapperCol
      }
    },
  },
  data() {
    return {
      menus: [],
      drag: false, // 拖拽操作
      id: null, // 选中表单项
      previewModalVisible: false,
    }
  },
  created() {
    this.menus = generateToolbarMenus.bind(this)()
  },
  methods: {
    // 取消选中表单项
    cancelSelect() {
      this.id = null
      this.$emit('cancel')
    },
    // 选中表单项
    select(formItem) {
      // 阻止执行取消事件
      event.preventDefault()
      event.stopPropagation()
      if (this.editable) {
        if (this.id !== formItem.id) {
          this.id = formItem.id
          this.$emit('select', formItem)
        }
      }
    },
  },
}
</script>

<style lang="less" scoped>
@import '../../../style.less';
.vfr-form-render {
  flex: 1;
  padding: 8px;
  border-left: 1px solid @border-color-base;
  border-right: 1px solid @border-color-base;
  .vfr-wrapper {
    display: flex;
    flex-direction: column;
    border: 1px solid @border-color-base;
    height: 100%;
  }
  .vfr-container {
    flex: 1;
    overflow-y: auto;
    background-color: @layout-body-background;
    .ant-form {
      display: flex;
      flex-flow: wrap;
      padding: 12px;
    }
  }
}
</style>