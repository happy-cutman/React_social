import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import profileReducer from './profile_reducer';
import messagesReducer from './messages_reducer';
import sideBarReducer from './sidebar_reducer';
import usersReducer from './users_reducer';
import authReducer from './auth_reducer';
import thunkMiddleware from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';
import appReducer from './app_reducer';


let reducers = combineReducers({ // воспринимать как state
    profilePage: profileReducer, // profilePage - ветки нашёго store, profilePage обслуживается profileReducer'ом
    messagesPage: messagesReducer,
    sideBar: sideBarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer,
});

// код для расширения redux chrome
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));
////

// let store = createStore(reducers, applyMiddleware(thunkMiddleware)); // applyMiddleware для создания доп слоя для санок чтобы в store можно было диспатчить функции

window.__store__ = store;

export default store;