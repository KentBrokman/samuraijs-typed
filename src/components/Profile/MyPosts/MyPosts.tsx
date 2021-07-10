import React from 'react';
import s from './MyPosts.module.css';
import Post, {PostPropsType} from './Post/Post';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/Validators/validators";
import {Element} from "../../common/FormsControls/FormsControls";
import {NewMessageFormType} from "../../Dialogs/Dialogs";


export type MyPostsStateType = {
    posts: Array<PostPropsType>
}
export type MyPostsDispatchType = {
    addPost: (newPostBody: string) => void
}
type MyPostsFormValuesType = {
    newPostBody: string
}
const MyPosts: React.FC<MyPostsStateType & MyPostsDispatchType> = (props) => {
    let postElements = props.posts.map(p => <Post message={p.message} like={p.like} id={p.id}/>);

    const onSubmit = (formData: MyPostsFormValuesType) => {
        props.addPost(formData.newPostBody)
    }

    return (

        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <MyPostsReduxForm onSubmit={onSubmit}/>
            <div className={s.posts}>
                {postElements}
            </div>
        </div>

    )
}

const MyPostsMemorised = React.memo(MyPosts)

const maxLength10 = maxLengthCreator(10);
const Textarea = Element('textarea');

type OwnPropsType = {}

const MyPostsForm: React.FC<InjectedFormProps<MyPostsFormValuesType, OwnPropsType> & OwnPropsType> = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea}
                       name={'newPostBody'}
                       placeholder={'Enter your text'}
                       validate={[required, maxLength10]}
                />
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

const MyPostsReduxForm = reduxForm<MyPostsFormValuesType, OwnPropsType>({form: 'myPosts'})(MyPostsForm)

export default MyPostsMemorised;