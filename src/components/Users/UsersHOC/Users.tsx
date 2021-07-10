import React from 'react';
import s from './Users.module.css';
import userPhoto from '../../../imgs/Users/5.png';
import {NavLink} from "react-router-dom";
import Paginator from "../../common/Paginator/Paginator";
import {UserType} from "../../../types/types";
import UsersSearchForm from "./UsersSearchForm";
import {FilterType} from "../../../Redux/users-reducer";

type PropsType = {
    onPageChange: (pageNumber: number) => void
    onFilterChanged: (filter: FilterType) => void
    currentPage: number
    pageSize: number
    totalUsersCount: number
    users: Array<UserType>
    isFollowToggling: Array<number>
    unfollow: (id: number) => void
    follow: (id: number) => void
    title: string
}

let Users: React.FC<PropsType> = ({onPageChange, onFilterChanged, currentPage, pageSize, totalUsersCount,
                 users, isFollowToggling, unfollow, follow, title}) => {

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
                                                      unfollow(u.id)
                                                  }}>Unfollow</button>
                                : <button disabled={isFollowToggling.some(id => id === u.id)}
                                          onClick={() => {
                                              follow(u.id)
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