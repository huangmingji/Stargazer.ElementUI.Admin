<template>
  <el-menu mode="horizontal" :ellipsis="false" default-active="1" background-color="#2b303b" text-color="#fff"
    active-text-color="#fff" style="border: 0;">
    <el-sub-menu index="account">
      <template v-slot:title>
        <el-avatar shape="square" size="default" :src="avatar" style="margin-right: 10px;" />
        <span>{{ name }}</span>
      </template>
      <el-menu-item>个人设置</el-menu-item>
      <el-menu-item @click="logout">
        安全登出
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script>
import { useUserStore } from '@/stores/user'

export default {
  name: 'StargazerNavbar',
  data() {
    return {
      name: '',
      avatar: ''
    }
  },
  methods: {
    async logout() {
      const store = useUserStore()
      await store.logout()
      window.location.reload()
    }
  },
  created() {
    const store = useUserStore()
    this.name = store.name
    this.avatar = store.avatar
  }
}
</script>
