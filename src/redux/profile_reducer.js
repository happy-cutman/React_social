import {profileAPI} from '../api/api';

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE'; // используем константы чтобы не использовать строки и не опечататься
const SET_USER_STATUS = 'SET_USER_STATUS';
const DELETE_POST = 'DELETE_POST';

let initialState = {  // не имеем права изменять этот объект поэтому делаем копию в reducer и меняем копию
    posts: [
        {id: '1', message: 'Hello. It is me', like: '31'},
        {id: '2', message: 'Hi, darling', like: '5'},
        {id: '3', message: 'Wonderful life', like: '12'},
        {id: '4', message: 'Arom dom dom', like: '1'},
    ],
    profile: null,
    status: ''
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

// thunk creator
export const getUserProfile = (userId) => {
    return (dispatch) => {

        profileAPI.getProfile(userId)
            .then(response => {
                dispatch(setUserProfile(response.data))
            });
    }
};

// User Status set and update
export const getUserStatus = (userId) => {
    return (dispatch) => {

        profileAPI.getStatus(userId)
            .then(response => {
                return dispatch(setUserStatus(response.data)) // response.data приходит строка со статусом
            });
    }
};
export const updateUserStatus = (status) => {
    return (dispatch) => {
        profileAPI.updateStatus(status)
            .then( response => {
                if (response.data.resultCode === 0) {
                    dispatch(setUserStatus(status))
                }
            })
    }
};

export default profileReducer;