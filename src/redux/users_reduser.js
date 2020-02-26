const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';


const initialState = {
    users : [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
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

        default:
            return state;
    }
};

export const followAC = (userId) => ({ type: FOLLOW, userId }); // AC - action creator
export const unfollowAC = (userId) => ({ type: UNFOLLOW, userId });
export const setUsersAC = (users) => ({ type: SET_USERS, users }); // users придёт с сервера и мы их добавим в state
export const setCurrentPageAC = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage});
export const setUsersTotalCountAC = (totalUsersCount) => ({type: SET_TOTAL_USERS_COUNT, totalUsersCount});

export default usersReducer;