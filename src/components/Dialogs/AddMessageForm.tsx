import React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../utils/Validators/validators";
import {Element} from "../common/FormsControls/FormsControls";
import {NewMessageFormType} from "./Dialogs";




const maxLength50 = maxLengthCreator(50);
const Textarea = Element('textarea')

type OwnPropsType = {}
const AddMessageForm: React.FC<InjectedFormProps<NewMessageFormType, OwnPropsType> & OwnPropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea}
                       name={'newMessageBody'}
                       placeholder={'Enter your message'}
                       validate={[required, maxLength50]}
                />
            </div>
            <div>
                <button>Add Message</button>
            </div>
        </form>
    )
}

export const AddMessageReduxForm = reduxForm<NewMessageFormType>({form: 'newMessage'})(AddMessageForm)

