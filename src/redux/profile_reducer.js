import * as axios from 'axios';
import {usersAPI} from '../api/api';

const ADD_POST = 'ADD-POST';
const UPDATE_POST = 'UPDATE-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE'; // используем константы чтобы не использовать строки и не опечататься

let initialState = {  // не имеем права изменять этот объект поэтому делаем копию в reducer и меняем копию
    posts: [
        {id: '1', message: 'Hello. It is me', like: '31'},
        {id: '2', message: 'Hi, darling', like: '5'},
        {id: '3', message: 'Wonderful life', like: '12'},
        {id: '4', message: 'Arom dom dom', like: '1'},
    ],
    newPostText: 'IT-Koshka',
    profile: null,
};


const profileReducer = (state = initialState, action) => { // изменяет state в ависимости от action и возвращает обновлённые state. Если state не приходит , то по умолчанию он InitialState
    switch (action.type) {
        case ADD_POST:
            return {
               ...state,
                posts: [...state.posts, {id: '5', message: state.newPostText, like: '0'}],
                newPostText: '',
            };

        case UPDATE_POST:
            return {
                ...state,
                newPostText: action.text,
            };

        case SET_USER_PROFILE:
            return {...state, profile: action.profile};

        default:
            return state; // если ничего не изменяется то возвращается просто state который и был
    }

};

export const addPostActionCreator = () => { // создаёт объект action вызывается в UI
    return {
        type: ADD_POST
    }
};
export const updatePostActionCreator = (text) => {
    return {
        type: UPDATE_POST,
        text: text,
    }
};
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});

export const getUserProfile = (userId) => {
    return (dispatch) => {

        usersAPI.getProfile(userId)
            .then(response => {
                dispatch(setUserProfile(response.data))
            });
    }
};

export default profileReducer;