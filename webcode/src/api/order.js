import request from '@/utils/request'

export function fetchOrderList(query) {
  return request({
    url: 'http://127.0.0.1:5000/order/list',
    method: 'get',
    params: query
  })
}

export function recordOrderCheck(data) {
  return request({
    url: 'http://127.0.0.1:5000/order/check',
    method: 'get',
    params: data
  })
}

export function updateOrder(data) {
  return request({
    url: 'http://127.0.0.1:5000/order/update',
    method: 'post',
    data
  })
}

export function deleteOrder(data) {
  return request({
    url: 'http://127.0.0.1:5000/order/delete',
    method: 'post',
    data
  })
}
