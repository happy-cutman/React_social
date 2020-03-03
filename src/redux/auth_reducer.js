import {authAPI} from '../api/api';

const SET_USER_DATA = 'SET_USER_DATA';

let inintialState = {
    id: null,
    login: null,
    email: null,
    // isFetching: false
    isAuth: false
};

const authReducer = (state = inintialState, action) => {

    switch (action.type) {

        case SET_USER_DATA:
            return {
                ...state,
                ...action.data, // id, email, login перезатрут те которые сидят в state
                isAuth: true
            };

        default:
            return state;
    }
};

export const setAuthUserData = (id, login, email) => ( {type: SET_USER_DATA, data:{id, login, email}} );

export const getAuthUserData = () => {
    return (dispatch) => {
        authAPI.authMe() // делает запрос на сервер
            .then(response => {
                if (response.data.resultCode === 0) { // если залогинен проверка, resultCode === 0 значит залогтнен
                    let {id, login, email} = response.data.data; // из ответа сервера достали данные
                    dispatch(setAuthUserData(id, login, email)) // отправили action в диспатч
                }
            })
    }
};

export default authReducer;