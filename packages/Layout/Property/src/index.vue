<template>
  <!-- 左侧组件库布局 -->
  <div class="vfr-property-layout">
    <slot>
      <a-tabs
        :active-key="activeKey"
        :tab-bar-gutter="0"
        @change="activeKey = $event"
        style="height: 100%"
      >
        <a-tab-pane key="form-config" tab="表单配置">
          <a-form-model :model="formData" layout="vertical">
            <template v-for="formItem in formItems">
              <vfr-form-item
                :key="formItem.key"
                :form="formData"
                :formItem="formItem"
              ></vfr-form-item>
            </template>
          </a-form-model>
        </a-tab-pane>
        <a-tab-pane
          key="field-config"
          tab="字段配置"
          v-if="fieldData !== null && fieldItems !== null"
        >
          <a-form-model v-model="fieldData" layout="vertical">
            <template v-for="fieldItem in fieldItems">
              <vfr-form-item
                :key="fieldItem.key"
                v-model="fieldData"
                :formItem="fieldItem"
                :hidden="fieldItem.hidden"
              ></vfr-form-item>
            </template>
          </a-form-model>
        </a-tab-pane>
      </a-tabs>
    </slot>
  </div>
</template>

<script>
import Tabs from 'ant-design-vue/lib/tabs'
import FormModel from 'ant-design-vue/lib/form-model'
import FormItem from '../../../Layout/Form/src/form-item'
export default {
  name: 'vfr-property-layout',
  components: {
    ATabs: Tabs,
    ATabPane: Tabs.TabPane,
    AFormModel: FormModel,
    VfrFormItem: FormItem,
  },
  model: {
    prop: 'schema',
    event: 'change',
  },
  props: {
    schema: {
      type: Object,
      default: () => ({}),
    },
    configs: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    // 表单配置
    formData() {
      return this.schema.configs
    },
    // 表单配置项
    formItems() {
      return this.configs.formItems
    },
    // 字段配置
    fieldData: {
      get() {
        const { schema } = this
        if (schema.__selected__) {
          const id = schema.__selected__.id
          return schema.properties[id]
        }
        return {}
      },
      set(val) {
        const { schema } = this
        if (['select', 'checkbox-group', 'radio'].includes(val.type)) {
          if (val.values && val.labels) {
            // 设置选项
            const options = []
            val.values.forEach((v, i) => {
              options.push({
                value: v,
                label: val.labels[i],
              })
            })
            val.options = options
          }
        }
        const id = schema.__selected__.id
        schema.properties[id] = val
        this.$emit('change', { ...schema })
      },
    },
    // 字段配置项
    fieldItems() {
      return this.configs.fieldItems
    },
  },
  watch: {
    // 检查字段key字段是否变更，如果变更同步改schema.values数据
    'fieldData.key': {
      handler(key, old) {
        const { __selected__ } = this.schema
        if (old === (__selected__ && __selected__.key)) {
          const { schema } = this
          schema.values[key] = schema.values[old]
          delete schema.values[old]
          schema.__selected__.key = key
          // this.$emit('change', { ...schema })
        }
      },
    },
  },
  data() {
    return {
      activeKey: 'form-config',
    }
  },
  methods: {},
}
</script>

<style lang="less" scoped>
@import '../../../style.less';
.vfr-property-layout {
  width: 300px;
  background-color: @component-background;
  .ant-form {
    padding: 0 8px;
  }
  .ant-tabs {
    height: 100%;
    /deep/ .ant-tabs-content {
      height: inherit;
      .ant-tabs-tabpane {
        height: calc(100% - 60px);
        overflow: auto;
        &::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        /* 定义滑块 内阴影+圆角 */
        &::-webkit-scrollbar-thumb {
          border-radius: 10px;
          box-shadow: inset 0 0 0px @gray-5;
          background-color: @gray-5;
        }
      }
    }
  }
}
</style>