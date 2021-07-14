import request from '@/utils/request'
import base from '@/api/setting'

export function login(data) {
  console.log(base)
  return request({
    url: '/user/login',
    method: 'post',
    baseURL:base['base'],
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    baseURL:base['base'],
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}

export function fetchUserList(query) {
  return request({
    url: '/user/list',
    method: 'get',
    baseURL:base['base'],
    params: query
  })
}

export function updateUser(data) {
  return request({
    url: '/user/update',
    method: 'post',
    baseURL:base['base'],
    data
  })
}

export function createUser(data) {
  return request({
    url: '/user/create',
    method: 'post',
    baseURL:base['base'],
    data
  })
}

export function deleteUser(data) {
  return request({
    url: '/user/delete',
    method: 'post',
    baseURL:base['base'],
    data
  })
}
