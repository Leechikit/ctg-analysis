<template>
  <div class="colstwo">
    <draggable
      class="colstwo-item"
      :list="leftList"
      :group="{ name: 'component' }"
      ghost-class="drop-placeholder"
      @add="addEvent"
      @change="changeEvent"
    >
      <div
        v-for="(item, $index) in leftList"
        :key="$index"
        class="component"
        :class="{ 's-active': item.datafield === activeDatafield }"
        @click.stop="clickDeisgnEvnet(item.datafield)"
      >
        <div class="component-disable">
          <component
            :is="item.controlkey"
            :data="item.properties"
            :value="item.value"
          ></component>
        </div>
      </div>
    </draggable>
    <draggable
      class="colstwo-item"
      :list="rightList"
      :group="{ name: 'component' }"
      ghost-class="drop-placeholder"
      @add="addEvent"
    >
      <div
        v-for="(item, $index) in rightList"
        :key="$index"
        class="component"
        :class="{ 's-active': item.datafield === activeDatafield }"
        @click.stop="clickDeisgnEvnet(item.datafield)"
      >
        <div class="component-disable">
          <component
            :is="item.controlkey"
            :data="item.properties"
            :value="item.value"
          ></component>
        </div>
      </div>
    </draggable>
  </div>
</template>
<script>
import draggable from 'vuedraggable'
import { findIndex } from 'lodash'

export default {
  name: 'FormColsTwo',
  components: {
    draggable
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {
          label: '',
          value: '',
          readonly: false,
          clearable: false,
          placeholder: ''
        }
      }
    },
    value: {
      type: Array,
      default: () => []
    },
    excludes: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      leftList: [],
      rightList: [],
      currentValue: this.value,
      activeDatafield: null
    }
  },
  watch: {
    // data(val) {
    //   this.currentValue = val.value || [[], []]
    // },
    value(val) {
      this.currentValue = val
    },
    currentValue(val) {
      this.$emit('input', val)
    }
  },
  created() {
    // console.log(this.excludes)
  },
  methods: {
    handleInput(event) {
      this.$emit('input', event)
    },
    addEvent(evt) {
      console.log(evt)
    },
    changeEvent({ added, moved }) {
      let component = added || moved
      if (component) {
        let controlkey = component.element.controlkey
        let datafield = component.element.datafield
        if (this.excludes.includes(controlkey)) {
          let componentIndex = findIndex(this.leftList, { datafield })
          if (componentIndex > -1) {
            this.leftList.splice(componentIndex, 1)
          }
        }
      }
    },
    clickDeisgnEvnet(datafield) {
      this.activeDatafield = datafield
    }
  }
}
</script>
<style lang="scss" scoped>
@import './main.scss';
</style>
