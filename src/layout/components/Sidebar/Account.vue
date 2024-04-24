<template>
  <div class="account-center-top__avatar">
    <el-row :gutter="10">
      <el-col :span="24">
        <avatar-upload :value="avatar" :action="11" :width="'100px'" :height="'100px'" />
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="24">
        <span>{{ name }}</span>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="24">
        <el-dropdown size="mini" split-button type="default">
          <i class="el-icon-setting" /> 账号设置
          <template v-slot:dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>安全退出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="js">
import { useUserStore } from '@/stores/user'
import AvatarUpload from '../../../components/Upload/AvatarUpload.vue'

export default {
  name: 'StargazerAccount',
  components: {
    AvatarUpload
  },
  data() {
    return {
      name: '',
      avatar: ''
    }
  },
  methods: {
    async logout() {
      const store = useUserStore()
      store.resetToken()
      window.location.reload()
    }
  },
  created() {
    const store = useUserStore()
    this.name = store.name
    this.avatar = store.avatar
  },
}
</script>
