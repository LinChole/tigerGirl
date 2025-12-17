import axios from 'axios'
import { cors, devHost, proHost } from 'Config'
import Config from 'Config'
// import { getCookie } from './cookie.js'
const ipHost = process.env.NODE_ENV === 'development' ? Config.devHost : Config.proHost

export default function ({
  cmd,
  method = 'GET',
  type = 'json',
  data = {},
  header = {},
  fileList = []
}) {
  method = method.toUpperCase()
  type = type.toLowerCase()
  let option = {
    method,
    headers: {
      // 'Content-Type': `application/${type}`,
      // 'x-csrf-token': getCookie('x-csrf-token'),
      ...header
    }
  }
  if (fileList.length) {
    let formData = new FormData()
    option.headers['Content-Type'] = 'multipart/form-data'
    fileList.forEach((file) => {
      formData.append('files', file)
      // formData.append('files', file, file.name)
    })
    data = formData
  }
  switch (method) {
    case 'POST':
    case 'PUT':
    case 'FETCH':
    case 'DELETE':
      option.data = data
      break
    case 'GET':
      option.params = data
      break
  }
  return axios({
    method,
    url: cmd,
    baseURL: ipHost,
    // process.env.NODE_ENV === 'development' ? devHost : proHost,
    ...option,
    withCredentials: !!cors // 允許自動夾帶cookie
  }).then((res) => {
    return {
      ok: true, // res.statusText === 'OK',
      status: res.status,
      body: res.data
    }
  }).catch(err => {
    let res = err.response
    if (res) {
      return {
        ok: true, // res.statusText === 'OK',
        status: res.status,
        body: res.data
      }
    } else {
      return {
        ok: false,
        status: 404,
        body: err.message
      }
    }
  })
}
