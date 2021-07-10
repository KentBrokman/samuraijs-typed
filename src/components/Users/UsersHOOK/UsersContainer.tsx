import React from 'react';
import {useSelector} from "react-redux";
import Users from "./Users";
import Preloader from "../../common/Preloader/Preloader";
import {
    getIsFetching
} from "../../../Redux/users-selectors";


type UsersPagePropsType = {
    title: string
}

export const UsersPage: React.FC<UsersPagePropsType> = (props) => {

    const isFetching = useSelector(getIsFetching)
    return <>
        {isFetching ? <Preloader /> : null}
        <Users
            title={props.title}
        />
    </>
}








