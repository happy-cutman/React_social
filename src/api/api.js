import * as axios from 'axios'

const instance = axios.create({ // нужен для обобщения настроек и использования их дальше
    withCredentials:true,
    headers: {
        'API-KEY': '0e21d7f1-f5bd-4558-986a-248392e18716'
    },
    baseURL: 'https://social-network.samuraijs.com/api/1.0/'
});

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            })
    }
};

export const followAPI = {
    // при POST вторым параметром передаём пустой объект
    requestFollow(userId) {
        return instance.post(`follow/${userId}`, {}) // instance хранит withCredentials, baseURL, headers: API-KEY
            .then(response => {
                return response.data
        })
    },

    requestUnFollow(userId) {
        return instance.delete(`follow/${userId}`)
            .then(response => {
                return response.data
        })
    }
};

export const authAPI = {
    authMe(isAuth) {
        return instance.get('auth/me') // withCredentials инфа о том, что авторизованы
            .then(response => {
                return response.data
            })
    }
};

