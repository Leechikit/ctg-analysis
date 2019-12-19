import Vue from 'vue'
import TextBox from './src/main.vue'
import config from './config'
let data = {}
if (config.properties) {
  config.properties.forEach(item => {
    if (item.enName !== void 0) {
      data[item.enName] = item.value || null
    }
  })
}
// const Component = Vue.extend(TextBox)
TextBox.install = function() {
  TextBox.props = Object.assign({}, TextBox.props, {
    data: {
      type: Object,
      default: data
    }
  })
  Vue.component(TextBox.name, TextBox)
  // const instance = new Component({
  //   render(createElement) {
  //     return createElement(TextBox, {
  //       on
  //     })
  //   }
  // })
  // return instance
}
export default TextBox
