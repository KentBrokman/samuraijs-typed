import {createSelector} from "reselect";
import {AppStateType} from "./Redux-store";

const getUsersSelector = (state: AppStateType) => {
    return state.usersPage.users
}

export const getUsers = createSelector(getUsersSelector, (users) => {
    return users
})

export const getTotalUsersCount = (state: AppStateType) => {
    return state.usersPage.totalUsersCount
}
export const getPageSize = (state: AppStateType) => {
    return state.usersPage.pageSize
}
export const getCurrentPage = (state: AppStateType) => {
    return state.usersPage.currentPage
}
export const getIsFetching = (state: AppStateType) => {
    return state.usersPage.isFetching
}
export const getIsFollowToggling = (state: AppStateType) => {
    return state.usersPage.isFollowToggling
}
export const getUsersFilter = (state: AppStateType) => {
    return state.usersPage.filter
}