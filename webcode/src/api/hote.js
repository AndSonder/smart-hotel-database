import request from '@/utils/request'

export function getHotelInfo(token) {
  return request({
    url: 'http://127.0.0.1:5000/hotel/info',
    method: 'get',
    params: { token }
  })
}
