import React from 'react';
import s from './Dialogs.module.css';
import DialogsItem from "./DialogsItem/DialogItem";
import Messages from "./Messages/Messages";
import {AddMessageReduxForm} from "./AddMessageForm";
import {DialogsType, MessagesType} from './../../types/types'


type DialogsPropsType = {
    dialogues: Array<DialogsType>
    dialoguesItem: {
        messages: Array<MessagesType>
    }
    addMessage: (newMessageBody: string) => void
}
export type NewMessageFormType = {
    newMessageBody: string
}

const Dialogs: React.FC<DialogsPropsType> = ({dialogues, dialoguesItem, addMessage}) => {
    let dialogueElements = dialogues.map(d => <DialogsItem name={d.name} id={d.id}/>);
    let userMessagesDate = dialoguesItem.messages.map(m => <Messages message={m.message}/>);
    const onSubmit = (formData: NewMessageFormType) => {
        debugger
        addMessage(formData.newMessageBody)
    }

    return (
        <div className={s.dialogues}>
            <div className={s.dialoguesItems}>
                {dialogueElements}
            </div>
            <div className={s.messages}>
                <div className={s.userImg}>
                    <img src='../../imgs/Users/1.png'/>
                </div>
                <div>
                    <div className={s.messageData}>
                        {userMessagesDate}
                    </div>

                    <div className={s.Input}>
                        <AddMessageReduxForm onSubmit={onSubmit}/>
                    </div>
                </div>
            </div>
        </div>

    )
}



export default Dialogs;