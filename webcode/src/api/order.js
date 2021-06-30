import request from '@/utils/request'

export function fetchOrderList(query) {
  return request({
    url: 'http://127.0.0.1:5000/order/list',
    method: 'get',
    params: query
  })
}


