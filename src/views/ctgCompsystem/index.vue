<template>
  <div class="ctg-compsystem">
    <div class="con">
      <div class="con-left">
        <div class="comp">
          <a
            class="comp-item"
            href="javascript:"
            v-for="(item, $index) in component"
            :key="$index"
            @click="clickCompEvent(item.controlkey)"
            >{{ item.text }}</a
          >
        </div>
      </div>
      <div class="con-main" id="sheetContent"></div>
      <div class="con-right" id="sheetPropertysPanel"></div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
import FormControls from './FormControls'
import SheetDesigner from './SheetDesigner'
export default {
  name: 'ctg-compsystem',
  data() {
    return {
      component: [],
      sheetDesigner: null,
      $SheetContent: null
    }
  },
  mounted() {
    this.sheetDesigner = new SheetDesigner()
    this.$SheetContent = $('#sheetContent')
    this.getComponents()
  },
  methods: {
    getComponents() {
      for (let key in FormControls) {
        let item = FormControls[key]
        this.component.push({
          controlkey: key,
          text: item.Text
        })
      }
    },
    clickCompEvent(controlkey) {
      this.sheetDesigner.AddComponent(controlkey)
    }
  }
}
</script>
<style lang="scss" scope>
.con {
  display: flex;
  &-left {
    flex-shrink: 0;
    width: 20vw;
    min-width: 200px;
  }
  &-right {
    flex-shrink: 0;
    width: 20vw;
    min-width: 200px;
  }
  &-main {
    flex: 1;
  }
}
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
#sheetContent {
  margin: 0 15px;
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
#sheetPropertysPanel {
  margin: 0 5px;
  .property-group {
    margin-bottom: 10px;
    padding-bottom: 5px;
  }
  .property-left {
    font-size: 14px;
    font-weight: bold;
    text-align: left;
    margin-bottom: 10px;
  }
  .property-items {
    margin-bottom: 10px;
  }
  .property-input {
    width: 100%;
  }
}
</style>
