export default {
  FormTextBox: {
    Text: '单行文本',
    Icon: 'fa-tag',
    Designable: true,
    DesignProperties: [
      { Name: 'DataField', Text: '控件编码', DefaultValue: '' },
      {
        Name: 'DisplayName',
        Text: '控件名称',
        DefaultValue: '单行文本',
        Description: '普通字段,记录文本信息'
      },
      { Name: 'ControlCode', Text: '控件标识', DefaultValue: '' },
      {
        Name: 'TransferItems',
        Text: '控件转换',
        DefaultValue: 'FormTextBox',
        ValueRange: [
          { Val: 'FormTextBox', Text: '文本框' },
          { Val: 'FormDropDownList', Text: '下拉框' },
          { Val: 'FormRadioButtonList', Text: '单选框' },
          { Val: 'FormCheckboxList', Text: '复选框' }
        ]
      },
      {
        Name: 'Width',
        Text: '控件大小',
        Visiable: false,
        DefaultValue: '100%',
        ValueRange: [
          { Val: '25%', Text: '小尺寸' },
          { Val: '75%', Text: '标准尺寸' },
          { Val: '100%', Text: '大尺寸' }
        ]
      },
      { Name: 'DisplayRule', Text: '隐藏条件', DefaultValue: '' },
      { Name: 'ComputationRule', Text: '计算公式', DefaultValue: '' },
      {
        Name: 'Mode',
        Text: '格式',
        DefaultValue: 'Normal',
        ValueRange: [
          { Val: 'Normal', Text: '普通文本' },
          { Val: 'Email', Text: '邮箱' },
          { Val: 'Card', Text: '身份证' },
          /*{ Val: "Mobile", Text: "手机" },*/ {
            Val: 'Telephone',
            Text: '固话/手机'
          }
        ]
      },
      // { Name: "InputByScan", Text: "允许扫码输入", DefaultValue: false },
      { Name: 'ScanUpdateEnable', Text: '可修改扫码结果', DefaultValue: false },
      { Name: 'NoRepeat', Text: '不允许重复录入', DefaultValue: false },
      //{ Name: "IsMultiple", Text: "模式", DefaultValue: false, ValueRange: [{ Val: false, Text: "单行" }, { Val: true, Text: "多行" }] },
      {
        Name: 'DefaultItems',
        Text: '选项',
        DefaultValue: ['选项1', '选项2', '选项3']
      },
      {
        Name: 'PlaceHolder',
        Text: '提示语',
        DefaultValue: '',
        Description: '普通字段,记录文本信息'
      },
      { Name: 'Description', Text: '描述', DefaultValue: '', Description: '' }
    ]
  }
}
