import Vue from 'vue'
import Package from './src/main.vue'

Package.install = function() {
  Vue.component(Package.name, Package)
}
export default Package
