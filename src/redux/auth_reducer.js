import {authAPI} from '../api/api';
import {stopSubmit} from 'redux-form'; // это AC

const SET_USER_DATA = 'auth/SET_USER_DATA'; // названия нужно уникализировать

let inintialState = {
    userId: null,
    login: null,
    email: null,
    isAuth: false
};

const authReducer = (state = inintialState, action) => {

    switch (action.type) {

        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload // id, email, login перезатрут те которые сидят в state
            };

        default:
            return state;
    }
};

export const setAuthUserData = (userId, login, email, isAuth) => ( {type: SET_USER_DATA, payload: {userId, login, email, isAuth}} );

// export const getAuthUserData = () => {
//     return (dispatch) => {
//         return authAPI.authMe() // делает запрос на сервер
//             .then(response => {
//                 if (response.data.resultCode === 0) { // если залогинен проверка, resultCode === 0 значит залогтнен
//                     let {id, login, email} = response.data.data; // из ответа сервера достали данные
//                     dispatch(setAuthUserData(id, login, email, true)) // отправили action в диспатч
//                 }
//             })
//     }
// };

// async
export const getAuthUserData = () => async (dispatch) => {
    let response = await authAPI.authMe(); // делает запрос на сервер

        if (response.data.resultCode === 0) { // если залогинен проверка, resultCode === 0 значит залогтнен
            let {id, login, email} = response.data.data; // из ответа сервера достали данные
            dispatch(setAuthUserData(id, login, email, true)) // отправили action в диспатч
    }
};

export const login = (email, password, rememberMe) => async (dispatch) => {
    let response = await authAPI.onLogin(email, password, rememberMe);

        if (response.data.resultCode === 0) {
            dispatch(getAuthUserData())
        } else {
            let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'; // ошибка приходит с сервера
            dispatch(stopSubmit('login', {_error: message})); // stopSubmit - это AC
        }
};

export const logout = () => async (dispatch) => {
    let response = await authAPI.onLogout();

        if (response.data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false))
        }
};

export default authReducer;