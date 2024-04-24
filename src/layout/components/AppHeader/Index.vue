<template>
  <el-header>
    <router-link class="logo" to="/dashboard">
      <img v-if="logo" :src="logo" class="sidebar-logo">
      <span v-if="showTitle">{{ title }}</span>
    </router-link>
    <navbar />
  </el-header>
</template>

<script>
import { settings } from '@/settings'
import Navbar from './Navbar.vue'

export default {
  name: 'StargazerAppHeader',
  components: {
    Navbar
  },
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    },
    collapseHandle: {
      type: Function,
      default: function () { }
    }
  },
  data() {
    return {
      title: settings.title,
      showTitle: settings.showTitle,
      logo: '/static/img/logo2.png'
    }
  }
}
</script>

<style>
.el-header .logo {
  color: #ffffff;
  text-decoration: none;
  margin-right: 20px;
}

.el-header .logo .sidebar-logo {
  /* width: 32px; */
  height: 32px;
  vertical-align: middle;
  margin-right: 15px;
}

.el-header .el-menu {
  float: right;
}

.el-header .el-menu>li {
  /* background-color: #B3C0D1; */
  color: #333;
}
</style>