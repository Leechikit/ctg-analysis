<template>
  <div class="vue-dragdrop">
    <div class="con">
      <div class="con-left">
        <draggable
          class="comp"
          :list="component"
          :group="{ name: 'people', pull: 'clone', put: false }"
          :clone="cloneComp"
          :sort="false"
        >
          <a
            class="comp-item"
            href="javascript:"
            v-for="item in component"
            :key="item.id"
          >
            {{ item.name }}
          </a>
        </draggable>
      </div>
      <div class="con-main">
        <draggable class="sheetContent" :list="designer" group="people">
          <div v-for="item in designer" :key="item.id">{{ item.name }}</div>
        </draggable>
      </div>
    </div>
  </div>
</template>
<script>
import draggable from 'vuedraggable'
import FormControls from '@/views/ctgMix/FormControls'
let idGlobal = 8
export default {
  name: 'vueDragdrop',
  components: {
    draggable
  },
  data() {
    return {
      component: [],
      designer: []
    }
  },
  created() {
    this.getComponents()
  },
  methods: {
    getComponents() {
      for (let key in FormControls) {
        let item = FormControls[key]
        this.component.push({
          id: key,
          name: item.Text
        })
      }
    },
    cloneComp({ name }) {
      console.log(name)
      return {
        id: idGlobal++,
        name
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
.sheetContent {
  min-height: 400px;
}
</style>
