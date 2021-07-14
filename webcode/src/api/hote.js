import request from '@/utils/request'
import base from '@/api/setting'

export function getHotelInfo(token) {
  return request({
    url: '/hotel/info',
    method: 'get',
    baseURL: base['base'],
    params: { token }
  })
}

export function getHotelChart(data) {
  return request({
    url: '/hotel/chart',
    method: 'get',
    baseURL: base['base'],
    params: data
  })
}
