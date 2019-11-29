<template>
  <div class="col-title" v-text="text"></div>
</template>
<script>
export default {
  name: 'colTitle',
  props: {
    text: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="scss" scope>
.col-title {
  width: 100%;
  height: 40px;
  font-size: 14px;
  line-break: 40px;
  text-align: center;
  background-color: #f0f4ff;
}
</style>
