import * as axios from 'axios'


const instance = axios.create({ // нужен для обобщения настроек и использования их дальше
    withCredentials:true, // withCredentials инфа о том, что авторизованы
    headers: {
        'API-KEY': '50ee7b11-4e09-4969-b463-b202a33d828b'
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
    },
    saveUserAvatar(photoFile) {
        let formData = new FormData();
        formData.append('image', photoFile);

        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
};


export const authAPI = {
    authMe() {
        return instance.get('auth/me')
    },
    onLogin(email, password, rememberMe = false) {
        return instance.post('auth/login', {email, password, rememberMe})
    },
    onLogout() {
        return instance.delete('auth/login')
    }
};

