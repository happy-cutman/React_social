import * as axios from 'axios'


const instance = axios.create({ // нужен для обобщения настроек и использования их дальше
    withCredentials:true, // withCredentials инфа о том, что авторизованы
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
    },
    follow(userId) {
        return instance.post(`follow/${userId}`, {}) // instance хранит withCredentials, baseURL, headers: API-KEY
            .then(response => {
                return response.data
            })
    },
    unfollow(userId) {
        return instance.delete(`follow/${userId}`, {}) // instance хранит withCredentials, baseURL, headers: API-KEY
            .then(response => {
                return response.data
            })
    }
};

export const profileAPI = {
    getProfile(userId) {
        return instance.get(`profile/${userId}`)
    },
    getStatus(userId) {
        return instance.get(`profile/status/${userId}`)
    },
    updateStatus(status) {
        return instance.put(`profile/status`, {status: status}) // отправляем на сервер объект со свойством статус, как требует документация
    }
};


export const authAPI = {
    authMe() {
        return instance.get('auth/me')
    },
    onLogin() {
        return instance.post('auth/login')
    }
};
