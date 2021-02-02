/**
 * 获取当前时间的Base64编码
 * @param {*} time 当前时间戳
 */
export function generateTimeBase64() {
  return btoa(new Date().getTime())
}

/**
 * 生成默认工具栏菜单
 * 注：方法内的作用域this为form-render组件对象
 */
export function generateToolbarMenus() {
  const $this = this
  return [
    [
      { key: 'save', icon: 'save' },
      {
        key: 'reset',
        icon: 'rest',
        handler: function() {
          $this.schema.values = {}
          $this.schema.items = []
        }
      },
      {
        key: 'download',
        icon: 'download',
        handler: function() {
          $this.previewModalVisible = true
        }
      }
    ],
    [
      {
        key: 'preview',
        icon: 'eye',
        active: !$this.editable,
        handler: function() {
          $this.editable = !$this.editable
          if (!$this.editable) {
            $this.cancelSelect()
            this.active = true
          } else {
            this.active = false
          }
          $this.menus = [...$this.menus]
        }
      },
      {
        key: 'validate',
        icon: 'check',
        handler: function() {
          $this.$refs.form.validate(valid => {
            if (valid) {
              console.log(valid)
            }
          })
        }
      }
    ]
  ]
}

export function generateFormItems(type) {
  switch (type) {
    case 'input':
      return generateInputItems()
    case 'textarea':
      return generateInputItems()
    case 'input-number':
      return generateInputItems()
    case 'date-picker':
      return generateDatePickerItems()
    case 'time-picker':
      return generateDatePickerItems()
    case 'checkbox':
      return generateCheckboxItems()
    default:
      return generateFormConfigItems()
  }
}

/**
 * 生成表单配置项
 */
export function generateFormConfigItems() {
  return [
    {
      key: 'grid',
      name: '整体布局',
      type: 'select',
      allowClear: true,
      options: [
        { label: '一行一列', value: 1 },
        { label: '一行二列', value: 2 },
        { label: '一行三列', value: 3 }
      ]
    },
    {
      key: 'labelWidth',
      name: '标签宽度',
      type: 'slider',
      min: 0,
      max: 50,
      tipFormatter: value => {
        return `${value}%`
      }
    },
    {
      key: 'layout',
      name: '标签展示模式',
      type: 'radio',
      options: [
        { label: '同行', value: 'horizontal' },
        { label: '单独一行', value: 'vertical' }
      ]
    }
  ]
}

export function generateInputItems() {
  return [
    ...generateBaseItems(),
    { key: 'required', name: '必填项', type: 'checkbox' },
    { key: 'pattern', name: '校验正则表达式', type: 'input' }
  ]
}

export function generateDatePickerItems() {
  return [
    ...generateBaseItems(),
    { key: 'required', name: '必填项', type: 'checkbox' }
  ]
}

export function generateCheckboxItems() {
  return [...generateBaseItems()]
}

/**
 * 生成基本的表单字段(ID，title:标题，desc:说明，width:元素宽度，labelWidth:标签宽度，defaultValue:默认值)
 */
export function generateBaseItems() {
  return [
    { key: 'id', name: 'ID', type: 'input', disabled: true, hidden: true },
    { key: 'key', name: '关键字', type: 'input' },
    { key: 'name', name: '标题', type: 'input' },
    { key: 'desc', name: '说明', type: 'input' },
    {
      key: 'descDisplay',
      name: '说明显示方式',
      type: 'radio',
      options: [
        { label: '标签', value: 'icon' },
        { label: '文本', value: 'text' }
      ]
    },
    { key: 'width', name: '元素宽度', type: 'slider', min: 25 },
    { key: 'labelWidth', name: '标签宽度', type: 'slider', min: 0, max: 50 },
    {
      key: 'disabled',
      name: '置灰',
      type: 'checkbox'
    }
    // {
    //   key: 'required',
    //   name: '必填项',
    //   type: 'checkbox-group',
    //   options: [{ label: '必填项', value: true }]
    // },
  ]
}
