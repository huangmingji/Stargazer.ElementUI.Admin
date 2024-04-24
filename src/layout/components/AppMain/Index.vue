<template>
  <el-main :style="styleObject">
    <router-view :key="key" />
  </el-main>
</template>

<script>
export default {
  name: 'StargazerAppMain',
  props: {
    height: {
      type: String,
      default: 'auto'
    }
  },
  computed: {
    styleObject() {
      return {
        height: this.height
      }
    },
    key() {
      return this.$route.fullPath
    }
  }
}
</script>

<style>
.el-main {
  color: #333;
  width: auto;
  height: 100vh;
  overflow-y: scroll;
}
</style>
