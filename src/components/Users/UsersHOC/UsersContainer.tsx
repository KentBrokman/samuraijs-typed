import React from 'react';
import {connect} from "react-redux";
import {
    follow,
    unfollow,
    requestUsers, FilterType
} from "../../../Redux/users-reducer";
import Users from "./Users";
import Preloader from "../../common/Preloader/Preloader";
import {
    getCurrentPage,
    getIsFetching,
    getIsFollowToggling,
    getPageSize,
    getTotalUsersCount,
    getUsers, getUsersFilter
} from "../../../Redux/users-selectors";
import {UserType} from "../../../types/types";
import {AppStateType} from "../../../Redux/Redux-store";

type MapStatePropsType = {
    currentPage: number
    pageSize: number
    isFetching: boolean
    totalUsersCount: number
    users: Array<UserType>
    isFollowToggling: Array<number>
    filter: FilterType
}
type MapDispatchPropsType = {
    requestUsers: (currentPage: number, pageSize: number, filter: FilterType) => void
    unfollow: (id: number) => void
    follow: (id: number) => void
}
type OwnPropsType = {
    title: string
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class UsersContainer extends React.Component<PropsType> {

    componentDidMount() {
        this.props.requestUsers(this.props.currentPage, this.props.pageSize, this.props.filter)
    }

    onPageChange = (p: number) => {
        this.props.requestUsers(p, this.props.pageSize, this.props.filter)
    }

    onFilterChanged = (filter: FilterType) => {
        const {pageSize} = this.props
        this.props.requestUsers(1, pageSize, filter)
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader /> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                      pageSize={this.props.pageSize}
                      onPageChange={this.onPageChange}
                      onFilterChanged={this.onFilterChanged}
                      currentPage={this.props.currentPage}
                      users={this.props.users}
                      unfollow={this.props.unfollow}
                      follow={this.props.follow}
                      isFollowToggling={this.props.isFollowToggling}
                      title={this.props.title}
            />
        </>
    }


}

// let mapStateToProps = (state) => {
//     return {
//         users: state.usersPage.users,
//         totalUsersCount: state.usersPage.totalUsersCount,
//         pageSize: state.usersPage.pageSize,
//         currentPage: state.usersPage.currentPage,
//         isFetching: state.usersPage.isFetching,
//         isFollowToggling: state.usersPage.isFollowToggling
//     }
// }

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: getUsers(state),
        totalUsersCount: getTotalUsersCount(state),
        pageSize: getPageSize(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        isFollowToggling: getIsFollowToggling(state),
        filter: getUsersFilter(state)
    }
}

// <TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultState>
export default connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
    follow,
    unfollow,
    requestUsers
})(UsersContainer);

