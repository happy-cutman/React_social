import {applyMiddleware, combineReducers, createStore} from 'redux';
import profileReducer from './profile_reducer';
import messagesReducer from './messages_reducer';
import sideBarReducer from './sidebar_reducer';
import usersReducer from './users_reducer';
import authReducer from './auth_reducer';
import thunkMiddleware from 'redux-thunk';


let reducers = combineReducers({ // воспринимать как state
    profilePage: profileReducer, // profilePage - ветки нашёго store, profilePage обслуживается profileReducer'ом
    messagesPage: messagesReducer,
    sideBar: sideBarReducer,
    usersPage: usersReducer,
    auth: authReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware)); // applyMiddleware для создания доп слоя для санок чтобы в store можно было диспатчить функции

window.store = store;

export default store;