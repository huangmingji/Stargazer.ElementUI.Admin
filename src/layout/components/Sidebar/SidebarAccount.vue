<template>
  <div>
    <stargazer-account />
    <el-aside :style="styleObject">
      <el-menu :default-active="activeMenu" :collapse="isCollapse" :router="true">
        <stargazer-sidebar-menu-item v-for="route in permission_routes" :key="route.path" :item="route"
          :base-path="route.path" />
      </el-menu>
    </el-aside>
  </div>
</template>

<script lang="js">
import StargazerSidebarMenuItem from './SidebarMenuItem.vue'
import StargazerAccount from './Account.vue'
import { usePermissionStore } from '@/stores/permission'

export default {
  name: 'StargazerSidebarAccount',
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
    StargazerAccount,
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
  created() {
    const store = usePermissionStore()
    this.permission_routes = store.routes
  }
}
</script>
