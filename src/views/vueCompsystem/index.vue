<template>
  <div class="vue-compsystem">
    <div class="con">
      <div class="con-left">
        <div class="comp">
          <a
            class="comp-item"
            href="javascript:"
            v-for="(item, $index) in componentList"
            :key="$index"
            @click="clickCompEvent(item.controlkey)"
            >{{ item.name }}</a
          >
        </div>
      </div>
      <div class="con-main">
        <div class="sheetContent">
          <div
            v-for="(item, $index) in designList"
            :key="$index"
            class="component"
            :class="{ 's-active': item.datafield === activeDatafield }"
            @click="clickDeisgnEvnet(item.datafield)"
          >
            <div class="component-disable">
              <component
                :is="item.controlkey"
                :data="item.properties"
              ></component>
            </div>
          </div>
        </div>
      </div>
      <div class="con-right">
        <el-button type="primary" round @click="saveEvent">保存</el-button>
        <div class="sheetProperty" v-if="refreshProperty">
          <component
            v-for="(item, $index) in propertyList"
            :key="$index"
            :is="`property-${item.type}`"
            :datafield="activeDatafield"
            v-model="item.value"
          ></component>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import FormControls from '@/views/vueMix/FormControls'
import packagesRegister from '@/packages'
import { find } from 'lodash'
export default {
  name: 'vueCompsystem',
  data() {
    return {
      componentList: [],
      designList: [],
      designListCache: [],
      propertyList: [],
      activeDatafield: null,
      datafieldNo: 0,
      refreshProperty: true,
      needSave: false
    }
  },
  watch: {
    propertyList: {
      handler: function(value) {
        let activeDesign = find(this.designList, {
          datafield: this.activeDatafield
        })
        if (activeDesign) {
          value.forEach(item => {
            activeDesign.properties[item.enName] = item.value
          })
          this.needSave = true
        }
      },
      deep: true
    },
    activeDatafield() {
      this.refreshProperty = false
      this.$nextTick(() => {
        this.refreshProperty = true
      })
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
    clickCompEvent(controlkey) {
      if (this.needSave === true) {
        this.designList = JSON.parse(JSON.stringify(this.designListCache))
        this.needSave = false
      }
      this.activeDatafield = this.createDatafield()
      let properties = {}
      this.propertyList = []
      if (FormControls[controlkey].properties) {
        FormControls[controlkey].properties.forEach(item => {
          properties[item.enName] = item.value
          this.propertyList.push({ ...item })
        })
      }
      this.designList.push({
        controlkey,
        properties,
        datafield: this.activeDatafield
      })
      this.designListCache = JSON.parse(JSON.stringify(this.designList))
      packagesRegister(controlkey)
    },
    clickDeisgnEvnet(datafield) {
      if (this.activeDatafield === datafield) {
        return
      }
      if (this.needSave === true) {
        this.designList = JSON.parse(JSON.stringify(this.designListCache))
        this.needSave = false
      }
      this.activeDatafield = datafield
      let activeDesign = find(this.designList, {
        datafield
      })
      this.propertyList = []
      if (FormControls[activeDesign.controlkey].properties) {
        FormControls[activeDesign.controlkey].properties.forEach(item => {
          this.propertyList.push({
            ...item,
            value: activeDesign.properties[item.enName]
          })
        })
      }
    },
    saveEvent() {
      this.needSave = false
      this.designListCache = JSON.parse(JSON.stringify(this.designList))
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
</style>
