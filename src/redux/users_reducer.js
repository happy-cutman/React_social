import {usersAPI} from '../api/api';

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_FOLLOWING_PROGRESS = 'TOGGLE_FOLLOWING_PROGRESS';

const initialState = {
    users : [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true, // прелоадер
    followingInProgress: [] // делает кнопку неактивной
};



const usersReducer = (state = initialState, action) => {
    switch (action.type) {

        case FOLLOW:
            return {
                ...state,
                users: state.users.map( user => { // делаем копию users с помощью map
                    if (user.id === action.userId) { // если айди совпадают, тогда делаем копию изера которого нужно поменять и меняем followed
                        return {...user, followed: true}
                    }
                    return user
                } )
            };

        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map( user => { // делаем копию users с помощью map
                    if (user.id === action.userId) { // если айди совпадают, тогда делаем копию изера которого нужно поменять и меняем followed
                        return {...user, followed: false}
                    }
                    return user
                } )
            };

        case SET_USERS: // берём старый state, берём пользователей которые там были и перезатираем юзерами, которые пришли в action
            return { ...state, users: action.users };

        case SET_CURRENT_PAGE:
            return { ...state, currentPage: action.currentPage }; // делаем копию state и подменяем значение которое нужно

        case SET_TOTAL_USERS_COUNT:
            return { ...state, totalUsersCount: action.totalUsersCount };

        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching};

        case TOGGLE_FOLLOWING_PROGRESS:
            return {...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            };

        default:
            return state;
    }
};

// Action Creators action creator возвращает action
export const followSuccess = (userId) => ({ type: FOLLOW, userId });
export const unfollowSuccess = (userId) => ({ type: UNFOLLOW, userId });
export const setUsers = (users) => ({ type: SET_USERS, users }); // users придёт с сервера и мы их добавим в state
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage});
export const setTotalUsersCount = (totalUsersCount) => ({type: SET_TOTAL_USERS_COUNT, totalUsersCount});
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});
export const toggleFollowingProgress = (isFetching, userId) => ({type: TOGGLE_FOLLOWING_PROGRESS, isFetching, userId});

// Thunk Creators
export const getUsers = (currentPage, pageSize) => { // thunkCreator
    return (dispatch) => {

        dispatch(toggleIsFetching(true));

        usersAPI.getUsers(currentPage, pageSize).then(data => { // currentPage and PageSize берём из родительской функции благодаря замыканию и запрос на сервер идёт  используя эти значения
            dispatch(toggleIsFetching(false));
            dispatch(setUsers(data.items));
            dispatch(setTotalUsersCount(data.totalCount));
        });
    }
};
export const follow = (userId) => { // thunkCreator
    return (dispatch) => {

        dispatch(toggleFollowingProgress(true, userId));
        usersAPI.follow(userId)
            .then(data => {
                if (data.resultCode == 0) {
                    dispatch(followSuccess(userId))
                }
            });
        dispatch(toggleFollowingProgress(false, userId))
    }
};
export const unfollow = (userId) => {
    return (dispatch) => {

        dispatch(toggleFollowingProgress(true, userId));
        usersAPI.unfollow(userId)
            .then(data => {
                if (data.resultCode == 0) {
                    dispatch(unfollowSuccess(userId))
                }
            });
        dispatch(toggleFollowingProgress(false, userId))
    }
};

export default usersReducer;