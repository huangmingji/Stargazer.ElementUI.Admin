<template>
  <el-container direction="vertical">
    <stargazer-app-header :is-collapse="isCollapse" :collapse-handle="collapseHandle" />
    <el-container>
      <stargazer-sidebar :is-collapse="isCollapse" :height="height" />
      <stargazer-app-main :height="height" />
    </el-container>
  </el-container>
</template>

<script>
import StargazerAppHeader from '@/layout/components/AppHeader/Index.vue'
import StargazerSidebar from '@/layout/components/Sidebar/Index.vue'
import StargazerAppMain from '@/layout/components/AppMain/Index.vue'

export default {
  components: {
    StargazerAppHeader,
    StargazerSidebar,
    StargazerAppMain
  },
  data() {
    return {
      isCollapse: false
    }
  },
  computed: {
    height() {
      const height = window.innerHeight - 60
      return height + 'px'
    }
  },
  methods: {
    collapseHandle(val) {
      this.isCollapse = val
    }
  }
}
</script>

<style>
.el-header,
.el-footer {
  background-color: #2b303b;
  color: #333;
  line-height: 60px;
}

.el-container {
  margin: 0;
  padding: 0;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
