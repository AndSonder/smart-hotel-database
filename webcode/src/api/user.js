import request from '@/utils/request'

export function login(data) {
  return request({
    url: 'http://127.0.0.1:5000/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: 'http://127.0.0.1:5000/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}
