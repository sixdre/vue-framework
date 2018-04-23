export default {
    user: {
        setToken(data) {
            if (data) {
                sessionStorage.setItem('tk', data);
            } else {
                sessionStorage.removeItem('tk')
            }
        },
        getToken() {
            return sessionStorage.getItem('tk')
        },
        setUserName(data) {
            if (data) {
                sessionStorage.setItem('userName', data)
            } else {
                 sessionStorage.removeItem('userName')
            }
        },
        getUserName() {
            return sessionStorage.getItem('userName')
        },
        setAvatar(data) {
            if (data) {
                sessionStorage.setItem('avatar', data)
            } else {
                sessionStorage.removeItem('avatar')
            }
        },
        getAvatar(data) {
           return sessionStorage.getItem('avatar')
        },

    }
   
}