import Vue from 'vue'
import Package from './src/main.vue'
import config from './config'
let data = {}
if (config.properties) {
  config.properties.forEach(item => {
    if (item.enName !== void 0) {
      data[item.enName] = item.value || null
    }
  })
}
Package.install = function() {
  Package.props = Object.assign({}, Package.props, {
    data: {
      type: Object,
      default: data
    }
  })
  Vue.component(Package.name, Package)
}
export default Package
