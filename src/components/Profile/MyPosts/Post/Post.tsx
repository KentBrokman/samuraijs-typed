import React from 'react';
import s from './Post.module.css'

export type PostPropsType = {
    message: string
    like: number
    id: number
}

const Post: React.FC<PostPropsType> = (props) => {

    let imgPath = "../../../../imgs/Users/" + props.id + ".png";
    
    return (
        
        <div className={s.item}>
            <img src={imgPath}/>
            {props.message}
            <div>
                <span>{props.like}</span>
            </div>
        </div>

    );
}

export default Post;