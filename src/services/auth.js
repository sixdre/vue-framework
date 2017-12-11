import setting from '@/config/setting'

export default {
  login (data) {
    sessionStorage.setItem(setting.userToken, data);
  },
  setRole(data) {
    sessionStorage.setItem('role', data)
  },
  getRole() {
    return sessionStorage.getItem('role')
  },
  authenticated () {
    var t = sessionStorage.getItem(setting.userToken)
    return t && t.length > 0
  },
  authenticatedUid () {
    var t = sessionStorage.getItem(setting.uid)
    return t && t.length > 0
  },
  getToken () {
    return sessionStorage.getItem(setting.userToken)
  },
  getUid () {
    return sessionStorage.getItem(setting.uid)
  },
  logout () {
    sessionStorage.removeItem(setting.userToken)
  }
}
