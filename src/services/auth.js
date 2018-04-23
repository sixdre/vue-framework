import $storage from './storage'

export default {
    login(data) {
        $storage.user.setToken(data)
    },
    authenticated() {
        var t = $storage.user.getToken();
        return t && t.length > 0
    },
    logout() {
        $storage.user.setUserName(null)
        $storage.user.setToken(null)
        $storage.user.setAvatar(null)
    }
}