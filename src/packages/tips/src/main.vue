<template>
  <div
    class="tips"
    :style="{
      backgroundColor: data.bgColor,
      color: data.fontColor,
      fontSize: data.fontSize,
      textAlign: data.textAlign
    }"
  >
    {{ data.content }}
  </div>
</template>
<script>
export default {
  name: 'Tips',
  props: {
    data: {
      type: Object,
      default: () => {
        return {
          bgColor: '',
          fontColor: '',
          fontSize: '',
          content: '',
          textAlign: ''
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.tips {
  padding: 10px;
}
</style>
