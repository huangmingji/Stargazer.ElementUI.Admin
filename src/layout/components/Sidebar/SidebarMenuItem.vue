<template>
  <el-menu-item v-if="!item.hidden && hasOneShowingChild(item.children, item)" :index="resolvePath(onlyOneChild.path)">
    <template v-if="onlyOneChild.meta">
      <i :class="convertIcon(onlyOneChild.meta)" />
      <span>{{ convertTitle(onlyOneChild.meta) }}</span>
    </template>
    <template v-else>
      <span>{{ convertTitle(onlyOneChild.meta) }}</span>
    </template>
  </el-menu-item>
  <el-sub-menu v-else-if="!item.hidden" :index="resolvePath(item.path)">
    <template v-slot:title v-if="item.meta">
      <i :class="convertIcon(item.meta)" />
      <span>{{ convertTitle(item.meta) }}</span>
    </template>
    <template v-slot:title v-else>
      <span>{{ convertTitle(item.meta) }}</span>
    </template>
    <stargazer-sidebar-menu-item v-for="child in item.children" :key="child.path" :is-nest="true" :item="child"
      :base-path="resolvePath(item.path)" />
  </el-sub-menu>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import path from 'path-browserify'
import { isExternal } from '../../../utils/validate'

export default {
  name: 'StargazerSidebarMenuItem',
  components: {
    StargazerSidebarMenuItem: defineAsyncComponent(() => import('@/layout/components/Sidebar/SidebarMenuItem.vue'))
  },
  data() {
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      onlyOneChild: null
    }
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item
          return true
        }
      })

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = Object.assign({}, parent)
        return true
      }

      return false
    },
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      return path.resolve(this.basePath, routePath)
    },
    convertTitle(meta) {
      if (meta && meta.title) {
        return meta.title
      }
      return ''
    },
    convertIcon(meta) {
      if (meta && meta.icon) {
        return meta.icon
      }
      return ''
    }
  }
}
</script>
