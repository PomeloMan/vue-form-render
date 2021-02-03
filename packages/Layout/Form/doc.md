#### 通用参数
对于每一个表单控件，都会使用如下描述
```
{
  "name": '文本',
  type: 'input',
}
```

##### name
表单控件的标题信息，作为 label 展示，注意 title 为""时占位，title 不写时不占位
##### desc
表单控件的描述信息，常将填写注意点放入此参数
##### descDisplay
表单控件描述信息的显示方式，'text'文本显示和'icon'标签显示
##### type
表单控件的类型，支持'input','select','slider','radio','checkbox'
##### pattern
表单控件自定义正则校验，用于校验数据是否合格
##### required
表单控件是否必填
##### disabled
表单控件是否不可编辑
##### id
表单控件的唯一标识，根据当前时间的Base64编码自动生成
##### key
表单控件对应表单值的唯一标识

#### 样式参数
##### hidden
表单控件元素是否隐藏
##### width
表单控件元素的宽度
##### labelWidth
表单控件标签的宽度



#### 各个 TYPE 的特有属性
