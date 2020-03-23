import React, {useEffect, useState} from 'react';
import classes from './ProfileInfo.module.css'

const ProfileStatusWithHooks = (props) => {

    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect( () => {
        setStatus(props.status)
    }, [props.status]);

    const activateEditMode = () => {
        setEditMode(true);
    };

    const deactivateEditMode = () => {
        setEditMode(false);
    };

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value);
        props.updateUserStatus(status);
    };

    return (
        <>
            {!editMode &&
            <div>
                <b>Статус</b>: <span onDoubleClick={activateEditMode}>{props.status || '.......'}</span>
            </div>
            }
            {editMode &&
            <div>
                <input onBlur={deactivateEditMode} onChange={onStatusChange} autoFocus={true} value={status}/>
            </div>
            }
        </>
    );
};

export default ProfileStatusWithHooks;