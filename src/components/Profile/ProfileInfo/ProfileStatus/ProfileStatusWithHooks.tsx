import React, {ChangeEvent, useEffect, useState} from 'react';


type ProfileStatusWithHooksPropsType = {
    status: string
    updateStatus: (status: string) => void
}
const ProfileStatusWithHooks: React.FC<ProfileStatusWithHooksPropsType> = (props) => {

    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)

    useEffect( () => {
        setStatus(props.status)
    }, [props.status])

    const activateEditMode = () => {
        setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }
    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }
    return (
        <div>
            <div>
                {!editMode &&
                <span onDoubleClick={activateEditMode}>{props.status || '----'}</span>}
            </div>
            <div>
                {editMode && <input autoFocus={true}
                                               onBlur={deactivateEditMode}
                                               value={status}
                                               onChange={onStatusChange}/>}
            </div>
        </div>
    )

}

export default ProfileStatusWithHooks;