import Vue from 'vue'
import TextBox from './src/main.vue'

// const Component = Vue.extend(TextBox)
TextBox.install = function() {
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
