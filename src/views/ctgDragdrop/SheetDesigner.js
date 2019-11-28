import $ from 'jquery'
import FormControls from './FormControls'

export default class SheetDesigner {
  constructor() {
    this.$SheetContent = $('#sheetContent')
    this.$Controls = $('#components')
    this.CurrentDrag = null
    this.DataFieldNo = 0
    this.Init()
  }
  Init() {
    this.BindDragDropEvent()
  }
  // 绑定拖拽放置事件
  BindDragDropEvent() {
    let controls = this.$Controls.find('.comp-item[data-candroptype]')
    this.BindDraggable(controls, this.$SheetContent)
    this.BindSortable(this.$SheetContent)
  }
  // 拖拽事件
  BindDraggable(source, target) {
    $(source).draggable({
      appendTo: '#sheetContent',
      helper: 'clone',
      scroll: true,
      snap: true,
      snapTolerance: 10,
      scrollSensitivity: 100,
      cursorAt: {
        cursor: 'move',
        top: 25,
        left: 20
      },
      connectToSortable: target, //拖拽目标，且自动排序
      start: (e, ui) => {
        console.log('drag start')
        $(ui.helper).css({
          width: '108px',
          border: '1px dashed #2d7FFF',
          'font-size': '12px',
          color: '#2D7FFF',
          backgroundColor: '#f0f4ff',
          'box-shadow': '0 0 3px 0 rgba(201,201,201,0.50)',
          overflow: 'hidden',
          'text-overflow': 'ellipsis',
          'white-space': 'nowrap',
          'text-decoration': 'none'
        })
        this.CurrentDrag = $(this) //记录当前拖拽的对象
        this.CurrentDrag.addClass('draggThis')
      },
      stop: () => {
        console.log('drag stop')
      }
    })
  }
  // 排序放置事件
  BindSortable(target) {
    target.sortable({
      // connectWith: target,
      forcePlaceholderSize: true,
      placeholder: 'drop-item', //拖拽位置显示值
      scroll: true,
      scrollSensitivity: 100,
      cancel:
        'notdrag,.SheetGridView_wrap,#sheetContent .sheet-control.SheetGridView >div.col-sm-12',
      //containment: "parent",
      over: () => {
        console.log('sheetContent sortable over')
        $(this)
          .find('.drop-item')
          .show()
      },
      stop: (e, ui) => {
        console.log('sheetContent sortable stop')
        this.SortableStop(ui.item, e)
      }
    })
  }
  // 放置结束
  SortableStop(item) {
    let $item = $(item)
    if (this.CurrentDrag) {
      this.AddComponent($item)
    }
  }
  // 增加组件
  AddComponent($item) {
    const controlkey = $item.attr('data-controlkey')
    let $el = this.RenderControl(controlkey)
    $item.after($el)
    $item.remove()
  }
  // 渲染组件
  RenderControl(controlkey) {
    const datafield = this.CreateNewControlDataField()
    let $el = $(
      `<div id="${datafield}"
        class="sheet-control" data-controlkey="${controlkey}"
        data-datafield="${datafield}">${FormControls[controlkey].Text}</div>`
    )
    return $el
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
}
