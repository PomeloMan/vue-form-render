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
          <a-form-model :model="formConfig" layout="vertical">
            <template v-for="formConfigItem in formConfigItems">
              <vfr-form-item
                :key="formConfigItem.key"
                :form="formConfig"
                :formItem="formConfigItem"
              ></vfr-form-item>
            </template>
          </a-form-model>
        </a-tab-pane>
        <a-tab-pane
          key="field-config"
          tab="字段配置"
          v-if="fieldConfig !== null && fieldConfigItems !== null"
        >
          <a-form-model :model="fieldConfig" layout="vertical">
            <template v-for="fieldConfigItem in fieldConfigItems">
              <vfr-form-item
                :key="fieldConfigItem.key"
                :form="fieldConfig"
                :formItem="fieldConfigItem"
                :hidden="fieldConfigItem.hidden"
                @checked="fieldConfig = $event"
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
  props: {
    configs: {
      type: Object,
      default: () => ({
        form: {
          values: null, // 值
          items: [], // 字段
        }, // 表单属性配置
        field: {
          values: null, // 值
          items: [], // 字段
        }, // 字段属性配置
      }),
    },
  },
  computed: {
    formConfig() {
      return this.configs.form.values
    },
    formConfigItems() {
      return this.configs.form.items
    },
    fieldConfig() {
      return this.configs.field.values
    },
    fieldConfigItems() {
      return this.configs.field.items
    },
  },
  data() {
    return {
      activeKey: 'form-config',
    }
  },
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