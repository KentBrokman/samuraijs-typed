import usersReducer, {actions, InitialStateType} from "../users-reducer";
import {UserType} from "../../types/types";


let state: InitialStateType

beforeEach(() => {
    state = {
        users: [
            {id: 0, name: 'Ivan 0', followed: false, photos: {large: null, small: null}, status: 'Status 0'},
            {id: 1, name: 'Ivan 1', followed: false, photos: {large: null, small: null}, status: 'Status 1'},
            {id: 2, name: 'Ivan 2', followed: true, photos: {large: null, small: null}, status: 'Status 2'},
            {id: 3, name: 'Ivan 3', followed: true, photos: {large: null, small: null}, status: 'Status 3'},
        ],
        totalUsersCount: 54,
        pageSize: 6,
        currentPage: 1,
        isFetching: false,
        isFollowToggling: []
    }
})

test('follow success', () => {
    const newState = usersReducer(state, actions.followSuccessed(1))

    expect(newState.users[0].followed).toBeFalsy()
    expect(newState.users[1].followed).toBeTruthy()
});

test('unfollow success', () => {
    const newState = usersReducer(state, actions.unfollowSuccessed(3))

    expect(newState.users[2].followed).toBeTruthy()
    expect(newState.users[3].followed).toBeFalsy()
});