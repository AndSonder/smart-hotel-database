import request from '@/utils/request'
import base from '@/api/setting'

export function fetchOrderList(query) {
  return request({
    url: '/order/list',
    method: 'get',
    baseURL: base['base'],
    params: query
  })
}

export function recordOrderCheck(data) {
  return request({
    url: '/order/check',
    method: 'get',
    baseURL: base['base'],
    params: data
  })
}

export function updateOrder(data) {
  return request({
    url: '/order/update',
    method: 'post',
    baseURL: base['base'],
    data
  })
}

export function deleteOrder(data) {
  return request({
    url: '/order/delete',
    method: 'post',
    baseURL: base['base'],
    data
  })
}
