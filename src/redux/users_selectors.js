import {createSelector} from 'reselect'

const getUsersSimpleSelector = (state) => {
    return state.usersPage.users
};

// сложный селектор работает на основе простых
export const getUsers = createSelector(getUsersSimpleSelector, (users) => { // getUsers вернёт users и закидываем users в (users)
    return users.filter(u => true)
});


export const getPageSize = (state) => {
    return state.usersPage.pageSize
};

export const getTotalUsersCount = (state) => {
    return state.usersPage.totalUsersCount
};

export const getCurrentPage = (state) => {
    return state.usersPage.currentPage
};

export const getIsFetching = (state) => {
    return state.usersPage.isFetching
};

export const getFollowingProgress = (state) => {
    return state.usersPage.followingInProgress
};