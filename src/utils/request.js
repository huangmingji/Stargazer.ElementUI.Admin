import axios from 'axios'
import { ElMessage } from 'element-plus'
import { getToken } from '@/utils/auth'
import { useUserStore } from '@/stores/user'

const baseURL = import.meta.env.APP_MOCK ? '' : import.meta.env.APP_API_BASE_URL

// 创建axios实例
const service = axios.create({
  baseURL: baseURL, // api的base_url
  timeout: 60000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    let token = getToken()
    config.headers['Cache-Control'] = 'no-cache'
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// respone拦截器
service.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    console.log('err' + error) // for debug
    const userStore = useUserStore()
    if (error.response && error.response.status === 401) {
      userStore.resetToken().then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    } else {
      ElMessage({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
    }
    return Promise.reject(error)
  }
)

export default service
