import React from 'react';
import {actions} from "../../../Redux/profile-reducer";
import MyPostsMemorised, {MyPostsDispatchType, MyPostsStateType} from "./MyPosts";
import {connect} from "react-redux";
import {AppStateType} from "../../../Redux/Redux-store";

// const MyPostsContainer = (props) => {
//     let state = props.store.getState();
//
//     let onAddPost = () => {
//         props.store.dispatch(addPostActionCreator());
//     }
//
//     let onPostChange = (text) => {
//         props.store.dispatch(updateNewPostActionCreator(text));
//     }
//
//     return <MyPosts updateNewPost={onPostChange} addPost={onAddPost} profilePage={state.profilePage}/>;
// }

let mapStateToProps = (state: AppStateType) => {
    return {
        posts: state.profilePage.posts
    }
}


const MyPostsContainer = connect<MyPostsStateType, MyPostsDispatchType, {}, AppStateType>(mapStateToProps, {addPost: actions.addPost})(MyPostsMemorised);

export default MyPostsContainer;