import {combineReducers, createStore} from 'redux';
import profileReducer from './profile_reducer';
import messagesReducer from './messages_reducer';
import sideBarReducer from './sidebar_reducer';
import usersReducer from './users_reduser';


let reducers = combineReducers({ // воспринимать как state
    profilePage: profileReducer, // profilePage - ветки нашёго store, profilePage обслуживается profileReducer'ом
    messagesPage: messagesReducer,
    sideBar: sideBarReducer,
    usersPage: usersReducer
});

let store = createStore(reducers);

window.store = store;

export default store;