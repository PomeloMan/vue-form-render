<template>
  <div class="vfr-form-field" @click="$emit('click', formItem)">
    <!-- 拖拽标识 -->
    <div class="drag-handler" v-if="configs.editable && id === formItem.id">
      <a-icon type="drag"></a-icon>
    </div>
    <!-- 表单项唯一标识 -->
    <div class="form-item-id" v-if="configs.editable">
      <!-- 获取ID第10位后8位字符串 -->
      {{ formItem.key || formItem.type + '_' + formItem.id.substr(10, 8) }}
    </div>
    <!-- 底部操作栏（删除，复制） -->
    <div class="action-group" v-if="configs.editable && id === formItem.id">
      <a-icon type="delete" @click="handleEvents('delete', formItem)"></a-icon>
      <a-icon type="copy" @click="handleEvents('copy', formItem)"></a-icon>
    </div>
    <!-- 表单项 -->
    <vfr-form-item
      v-model="formData"
      :formItem="formItem"
      :labelCol="() => labelCol(formItem)"
      :wrapperCol="() => wrapperCol(formItem)"
    ></vfr-form-item>
  </div>
</template>

<script>
import Icon from 'ant-design-vue/lib/icon'
import FormItem from './form-item'

export default {
  name: 'vfr-form-field',
  components: {
    AIcon: Icon,
    VfrFormItem: FormItem,
  },
  model: {
    prop: 'form',
    event: 'change',
  },
  props: {
    // 当前选中的表单项ID
    id: {
      type: String,
      default: null,
    },
    // 表单配置信息
    configs: {
      type: Object,
      default: () => ({}),
    },
    // 表单主体
    form: {
      type: Object,
      default: () => ({}),
    },
    // 表单项
    formItem: {
      type: Object,
      default: () => ({}),
    },
    // 标签宽度；获取字段配置，如果字段有配置width则使用字段配置，否则使用表单配置
    labelCol: {
      type: Function,
      default: () => {},
    },
    // 表单组件宽度；获取标签宽度字段，并计算
    wrapperCol: {
      type: Function,
      default: () => {},
    },
  },
  computed: {
    formData: {
      get() {
        return this.form
      },
      set(val) {
        this.$emit('change', val)
      },
    },
  },
  data() {
    return {}
  },
  methods: {
    /**
     * 处理事件
     * @param name 事件名称
     * @param value 事件参数
     */
    handleEvents(name, value) {
      this.$emit('events', name, value)
    },
  },
}
</script>

<style lang="less" scoped>
@import '../../../style.less';
.vfr-form-field {
  position: relative;
  display: inline-flex;
  width: 100%;
  z-index: 1;
  &.editable {
    background-color: @component-background;
    padding: 20px 12px 0;
    border: 1px dashed @border-color-base;
    margin: 0 0 8px;
  }
  // 拖拽
  &.ghost {
    opacity: 0.5;
  }
  // 点击
  &.active {
    z-index: 1;
    outline: @primary-color solid 2px;
    border-color: @component-background;
    background-color: @component-background;
  }
  // 表单拖拽按钮样式
  .drag-handler {
    position: absolute;
    top: -2px;
    left: -2px;
    width: 24px;
    height: 24px;
    padding: 2px 0px 0px 4px;
    color: @white;
    background-color: @primary-color;
    cursor: move;
  }
  // 表单字段ID样式
  .form-item-id {
    position: absolute;
    top: 0;
    right: 1rem;
    font-size: 0.75rem;
  }
  // 底部操作栏样式（删除/复制）
  .action-group {
    position: absolute;
    z-index: 1;
    bottom: -2px;
    right: -2px;
    height: 24px;
    width: 54px;
    border-top-left-radius: 8px;
    color: @white;
    background: @primary-color;
    display: flex;
    justify-content: center;
    align-items: center;
    .anticon {
      width: 24px;
      cursor: pointer;
    }
  }
  .ant-form-item {
    flex-flow: wrap;
    flex: auto;
  }
  /deep/ .ant-form-item-label {
    min-width: 28px;
    label {
      line-height: 1;
      white-space: initial;
      display: inline-flex;
      align-items: center;
    }
  }
}
</style>