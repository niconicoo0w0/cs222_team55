import request from '@/utils/request'

// 新增书籍
export function addBook (data) {
  return request({
    url: '/book/add',
    method: 'post',
    data
  })
}

// 删除书籍
export function removeBook (data) {
  return request({
    url: '/book/remove',
    method: 'post',
    data
  })
}
// 搜索书籍
export function searchBook (params) {
  return request({
    url: '/book/search',
    method: 'get',
    params
  })
}
// 借书
export function borrowBook (data) {
  return request({
    url: '/book/borrow',
    method: 'post',
    data
  })
}
// 续借书籍
export function renewBook (data) {
  return request({
    url: '/book/renew',
    method: 'post',
    data
  })
}
// 还书
export function returnBook (data) {
  return request({
    url: '/book/return',
    method: 'post',
    data
  })
}
// 点评
export function reviewBook (data) {
  return request({
    url: '/book/review',
    method: 'post',
    data
  })
}
// 当前已借书籍列表
export function recordBook (params) {
  return request({
    url: '/book/record',
    method: 'get',
    params
  })
}
