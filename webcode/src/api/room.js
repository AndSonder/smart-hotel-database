import request from '@/utils/request'
import base from '@/api/setting'

export function fetchRoomList(query) {
  return request({
    url: '/room/list',
    method: 'get', baseURL: base['base'],
    params: query
  })
}

export function updateRoom(data) {
  return request({
    url: '/room/update',
    method: 'post', baseURL: base['base'],
    data
  })
}

export function createRoom(data) {
  return request({
    url: '/room/create',
    method: 'post', baseURL: base['base'],
    data
  })
}

export function deleteRoom(data) {
  return request({
    url: '/room/delete',
    method: 'post', baseURL: base['base'],
    data
  })
}

export function fetchRoomGuest(query) {
  return request({
    url: '/room/guest',
    method: 'get', baseURL: base['base'],
    params: query
  })
}
