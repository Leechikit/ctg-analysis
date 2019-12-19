export default {
  FormTextBox: {
    path: './packages/form-text-box/index.js',
    cnName: '单行文本框',
    value: '',
    type: 'control',
    properties: [
      {
        type: 'text',
        cnName: '显示名称',
        enName: 'label',
        tips: '请填写显示名称',
        value: '单行文本框'
      },
      {
        type: 'text',
        cnName: '提示文案',
        enName: 'placeholder',
        tips: '请填写提示文案',
        value: '请输入'
      },
      {
        type: 'switch',
        cnName: '是否显示清空按钮',
        enName: 'clearable',
        tips: '',
        value: false
      }
    ]
  },
  FormColsTwo: {
    cnName: '一行两列',
    value: [],
    type: 'layout',
    excludes: ['FormColsTwo'],
    properties: [
      {
        type: 'text',
        cnName: '左边占比',
        enName: 'percentage',
        tips: '左边宽度占比',
        value: '0.5'
      }
    ]
  },
  Tips: {
    cnName: '提示语',
    type: 'control',
    properties: [
      {
        type: 'text',
        cnName: '背景颜色',
        enName: 'bgColor',
        tips: '请填写背景颜色',
        value: '#ffffff'
      },
      {
        type: 'text',
        cnName: '文字颜色',
        enName: 'fontColor',
        tips: '请填写文字颜色',
        value: '#000000'
      },
      {
        type: 'text',
        cnName: '文字大小',
        enName: 'fontSize',
        tips: '',
        value: '12px'
      },
      {
        type: 'text',
        cnName: '提示内容',
        enName: 'content',
        tips: '',
        value: '提示内容'
      },
      {
        type: 'text',
        cnName: '文本定位',
        enName: 'textAlign',
        tips: '',
        value: 'left'
      }
    ]
  }
}
