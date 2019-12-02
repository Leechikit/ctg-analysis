import $ from 'jquery'
import FormControls from './FormControls'
import PropertyManager from './PropertyManager'

// 控件管理器
export default class ControlManager {
  constructor(sheetDesigner, dataField, settings) {
    this.Designer = sheetDesigner
    this.DataField = dataField
    this.Settings = settings
    this.$Control = this.Designer.GetControlElement(dataField)
    this.$SheetPropertysPanel = this.Designer.$SheetPropertysPanel
    this.ControlKey = this.Settings.ControlKey
    this.DesignProperties = FormControls[this.ControlKey].DesignProperties || []
    this.PropertyManagers = {}
    this.LoadPropertySetting()
  }
  // 加载控件属性
  LoadPropertySetting() {
    for (var i = 0; i < this.DesignProperties.length; ++i) {
      var designProperty = this.DesignProperties[i]
      if (designProperty.Visiable != null && !designProperty.Visiable) {
        continue
      }
      this.RenderProperty(designProperty)
    }
  }
  // 加载组件属性
  RenderProperty(designProperty) {
    let pManager = null
    switch (designProperty.Name) {
      case 'DisplayName': //显示名称
        pManager = this.RenderTextBox(designProperty, function(val) {
          this.$Control.text(val)
        })
        break
      case 'ControlCode':
        pManager = this.RenderTextBox(designProperty)
        break
      default:
      // this.RenderTextBox(designProperty)
    }
    this.PropertyManagers[designProperty.Name] = pManager
  }
  // 渲染文本框
  RenderTextBox(designProperty, callback) {
    let propertyName = designProperty.Name
    let defaultValue = this.Settings[propertyName] || ''
    let propertyManager = new PropertyManager(propertyName)
    let that = this
    let $item = $(
      '<input maxlength="10" class="property-input" data-index="0">'
    ).val(defaultValue.replace(/(^\s*)|(^\s*$)/g, ''))
    propertyManager.SetTitle(designProperty.Text)
    propertyManager.AddItem($item)
    $item.keyup(function() {
      var newValue = $(this).val()
      that.$Control.attr('data-' + propertyName, newValue)
      // that.Settings[propertyName] = newValue
      if (callback && $.isFunction(callback)) {
        callback.apply(that, [newValue, $(this)])
      }
    })
    $item.on('blur', function() {
      var $this = $(this)
      var newValue = $this.val().replace(/[{}]/g, '')
      $this.val(newValue)
      $this.keyup()
    })
    this.$SheetPropertysPanel.append(propertyManager.GetElement())
    return propertyManager
  }
}
