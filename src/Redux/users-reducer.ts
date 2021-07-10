import {updateObjectInArray} from "../utils/object-helpers";
import {UserType} from "../types/types";
import {AppStateType, BaseThunkType, InferActionsTypes} from "./Redux-store";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {ActionTypes} from "redux-form";
import {usersApi} from "../api/users-api";
import {APIResponseType} from "../api/api";

let initialState = {
    users: [] as Array<UserType>,
    totalUsersCount: 54,
    pageSize: 6,
    currentPage: 1,
    isFetching: false,
    isFollowToggling: [] as Array<number>,
    filter: {
        term: '',
        friend: null as null | boolean
    }
};


const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'FOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.id, 'id', {followed: true})
                //     state.users.map(user => {
                //     if (user.id === action.id) {
                //         return {
                //             ...user,
                //             followed: true
                //         }
                //     }
                //     return user
                // })
            }
        case 'UNFOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.id, 'id', {followed: false})
                // users: state.users.map(user => {
                //     if (user.id === action.id) {
                //         return {
                //             ...user,
                //             followed: false
                //         }
                //     }
                //     return user
                // })
            }
        case 'SET_USERS':
            return {
                ...state,
                users: [...action.users]
            }
        case "SET_TOTAL_USERS_COUNT":
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            }
        case 'SET_CURRENT_PAGE':
            return {
                ...state,
                currentPage: action.currentPage
            }
        case 'TOGGLE_IS_FETCHING':
            return {
                ...state,
                isFetching: action.isFetching
            }
        case 'FOLLOW_IS_TOGGLING':
            return {
                ...state,
                isFollowToggling: action.isFetching
                    ? [...state.isFollowToggling, action.id]
                    : state.isFollowToggling.filter(id => id !== action.id)
            }
        case "SET_FILTER":
            return {
                ...state,
                filter: action.payload
            }
        default:
            return state;
    }

}


export const actions = {
    followSuccessed: (id: number) => ({type: "FOLLOW", id: id} as const),
    unfollowSuccessed: (id: number) => ({type: "UNFOLLOW", id: id} as const),
    setUsers: (users: Array<UserType>) => ({type: "SET_USERS", users: users} as const),
    setTotalUsersCount: (totalUsersCount: number) => ({type: "SET_TOTAL_USERS_COUNT", totalUsersCount: totalUsersCount} as const),
    setCurrentPage: (currentPage: number) => ({type: "SET_CURRENT_PAGE", currentPage: currentPage} as const),
    setFilter: (filter: FilterType) => ({type: "SET_FILTER", payload: filter} as const),
    toggleIsFetching: (isFetching: boolean) => ({type: "TOGGLE_IS_FETCHING", isFetching} as const),
    followIsToggling: (isFetching: boolean, id: number) => ({type: "FOLLOW_IS_TOGGLING", isFetching, id} as const)
}



// export let requestUsers = (page: number, pageSize: number) => {
//     return async (dispatch: Dispatch<ActionsTypes>, getState: () => AppStateType) => {
//         dispatch(toggleIsFetching(true));
//         dispatch(setCurrentPage(page))
//         let data = await usersApi.getUsers(page, pageSize)
//
//         dispatch(toggleIsFetching(false));
//         dispatch(setUsers(data.items))
//         dispatch(setTotalUsersCount(data.totalCount))
//     }
// }


export let requestUsers = (page: number, pageSize: number, filter: FilterType): ThunkType => {
    return async (dispatch, getState) => {
        dispatch(actions.toggleIsFetching(true));
        dispatch(actions.setCurrentPage(page))
        dispatch(actions.setFilter(filter))

        let data = await usersApi.getUsers(page, pageSize, filter.term, filter.friend)
        dispatch(actions.toggleIsFetching(false));
        dispatch(actions.setUsers(data.items))
        dispatch(actions.setTotalUsersCount(data.totalCount))
    }
}

type DispatchType = Dispatch<ActionsTypes>

const _followUnfollowFlow = async (dispatch: DispatchType, userId: number, apiMethod: (id: number) => Promise<APIResponseType>, actionCreator: any) => {
    dispatch(actions.followIsToggling(true, userId))
    let data = await apiMethod(userId)

    if (data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(actions.followIsToggling(false, userId))
}

export let follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        await _followUnfollowFlow(dispatch, userId, usersApi.follow.bind(usersApi), actions.followSuccessed)
    }
}
export let unfollow = (userId: number): ThunkType => {
    return async (dispatch: DispatchType) => {
        await _followUnfollowFlow(dispatch, userId, usersApi.unfollow.bind(usersApi), actions.unfollowSuccessed)
    }
}

export default usersReducer;

type ActionsTypes = InferActionsTypes<typeof actions>
export type InitialStateType = typeof initialState
export type FilterType = typeof initialState.filter
type ThunkType = BaseThunkType<ActionsTypes>