import React from 'react';
import s from './DialogsItem.module.css';
import {NavLink} from "react-router-dom";

type DialogsItemPropsType = {
    id: number
    name: string
}

const DialogsItem: React.FC<DialogsItemPropsType> = (props) => {
    // debugger;

    let path = "/dialogs/" + props.id;
    let imgPath = "../../../imgs/Users/" + props.id + ".png";

    return (
        <div className={s.dialogue}>

            <NavLink className={s.dialogueInner} to={path}>
                <div className={s.img}>

                    <img src={imgPath} alt="lll"/>
                </div>
                {props.name}
            </NavLink>
        </div>

    )
}




export default DialogsItem;