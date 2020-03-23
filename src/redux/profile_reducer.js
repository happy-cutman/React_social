import {profileAPI} from '../api/api';
import {stopSubmit} from 'redux-form';

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE'; // используем константы чтобы не использовать строки и не опечататься
const SET_USER_STATUS = 'SET_USER_STATUS';
const DELETE_POST = 'DELETE_POST';
const SET_USER_AVATAR = 'SET_USER_AVATAR';

let initialState = {  // не имеем права изменять этот объект поэтому делаем копию в reducer и меняем копию
    posts: [
        {id: '1', message: 'Hello. It is me', like: '31'},
        {id: '2', message: 'Hi, darling', like: '5'},
        {id: '3', message: 'Wonderful life', like: '12'},
        {id: '4', message: 'Arom dom dom', like: '1'},
    ],
    profile: null,
    status: '',
};


const profileReducer = (state = initialState, action) => { // изменяет state в ависимости от action и возвращает обновлённые state. Если state не приходит , то по умолчанию он InitialState
    switch (action.type) {

        case ADD_POST:
            return {
               ...state,
                posts: [...state.posts, {id: '5', message: action.newPostText, like: '0'}],
            };

        case SET_USER_PROFILE:
            return {...state, profile: action.profile};

        case SET_USER_STATUS:
            return {...state, status: action.status};

        case SET_USER_AVATAR:
            return {...state, profile: {...state.profile, photos: action.photos}};

        case DELETE_POST:
            return {...state,
                    posts: state.posts.filter(post => post.id != action.postId)};

        default:
            return state; // если ничего не изменяется то возвращается просто state который и был
    }

};

// export const addPostActionCreator = (newPostText) => { // создаёт объект action вызывается в UI
//     return {
//         type: ADD_POST,
//         newPostText
//     }
// };

export const addPostActionCreator = (newPostText) => ({type: ADD_POST, newPostText});
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});
export const setUserStatus = (status) => ({type: SET_USER_STATUS, status});
export const deletePost = (postId) => ({type: DELETE_POST, postId});
export const setUserAvatar = (photos) => ({type: SET_USER_AVATAR, photos}); // photos потому что сервер возвращает массив photos после успешной заливки

// thunk creator
export const getUserProfile = (userId) => async (dispatch) => {
    const response = await profileAPI.getProfile(userId);
    dispatch(setUserProfile(response.data))
};

// save user avatar come from <ProfileInfo/>
export const saveUserAvatar = (file) => async (dispatch) => {
    const response = await profileAPI.saveUserAvatar(file);

    if (response.data.resultCode === 0) {
        dispatch(setUserAvatar(response.data.data.photos))
    }
};

// диспатч санки, которая получает профиль с сервера, который обновился.  укажет ошибку именно для поля фейсбук {'contacts': {'facebook': response.data.messages[0]}}
export const saveProfile = (profile) => async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const response = await profileAPI.saveUserProfile(profile);

    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userId))
    } else {
        dispatch(stopSubmit('edit_profile', {_error: response.data.messages[0]}));
        return Promise.reject(response.data.messages[0]);
    }
};

// User Status set and update
export const getUserStatus = (userId) => async (dispatch) => {
    const response = await profileAPI.getStatus(userId);
    return dispatch(setUserStatus(response.data)) // response.data приходит строка со статусом
};

export const updateUserStatus = (status) => async (dispatch) => {
    const response = await profileAPI.updateStatus(status);
    if (response.data.resultCode === 0) {
        dispatch(setUserStatus(status))
    }
};

export default profileReducer;