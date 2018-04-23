import $http from '@/services/http'

export const test = (username, password) => { 
    return new Promise(function (resolve, reject) {
        resolve({
            data: {
                code: 200,
                username: '111',
                token: '1wsqs1w11w13w1wdfreg43424',
                avatar:'1111111111111'
            }
        })
    })
 }


//登录
export const login = (username, password) => { return $http.post('/api/login', { username, password }) }

