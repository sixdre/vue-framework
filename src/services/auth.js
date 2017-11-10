import setting from '@/config/setting'

export default {
  login (data) {
    localStorage.setItem(setting.userToken, data)
  },
  authenticated () {
    var t = localStorage.getItem(setting.userToken)
    return t && t.length > 0
  },
  authenticatedUid () {
    var t = localStorage.getItem(setting.uid)
    return t && t.length > 0
  },
  getToken () {
    return localStorage.getItem(setting.userToken)
  },
  getUid () {
    return localStorage.getItem(setting.uid)
  },
  logout () {
    localStorage.setItem(setting.userToken, '')
  }
}
