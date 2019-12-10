<template>
  <div class="vue-dragdrop">
    <div class="con">
      <div class="con-left">
        <draggable
          class="comp"
          :list="componentList"
          :group="{ name: 'component', pull: 'clone', put: false }"
          :clone="cloneComp"
          :sort="false"
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
          group="component"
          ghost-class="drop-placeholder"
          @add="addHandler"
        >
          <div
            class="sheet-control"
            v-for="item in designList"
            :key="item.controlkey"
          >
            {{ item.name }}
          </div>
        </draggable>
      </div>
    </div>
  </div>
</template>
<script>
import draggable from 'vuedraggable'
import FormControls from '@/views/ctgMix/FormControls'
export default {
  name: 'vueDragdrop',
  components: {
    draggable
  },
  data() {
    return {
      componentList: [],
      designList: [],
      datafieldNo: 0
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
          name: item.Text
        })
      }
    },
    cloneComp({ controlkey, name }) {
      return {
        datafield: this.createDatafield(),
        controlkey,
        name
      }
    },
    addHandler(evt) {
      console.log(evt)
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
  .sheet-control {
    width: 100%;
    height: 40px;
    line-height: 40px;
    padding: 0 20px;
    margin-bottom: 5px;
    font-size: 14px;
    background-color: #f0f4ff;
    border: 1px solid #ccc;
    cursor: pointer;
    &.s-selected {
      border: 1px dashed #2d8cf0;
    }
  }
}
</style>
