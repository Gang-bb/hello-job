import request from '../request.js'

// 绑定手机号
export function xxx(data) {
  return request.service({
    path: 'api',
    method: 'post',
    data
  })
}
