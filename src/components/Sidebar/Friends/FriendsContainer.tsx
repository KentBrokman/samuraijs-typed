import React from 'react';
import {connect} from "react-redux";
import Friends, {FriendsPropsType} from "./Friends";
import {AppStateType} from "../../../Redux/Redux-store";


// const Friends = (props) => {
//
//     let friendsItems = props.state.friends.map( m => <FriendsItem name={m.name} id={m.id} />);
//
//     return (
//         <div className={s.friends}>
//             <div className={s.title}>
//                 <h3>Friends</h3>
//             </div>
//             <div className={s.friendsItem}>
//                 {friendsItems}
//             </div>
//         </div>
//     );
// }

let mapStateToProps = (state: AppStateType) => {
    return {
        friends: state.sidebar.friends
    }
}

let FriendsContainer = connect<FriendsPropsType, {}, {}, AppStateType>(mapStateToProps)(Friends);

export default FriendsContainer;