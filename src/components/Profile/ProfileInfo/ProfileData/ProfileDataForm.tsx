import React, {useState} from 'react';
import s from '../ProfileInfo.module.css'
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Element} from '../../../common/FormsControls/FormsControls'
import style from '../../../common/FormsControls/FormsControls.module.css'
import {ProfileType} from "../../../../types/types";

const Input = Element('input');
const Text = Element('textarea');


type OwnPropsType = {
    profile: ProfileType
}
const Form: React.FC<InjectedFormProps<ProfileType, OwnPropsType> & OwnPropsType> = ({handleSubmit, profile, error}) => {

    return (
        <form onSubmit={handleSubmit}>
            {error && <div className={style.formCommonError}>{error}</div>}
            <button >Save</button>
            <div>
                <b>Name</b>: <Field placeholder={'name'}
                                    component={Input}
                                    name={'fullName'}/>
            </div>
            <div>
                <b>About me</b>: <Field placeholder={'about me'}
                                        component={Input}
                                        name={'aboutMe'}/>
            </div>
            <div>
                <b>Looking for a job</b>: <Field component={Input}
                                                 name={'lookingForAJob'}
                                                 type={'checkbox'}/>
            </div>
            <div>
                <b>Description</b>: <Field placeholder={'write about your skills'}
                                           component={Text}
                                           name={'lookingForAJobDescription'}/>
            </div>
            <div>
                <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
                    return (
                        <div>
                            <b>{key}</b>: <Field component={Input}
                                                 placeholder={key}
                                                 name={`contacts.${key}`}/>
                        </div>
                    )
            })}
            </div>
        </form>
    )
}

export const ProfileDataReduxForm = reduxForm<ProfileType, OwnPropsType>({form: 'profileData'})(Form)
