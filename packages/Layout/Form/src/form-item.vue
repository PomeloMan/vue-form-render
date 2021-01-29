<template>
  <a-form-model-item
    class="vfr-form-item"
    has-feedback
    :prop="formItem.key"
    :extra="formItem.descDisplay === 'text' ? formItem.desc : undefined"
    :labelCol="labelCol(formItem)"
    :wrapperCol="wrapperCol(formItem)"
    :rules="getFormItemRules"
  >
    <span
      slot="label"
      v-if="!['checkbox', 'checkbox-group'].includes(formItem.type)"
    >
      {{ formItem.name }}
      <a-tooltip
        v-if="formItem.descDisplay === 'icon' && formItem.desc"
        :title="formItem.desc"
      >
        <a-icon type="info-circle" />
      </a-tooltip>
    </span>
    <!-- input -->
    <template v-if="formItem.type === 'input'">
      <a-input
        v-model="form[formItem.key]"
        :placeholder="formItem.name"
        :disabled="disabled"
      />
    </template>
    <!-- textarea -->
    <template v-if="formItem.type === 'textarea'">
      <a-textarea
        v-model="form[formItem.key]"
        :disabled="disabled"
        :auto-size="{ minRows: 4, maxRows: 4 }"
      ></a-textarea>
    </template>
    <!-- input-number -->
    <template v-if="formItem.type === 'input-number'">
      <a-input-number
        v-model="form[formItem.key]"
        :min="formItem.min"
        :max="formItem.max"
        :disabled="disabled"
        style="width: 100%"
      />
    </template>
    <!-- radio -->
    <template v-if="formItem.type === 'radio'">
      <a-radio-group v-model="form[formItem.key]" :disabled="disabled">
        <a-radio
          :key="option.value"
          :value="option.value"
          v-for="option in formItem.options"
        >
          {{ option.label }}
        </a-radio>
      </a-radio-group>
    </template>
    <!-- input -->
    <template v-if="formItem.type === 'slider'">
      <a-row :gutter="8">
        <a-col :span="16">
          <a-slider
            v-model="form[formItem.key]"
            :min="formItem.min"
            :max="formItem.max"
            :tip-formatter="formItem.tipFormatter"
            :disabled="disabled"
          />
        </a-col>
        <a-col :span="8">
          <a-input-number
            v-model="form[formItem.key]"
            :min="formItem.min"
            :max="formItem.max"
            :formatter="(value) => `${value}%`"
            :parser="
              (value) => {
                const r = value.replace('%', '')
                return r === '' ? 0 : r
              }
            "
            :disabled="disabled"
            style="width: 100%"
          />
        </a-col>
      </a-row>
    </template>
    <!-- select -->
    <template v-if="formItem.type === 'select'">
      <a-select
        v-model="form[formItem.key]"
        :mode="formItem.mode"
        :allow-clear="formItem.allowClear"
        :placeholder="formItem.name"
        :disabled="disabled"
      >
        <a-select-option
          :key="option.value"
          :value="option.value"
          v-for="option in formItem.options"
        >
          {{ option.label }}
        </a-select-option>
      </a-select>
    </template>
    <!-- checkbox -->
    <template v-if="formItem.type === 'checkbox'">
      <a-checkbox
        :checked="form[formItem.key]"
        :disabled="disabled"
        @click.native="handleChecked(formItem)"
      >
        <!-- @change="handleChecked(formItem, $event.target.checked)" -->
        {{ formItem.name }}
      </a-checkbox>
    </template>
    <template v-if="formItem.type === 'checkbox-group'">
      <a-checkbox-group
        v-model="form[formItem.key]"
        :options="formItem.options"
        :disabled="disabled"
      ></a-checkbox-group>
    </template>
    <!-- date-picker -->
    <template v-if="formItem.type === 'date-picker'">
      <a-date-picker
        v-model="form[formItem.key]"
        style="width: 100%"
      ></a-date-picker>
    </template>
    <!-- time-picker -->
    <template v-if="formItem.type === 'time-picker'">
      <a-time-picker
        v-model="form[formItem.key]"
        style="width: 100%"
      ></a-time-picker>
    </template>
    <!-- tree-select -->
    <!-- <template v-if="item.type === 'tree-select'">
      <a-tree-select
        v-model="form[item.key]"
        allow-clear
        tree-checkable
        :tree-data="item.options"
        :show-checked-strategy="'SHOW_PARENT'"
        :tree-data-simple-mode="true"
        :placeholder="$t('message.please_select', { content: item.label })"
      >
      </a-tree-select>
    </template> -->
    <!-- upload -->
    <!-- <template v-if="item.type === 'upload'">
      <app-upload
        v-model="form[item.key]"
        :multiple="item.multiple"
        :width="item.width"
        :height="item.height"
        @change="validateField(item.key)"
      ></app-upload>
    </template> -->
  </a-form-model-item>
</template>

<script>
import FormModel from 'ant-design-vue/lib/form-model'
import Icon from 'ant-design-vue/lib/icon'
import Tooltip from 'ant-design-vue/lib/tooltip'
import Input from 'ant-design-vue/lib/input'
import InputNumber from 'ant-design-vue/lib/input-number'
import Radio from 'ant-design-vue/lib/radio'
import Slider from 'ant-design-vue/lib/slider'
import Select from 'ant-design-vue/lib/select'
import Checkbox from 'ant-design-vue/lib/checkbox'
import DatePicker from 'ant-design-vue/lib/date-picker'
import TimePicker from 'ant-design-vue/lib/time-picker'
import Row from 'ant-design-vue/lib/row'
import Col from 'ant-design-vue/lib/col'
export default {
  name: 'vfr-form-item',
  components: {
    AFormModelItem: FormModel.Item,
    AIcon: Icon,
    ATooltip: Tooltip,
    AInput: Input,
    ATextarea: Input.TextArea,
    AInputNumber: InputNumber,
    ARadio: Radio,
    ARadioGroup: Radio.Group,
    ASlider: Slider,
    ASelect: Select,
    ASelectOption: Select.Option,
    ACheckbox: Checkbox,
    ACheckboxGroup: Checkbox.Group,
    ADatePicker: DatePicker,
    ATimePicker: TimePicker,
    ARow: Row,
    ACol: Col,
  },
  props: {
    form: {
      type: Object,
      default: () => {},
    },
    formItem: {
      type: Object,
      default: () => {},
    },
    labelCol: {
      type: Function,
      default: () => {},
    },
    wrapperCol: {
      type: Function,
      default: () => {},
    },
  },
  computed: {
    disabled() {
      const { formItem } = this
      return (
        formItem.disabled === true ||
        (formItem.disabled && formItem.disabled[0])
      )
    },
    getFormItemRules() {
      const { formItem } = this
      const rules = []
      if (formItem.required) {
        rules.push({
          required: formItem.required,
          message: '必填项',
          trigger: ['input', 'textarea'].includes(formItem.type)
            ? 'blur'
            : 'change',
        })
      }
      if (formItem.pattern) {
        let pattern = formItem.pattern
        if (pattern.startsWith('/')) {
          pattern = pattern.slice(1)
        }
        if (pattern.endsWith('/')) {
          pattern = pattern.slice(0, pattern.length - 1)
        }
        rules.push({
          pattern: new RegExp(pattern),
          message: '格式错误',
          trigger: ['input', 'textarea'].includes(formItem.type)
            ? 'blur'
            : 'change',
        })
      }
      return rules
    },
  },
  methods: {
    handleChecked(formItem) {
      event.preventDefault()
      event.stopPropagation()
      this.$emit('checked', !this.form[formItem.key])
    },
  },
}
</script>