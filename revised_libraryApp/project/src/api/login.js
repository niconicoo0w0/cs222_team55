import request from '@/utils/request'

// 注册
export function register (data) {
  return request({
    url: '/user/registration',
    method: 'post',
    data
  })
}

// 登录
export function login (data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}
