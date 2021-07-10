import React from 'react';
import s from './Friends.module.css';
import FriendsItem from "./FriendsItem/FriendsItem";
import {FriendType} from "../../../Redux/sidebar-reducer";


export type FriendsPropsType = {
    friends: Array<FriendType>
}

const Friends: React.FC<FriendsPropsType> = (props) => {

    let friendsItems = props.friends.map( m => <FriendsItem name={m.name} id={m.id} key={m.id} />);

    return (
        <div className={s.friends}>
            <div className={s.title}>
                <h3>Friends</h3>
            </div>
            <div className={s.friendsItem}>
                {friendsItems}
            </div>
        </div>
    );
}

export default Friends;