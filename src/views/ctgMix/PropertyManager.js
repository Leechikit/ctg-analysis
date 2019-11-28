import $ from 'jquery'

export default class PropertyManager {
  constructor(propertyName) {
    this.PropertyName = propertyName
    this.$Title = $("<div class='property-left property-paddingleft-1x'>")
    this.$RightTools = $(
      "<div class='property-right property-paddingright-1x'>"
    )
    this.$Header = $("<div class='property-item property-title'>")
      .append(this.$Title)
      .append(this.$RightTools)
    this.$Ul = $("<ul class='property-items'>")
    this.$BottomTools = $(
      '<div class="property-items contrlPaneLabel">'
    ).append(this.$BottomTools)
    this.$Group = $(
      "<div class='property-group' propertyName='" + propertyName + "'>"
    )
      .append(this.$Header)
      .append(this.$Ul)
      .append(this.$BottomTools)
    this.$Items = []
    this.IndexNo = 0
  }
  GetElement() {
    return this.$Group
  }
  AddItem($item) {
    $item.attr('data-index', this.IndexNo)
    var $li = $(
      "<li data-index='" + this.IndexNo + "' class='property-item'>"
    ).append($item)
    this.$Ul.append($li)

    this.$Items.push($item)
    this.IndexNo++
    return $li
  }
  SetTitle(title) {
    this.$Title.text(title)
  }
}
