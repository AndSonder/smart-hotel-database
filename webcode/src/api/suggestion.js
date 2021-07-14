import request from '@/utils/request'
import base from '@/api/setting'

export function fetchSuggestionList(query) {
  return request({
    url: '/suggestion/list',
    method: 'get', baseURL: base['base'],
    params: query
  })
}

export function updateSuggestion(data) {
  return request({
    url: '/suggestion/update',
    method: 'post', baseURL: base['base'],
    data
  })
}

export function createSuggestion(data) {
  return request({
    url: '/suggestion/create',
    method: 'post', baseURL: base['base'],
    data
  })
}

export function deleteSuggestion(data) {
  return request({
    url: '/suggestion/delete',
    method: 'post', baseURL: base['base'],
    data
  })
}
