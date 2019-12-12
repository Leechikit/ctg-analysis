<template>
  <div class="vue-dragdrop">
    <div class="con">
      <div class="con-left">
        <draggable
          class="comp"
          :list="componentList"
          :group="{ name: 'component', pull: 'clone', put: false }"
          :sort="false"
          :clone="cloneComp"
          :move="checkMove"
        >
          <a
            class="comp-item"
            href="javascript:"
            v-for="item in componentList"
            :key="item.controlkey"
            :data-controlkey="item.controlkey"
          >
            {{ item.name }}
          </a>
        </draggable>
      </div>
      <div class="con-main">
        <draggable
          class="sheetContent"
          :list="designList"
          :group="{ name: 'component' }"
          ghost-class="drop-placeholder"
          :move="checkMove"
          @add="addHandler"
          @change="changeEvent"
        >
          <div
            v-for="(item, $index) in designList"
            :key="$index"
            class="component"
            :class="{ 's-active': item.datafield === activeDatafield }"
            @click="clickDeisgnEvnet(item.datafield)"
          >
            <div :class="{ 'component-disable': item.type !== 'layout' }">
              <component
                :is="item.controlkey"
                :data="item.properties"
                :value="item.value"
                :excludes="item.excludes"
              ></component>
            </div>
          </div>
        </draggable>
      </div>
      <div class="con-right"></div>
    </div>
  </div>
</template>
<script>
import draggable from 'vuedraggable'
import FormControls from '@/views/vueMix/FormControls'
import packagesRegister from '@/packages'
export default {
  name: 'vueDragdrop',
  components: {
    draggable
  },
  data() {
    return {
      componentList: [],
      designList: [],
      datafieldNo: 0,
      activeDatafield: null
    }
  },
  created() {
    this.getComponents()
  },
  methods: {
    getComponents() {
      for (let key in FormControls) {
        let item = FormControls[key]
        this.componentList.push({
          controlkey: key,
          name: item.cnName
        })
      }
    },
    cloneComp({ controlkey }) {
      this.activeDatafield = this.createDatafield()
      let properties = {}
      if (FormControls[controlkey].properties) {
        FormControls[controlkey].properties.forEach(item => {
          properties[item.enName] = item.value
        })
      }
      packagesRegister(controlkey)
      return {
        controlkey,
        properties,
        datafield: this.activeDatafield,
        value: FormControls[controlkey].value,
        type: FormControls[controlkey].type,
        excludes: FormControls[controlkey].excludes
      }
    },
    checkMove: function(evt) {
      // let controlkey = evt.draggedContext.element.controlkey
      // console.log(evt)
      return evt.draggedContext.element.name !== 'apple'
    },
    addHandler(evt) {
      let activeDesign = this.designList[evt.newIndex]
      console.log(activeDesign)
    },
    changeEvent({ added, removed, moved }) {
      console.log(added, removed, moved)
    },
    clickDeisgnEvnet(datafield) {
      this.activeDatafield = datafield
    },
    //创建控件的datafield值
    createDatafield() {
      let newDatafield = ''
      let needCheck = true
      while (needCheck) {
        this.datafieldNo += 1
        newDatafield = 'F' + this.generateDatafield(7, '0', this.datafieldNo)
        //先判断表单设计器中是否已经有相同的编码
        let existControl = this.designList.filter(
          item => item.datafield === newDatafield
        )
        if (existControl && existControl.length > 0) {
          continue
        } else {
          needCheck = false
        }
      }
      return newDatafield
    },
    //格式化DataFieldNo到7位
    generateDatafield(bits, identifier, value) {
      value = Array(bits + 1).join(identifier) + value
      return value.slice(-bits)
    }
  }
}
</script>
<style lang="scss" scope>
.comp {
  overflow: hidden;
  margin: 0 5px;
  &-item {
    float: left;
    width: 48%;
    margin: 1%;
    height: 40px;
    line-height: 40px;
    text-decoration: none;
    background-color: #f0f4ff;
    border-radius: 5px;
    color: #333;
    &:hover {
      color: #2d8cf0;
    }
  }
}
.sheetContent {
  min-height: 400px;
  .drop-placeholder {
    display: block;
    width: 100%;
    margin: 0;
  }
  .component {
    border: 1px solid transparent;
    cursor: pointer;
    &:hover {
      border-color: #f0f4ff;
      background-color: #f0f4ff;
    }
    &.s-active {
      border-color: #2d8cf0;
    }
    &-disable {
      pointer-events: none;
    }
  }
}
</style>
