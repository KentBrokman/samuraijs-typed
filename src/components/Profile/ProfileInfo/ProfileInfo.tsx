import React, {ChangeEvent, useState} from 'react';
import s from './ProfileInfo.module.css'
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus/ProfileStatus";
import ProfileStatusWithHooks from "./ProfileStatus/ProfileStatusWithHooks";
import userPhoto from "../../../imgs/Users/5.png"
import {ProfileData} from "./ProfileData/ProfileData";
import {ProfileDataReduxForm} from "./ProfileData/ProfileDataForm";
import {ProfileType} from "../../../types/types";

type ProfileInfoPropsType = {
    profile: ProfileType
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
    isOwner: boolean
    status: string
    updateStatus: (status: string) => void
}

const ProfileInfo: React.FC<ProfileInfoPropsType> = ({profile, savePhoto, saveProfile, isOwner, status, updateStatus}) => {
    let [editMode, setEditMode] = useState(false)

    if(!profile) {
        return <Preloader />
    }

    const onSubmit = (formData: ProfileType) => {
        saveProfile(formData).then(
            () => setEditMode(false)
        )
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {

        if (e.target.files?.length) {
            savePhoto(e.target.files[0])
        }
    }

    return (
        <div>
            {/*<div>*/}
            {/*    <img src="https://www.w3schools.com/howto/img_nature_wide.jpg"/>*/}
            {/*</div>*/}
            <div className={s.descriptionBlock}>
                <Avatar shape="square" size={180} icon={<UserOutlined />} src={profile.photos.large}/>
                {isOwner && <input type={'file'}
                                         onChange={onMainPhotoSelected}
                />}
                <div className={s.name}>{profile.fullName}</div>
                <ProfileStatusWithHooks status={status}
                               updateStatus={updateStatus}/>
                <div>
                    id: {profile.userId}
                </div>
            </div>
            <div>
                {editMode ?
                    <div>
                        <ProfileDataReduxForm
                                              // initialValues={profile}
                                              profile={profile}
                                              onSubmit={onSubmit}/>
                    </div>:
                    <div>
                        {isOwner && <button onClick={() => setEditMode(true)} >Edit</button>}
                        <ProfileData profile={profile}/>
                    </div>
                }
            </div>
        </div>
    );
}

export default ProfileInfo;