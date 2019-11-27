import $ from 'jquery'
import FormControls from './FormControls'
import ControlManager from './ControlManager'

export default class SheetDesigner {
  constructor() {
    this.$SheetContent = $('#sheetContent')
    this.$SheetPropertysPanel = $('#sheetPropertysPanel')
    this.ControlManagers = {}
    this.DataFieldNo = 0
  }
  // 增加组件
  AddComponent(controlkey) {
    let $el = this.RenderControl(controlkey)
    this.$SheetContent.append($el)
    setTimeout(() => {
      this.ControlElementSelected($el)
    }, 0)
  }
  //渲染控件
  RenderControl(controlkey) {
    const datafield = this.CreateNewControlDataField()
    let $el = $(
      `<div id="${datafield}"
        class="sheet-control" data-controlkey="${controlkey}"
        data-datafield="${datafield}">${FormControls[controlkey].Text}</div>`
    )
    $el.click(e => {
      this.ControlElementSelected.apply(this, [$el, e])
    })
    return $el
  }
  //选中控件
  ControlElementSelected($el) {
    //如果控件已经选中则不要再次选中
    if ($el.hasClass('s-selected')) {
      return
    }

    //清除所有选中控件的选中状态
    this.$SheetContent.find('.s-selected').removeClass('s-selected')
    //设置当前控件的选中状态
    $el.addClass('s-selected')

    // 清空属性区域
    const datafield = this.GetDataField($el)
    this.$SheetPropertysPanel.empty()
    //加载控件属性
    this.LoadPropertySetting.apply(this, [datafield])
  }
  //加载控件属性
  LoadPropertySetting(datafield) {
    // 读取当前配置加载配置
    var Settings = this.GetSettings(datafield)
    var controlManager = new ControlManager(this, datafield, Settings)
    this.ControlManagers[datafield] = controlManager
  }
  //创建控件的datafield值
  CreateNewControlDataField() {
    var newDataField = ''
    var needCheck = true
    while (needCheck) {
      this.DataFieldNo += 1
      newDataField = 'F' + this.GenerateDataFieldNo(7, '0', this.DataFieldNo)
      //先判断表单设计器中是否已经有相同的编码
      var existControl = this.$SheetContent.find(
        "div[data-controlkey][data-datafield='" + newDataField + "']"
      )
      if (existControl && existControl.length > 0) {
        continue
      } else {
        needCheck = false
      }
    }
    return newDataField
  }
  //格式化DataFieldNo到7位
  GenerateDataFieldNo(bits, identifier, value) {
    value = Array(bits + 1).join(identifier) + value
    return value.slice(-bits)
  }
  //获取数据项的DataField值
  GetDataField($el) {
    return $el.attr('data-datafield')
  }
  //根据DataFiled 的值，获取控件
  GetControlElement(datafield) {
    var id = (datafield || '').replace(/\./g, '-')
    var $el = this.$SheetContent.find('#' + id)
    return $el
  }

  //读取控件的配置
  GetSettings(datafield) {
    var $el = this.GetControlElement(datafield)
    if ($el.length == 0) return {}
    var controlKey = $el.attr('data-controlkey')
    var settings = {
      ControlKey: controlKey
    }
    if (controlKey == void 0) {
      //如果控件有异常（没有controlkey）返回null
      return null
    }
    var designProperties = FormControls[controlKey].DesignProperties
    for (var i = 0; i < designProperties.length; i++) {
      var propertyName = designProperties[i].Name
      if ($el.attr('data-' + propertyName)) {
        settings[propertyName] = $el.attr('data-' + propertyName)
      } else {
        settings[propertyName] = designProperties[i].DefaultValue
      }
    }
    return settings
  }
}
