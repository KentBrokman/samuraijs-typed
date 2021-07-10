import React from 'react';
import s from './FriendsItem.module.css'

type FriendsItemPropsType = {
    id: number
    name: string
}

const FriendsItem: React.FC<FriendsItemPropsType> = (props) => {

    let imgPath = "../../../../imgs/Users/" + props.id + ".png";

    return (
        <div className={s.friendsItem}>
            <div className={s.img}>
                <img src={imgPath} />
            </div>
            <div className={s.names}>
                {props.name}
            </div>

        </div>
    );
}

export default FriendsItem;