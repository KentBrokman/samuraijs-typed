import React, {useEffect} from 'react';
import s from './Users.module.css';
import userPhoto from '../../../imgs/Users/5.png';
import {NavLink, useHistory} from "react-router-dom";
import Paginator from "../../common/Paginator/Paginator";
import {UserType} from "../../../types/types";
import UsersSearchForm from "./UsersSearchForm";
import {FilterType, follow, requestUsers, unfollow} from "../../../Redux/users-reducer";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPage, getIsFollowToggling,
    getPageSize,
    getTotalUsersCount,
    getUsers,
    getUsersFilter
} from "../../../Redux/users-selectors";
import * as queryString from "querystring";

type PropsType = {
    title: string
}

type QueryParamsType = { page?: string; term?: string; friend?: string };
let Users: React.FC<PropsType> = ({title}) => {
    const users = useSelector(getUsers)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const isFollowToggling = useSelector(getIsFollowToggling)

    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        const parsed = queryString.parse(history.location.search.substring(1)) as QueryParamsType

        let actualPage = currentPage
        let actualFilter = filter

        if (parsed.page) actualPage = Number(parsed.page)
        if (parsed.term) actualFilter = {...actualFilter, term: parsed.term}
        switch (parsed.friend) {
            case 'null':
                actualFilter = {...actualFilter, friend: null}
                break
            case 'false':
                actualFilter = {...actualFilter, friend: false}
                break
            case 'true':
                actualFilter = {...actualFilter, friend: true}
                break
        }
        dispatch(requestUsers(actualPage, pageSize, actualFilter))
    }, [])
    useEffect(() => {
        const query: QueryParamsType = {}
        if (filter.term) query.term = filter.term
        if (filter.friend !== null) query.friend = String(filter.friend)
        if (currentPage !== 1) query.page = String(currentPage)
        history.push({
            pathname: '/users',
            search: queryString.stringify(query)
        })
    }, [filter, currentPage])

    const onPageChange = (p: number) => {
        dispatch(requestUsers(p, pageSize, filter))
    }
    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter))
    }
    const followUser = (id: number) => {
        dispatch(follow(id))
    }
    const unfollowUser = (id: number) => {
        dispatch(unfollow(id))
    }

    return (
        <div className={s.users}>
            <h1>{title}</h1>
            <UsersSearchForm onFilterChanged={onFilterChanged}/>
            <div>
                <Paginator onPageChange={onPageChange}
                           currentPage={currentPage}
                           pageSize={pageSize}
                           totalUsersCount={totalUsersCount}
                />
            </div>
            {
                users.map(u => <div key={u.id} className={s.users}>
                    <div className={s.image}>
                        <NavLink to={`/profile/${u.id}`}>
                            <img src={u.photos.small !== null ? u.photos.small : userPhoto}/>
                        </NavLink>
                        <div>
                            {u.followed ? <button disabled={isFollowToggling.some(id => id === u.id)}
                                                  onClick={() => {
                                                      unfollowUser(u.id)
                                                  }}>Unfollow</button>
                                : <button disabled={isFollowToggling.some(id => id === u.id)}
                                          onClick={() => {
                                              followUser(u.id)
                                          }}>Follow</button>}
                        </div>
                    </div>
                    <div className={s.info}>
                        <div className={s.nameAndStatus}>
                            <div className={s.name}>{u.name}</div>
                        </div>
                    </div>
                </div>)
            }
        </div>
    )


}

export default Users;