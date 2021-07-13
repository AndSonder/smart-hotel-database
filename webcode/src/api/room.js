import request from '@/utils/request'

export function fetchRoomList(query) {
  return request({
    url: 'http://127.0.0.1:5000/room/list',
    method: 'get',
    params: query
  })
}

export function updateRoom(data) {
  return request({
    url: 'http://127.0.0.1:5000/room/update',
    method: 'post',
    data
  })
}

export function createRoom(data) {
  return request({
    url: 'http://127.0.0.1:5000/room/create',
    method: 'post',
    data
  })
}

export function deleteRoom(data) {
  return request({
    url: 'http://127.0.0.1:5000/room/delete',
    method: 'post',
    data
  })
}
