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

export default authReducer;