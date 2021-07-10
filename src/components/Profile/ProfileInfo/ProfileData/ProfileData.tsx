import React, {useState} from 'react';
import s from '../ProfileInfo.module.css'
import {ProfileContactsType, ProfileType} from "../../../../types/types";

type ProfileDataPropsType = {
    profile: ProfileType
}

export const ProfileData: React.FC<ProfileDataPropsType> = ({profile}) => {

    return (
        <div>
            <div>
                <b>About me</b>: {profile.aboutMe}
            </div>
            <div>
                <b>Looking for a job</b>: {profile.lookingForAJob ? 'Yes' : 'No'}
            </div>
            <div>
                <b>Description</b>: {profile.lookingForAJobDescription}
            </div>
            <div>
                <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
                    return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key as keyof ProfileContactsType]}/>
            })}
            </div>
        </div>
    )
}

type ContactPropsType = {
    contactTitle: string
    contactValue: string
}

const Contact: React.FC<ContactPropsType> = ({contactTitle, contactValue}) => {
    return (
        <div className={s.contacts}>
            <b>{contactTitle}</b>: {contactValue}
        </div>
    )
}