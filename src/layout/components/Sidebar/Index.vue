<template>
  <el-aside class="stargazer-sidebar" :style="styleObject">
    <el-menu :unique-opened="true" :default-active="activeMenu" :collapse="isCollapse" :router="true">
      <stargazer-sidebar-menu-item v-for="route in permission_routes" :key="route.path" :item="route"
        :base-path="route.path" />
    </el-menu>
  </el-aside>
</template>

<script lang="js">
import StargazerSidebarMenuItem from './SidebarMenuItem.vue'
import { usePermissionStore } from '@/stores/permission'

export default {
  name: 'StargazerSidebar',
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    },
    height: {
      type: String,
      default: 'auto'
    }
  },
  components: {
    StargazerSidebarMenuItem
  },
  data() {
    return {
      permission_routes: []
    }
  },
  computed: {
    styleObject() {
      return {
        height: this.height
      }
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    }
  },
  mounted() {
    const store = usePermissionStore()
    this.permission_routes = store.addRoutes
  }
}
</script>

<style>
.stargazer-sidebar.el-aside {
  color: #333;
  line-height: 200px;
  text-align: left;
  border-right: 1px solid #e6e6e6;
  background-color: #f9fafc;
  max-width: 250px;
  height: 100vh;
  overflow-y: scroll;
}

.stargazer-sidebar.el-aside .el-menu {
  border: 0;
  background-color: #f9fafc;
}

.stargazer-sidebar.el-aside .el-menu:not(.el-menu--collapse) {
  border: 0;
  width: 100%;
}

.stargazer-sidebar .el-menu-item [class^=el-icon] {
  font-size: 18px;
  margin-right: 5px;
  text-align: center;
  vertical-align: middle;
  width: var(--el-menu-icon-width);
}

.stargazer-sidebar .el-sub-menu [class^=el-icon] {
  font-size: 18px;
  margin-right: 5px;
  text-align: center;
  vertical-align: middle;
  width: var(--el-menu-icon-width);
}
</style>