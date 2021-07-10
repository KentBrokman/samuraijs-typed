import {APIResponseType, instance, ResultCodesType} from "./api";
import {UserType} from "../types/types";

type GetUsersApiType = {
    items: Array<UserType>
    totalCount: number
    error: string
}

export const usersApi = {
    getUsers(currentPage: number, pageSize: number, term: string = '', friend: null | boolean = null) {
        return instance.get<GetUsersApiType>(`users?page=${currentPage}&count=${pageSize}&term=${term}`
        + (friend === null ? '' : `&friend=${friend}`))
            .then(response => response.data)
    },
    follow(id: number) {
        return instance.post<APIResponseType>(`follow/${id}`)
            .then(response => response.data)
    },
    unfollow(id: number) {
        return instance.delete<APIResponseType>(`follow/${id}`)
            .then(response => response.data)
    }

}