import {usersAPI} from '../api/api';
import {updateObjectInArray} from '../utils/object-helpers';

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_FOLLOWING_PROGRESS = 'TOGGLE_FOLLOWING_PROGRESS';

const initialState = {
    users : [],
    pageSize: 10,
    totalItemsCount: 0,
    currentPage: 1,
    isFetching: true, // прелоадер
    followingInProgress: [] // делает кнопку неактивной
};



const usersReducer = (state = initialState, action) => {
    switch (action.type) {

        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: true})
                // users: state.users.map( user => { // делаем копию users с помощью map
                //     if (user.id === action.userId) { // если айди совпадают, тогда делаем копию изера которого нужно поменять и меняем followed
                //         return {...user, followed: true}
                //     }
                //     return user
                // })
            };

        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: false})
                // users: state.users.map( user => { // делаем копию users с помощью map
                //     if (user.id === action.userId) { // если айди совпадают, тогда делаем копию изера которого нужно поменять и меняем followed
                //         return {...user, followed: false}
                //     }
                //     return user
                // })
            };

        case SET_USERS: // берём старый state, берём пользователей которые там были и перезатираем юзерами, которые пришли в action
            return { ...state, users: action.users };

        case SET_CURRENT_PAGE:
            return { ...state, currentPage: action.currentPage }; // делаем копию state и подменяем значение которое нужно

        case SET_TOTAL_USERS_COUNT:
            return { ...state, totalItemsCount: action.totalItemsCount };

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
export const setTotalItemsCount = (totalItemsCount) => ({type: SET_TOTAL_USERS_COUNT, totalItemsCount});
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});
export const toggleFollowingProgress = (isFetching, userId) => ({type: TOGGLE_FOLLOWING_PROGRESS, isFetching, userId});

// Thunk Creators
export const getUsers = (currentPage, pageSize) => async (dispatch) => {

    dispatch(toggleIsFetching(true));

    let data = await usersAPI.getUsers(currentPage, pageSize); // currentPage and PageSize берём из родительской функции благодаря замыканию и запрос на сервер идёт  используя эти значения

    dispatch(toggleIsFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setTotalItemsCount(data.totalCount));
};


// FOLLOW UNFOLLOW до рефакторинга
// export const follow = (userId) => { // thunkCreator
//     return async (dispatch) => {
//
//         dispatch(toggleFollowingProgress(true, userId));
//
//         let data = await usersAPI.follow(userId);
//         if (data.resultCode == 0) {
//             dispatch(followSuccess(userId))
//         }
//
//         dispatch(toggleFollowingProgress(false, userId))
//     }
// };
//
//
// export const unfollow = (userId) => {
//     return async (dispatch) => {
//
//         dispatch(toggleFollowingProgress(true, userId));
//
//         let data = await usersAPI.unfollow(userId);
//         if (data.resultCode == 0) {
//             dispatch(unfollowSuccess(userId))
//         }
//
//         dispatch(toggleFollowingProgress(false, userId))
//     }
// };

// FOLLOW UNFOLLOW после рефакторинга
const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
    dispatch(toggleFollowingProgress(true, userId));

    let data = await apiMethod(userId);

    if (data.resultCode == 0) {
        dispatch(actionCreator(userId))
    }

    dispatch(toggleFollowingProgress(false, userId))
};

export const follow = (userId) => { // thunkCreator
    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess)
    }
};

export const unfollow = (userId) => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess)
    }
};


export default usersReducer;