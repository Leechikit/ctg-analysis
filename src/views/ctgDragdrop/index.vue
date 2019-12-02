<template>
  <div class="ctg-dragdrop">
    <div class="con">
      <div class="con-left">
        <div class="comp" id="components">
          <a
            class="comp-item"
            href="javascript:"
            v-for="(item, $index) in component"
            :key="$index"
            :data-controlkey="item.controlkey"
            :data-candroptype="item.candroptype || ''"
            >{{ item.text }}</a
          >
        </div>
      </div>
      <div class="con-main" id="sheetContent"></div>
    </div>
  </div>
</template>
<script>
import FormControls from '@/views/ctgMix/FormControls'
import SheetDesigner from './SheetDesigner'
import 'jquery-ui/ui/widgets/draggable'
import 'jquery-ui/ui/widgets/sortable'

export default {
  name: 'ctgDragdrop',
  data() {
    return {
      component: [],
      sheetDesigner: null
    }
  },
  mounted() {
    this.getComponents()
    this.$nextTick(() => {
      this.sheetDesigner = new SheetDesigner()
    })
  },
  methods: {
    getComponents() {
      for (let key in FormControls) {
        let item = FormControls[key]
        this.component.push({
          controlkey: key,
          text: item.Text,
          candroptype: item.candroptype
        })
      }
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
.drop-placeholder {
  display: block;
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  margin-bottom: 5px;
  background-color: #f0f4ff;
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
  .sheet-layout {
    display: flex;
    width: 100%;
    min-height: 64px;
    padding: 5px;
    margin-bottom: 5px;
    background-color: #f0f4ff;
    border: 1px solid #ccc;
    cursor: pointer;
    .layout-item {
      flex: 1;
      border: 1px dashed #ccc;
      padding: 5px 5px 0;
      &:not(:last-child) {
        margin-right: 5px;
      }
    }
  }
}
</style>
