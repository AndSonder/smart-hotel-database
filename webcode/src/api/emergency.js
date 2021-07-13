import request from '@/utils/request'


export function fetchEmergencyList(query) {
  return request({
    url: 'http://127.0.0.1:5000/emergency/list',
    method: 'get',
    params: query
  })
}

export function updateEmergency(data) {
  return request({
    url: 'http://127.0.0.1:5000/emergency/update',
    method: 'post',
    data
  })
}

export function createEmergency(data) {
  return request({
    url: 'http://127.0.0.1:5000/emergency/create',
    method: 'post',
    data
  })
}

export function deleteEmergency(data) {
  return request({
    url: 'http://127.0.0.1:5000/emergency/delete',
    method: 'post',
    data
  })
}
