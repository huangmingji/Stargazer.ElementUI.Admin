import { defineStore } from 'pinia'
import { login, getInfo, logout } from '@/api/user'
import { setToken, removeToken } from '@/utils/auth'

export const useUserStore = defineStore('user', {
  state: () => ({
    userId: '',
    name: '',
    avatar: '',
    permissions: []
  }),

  actions: {
    login(userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          setToken(response.accessToken, response.refreshToken, response.refreshTime)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getCurrentUserInfo() {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          this.userId = response.id
          this.name = response.name
          this.avatar = response.headIcon
          this.permissions = response.permissions
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    logout() {
      return new Promise((resolve, reject) => {
        logout(this.token).then(() => {
          this.token = ''
          this.userId = '0'
          this.name = ''
          this.avatar = '/static/img/portrait.jpg'
          this.permissions = []
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    resetToken() {
      this.token = ''
      this.userId = '0'
      this.name = ''
      this.avatar = '/static/img/portrait.jpg'
      this.permissions = []
      removeToken()
    }
  }
})
