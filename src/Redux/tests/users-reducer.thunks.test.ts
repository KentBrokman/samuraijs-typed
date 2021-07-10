import {actions, follow, unfollow} from "../users-reducer";
import {usersApi} from "../../api/users-api";
import {APIResponseType, ResultCodesType} from "../../api/api";

jest.mock("../../api/users-api")
const userApiMock = usersApi as jest.Mocked<typeof usersApi>

const result: APIResponseType = {
    resultCode: ResultCodesType.Successful,
    messages: [],
    data: {}
}

userApiMock.follow.mockReturnValue(Promise.resolve(result))
userApiMock.unfollow.mockReturnValue(Promise.resolve(result))

const dispatchMock = jest.fn()
const getStateMock = jest.fn()

beforeEach(() => {
    dispatchMock.mockClear()
    getStateMock.mockClear()
})

test('success follow thunk', async () => {
    const thunk = follow(1)
    
    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)

    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.followIsToggling(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccessed(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.followIsToggling(false, 1))
})

test('success unfollow thunk', async () => {
    const thunk = unfollow(1)

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)

    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.followIsToggling(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollowSuccessed(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.followIsToggling(false, 1))
})

