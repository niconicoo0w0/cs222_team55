import axios from 'axios'
// import router from '../router'

// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 6000 // 请求超时时间
})

// request interceptor
request.interceptors.request.use(
  config => {
    return config
  },
  () => {}
)

// response interceptor
request.interceptors.response.use(
  response => {
    return response.data
  },
  () => {}
)

export default request
