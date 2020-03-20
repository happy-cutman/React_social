import React from 'react';
import classes from './ProfileInfo.module.css'
import Preloader from '../../common/Preloader/Preloader';
import V from '../../../assets/images/VVV.png'
import X from '../../../assets/images/x.jpg'
import avatar from '../../../assets/images/avatar.png'
import ProfileStatusWithHooks from './ProfileStatusHooks';

const ProfileInfo = (props) => {

    if (!props.profile) {// ! означает если значение null или undefined
        return <Preloader/>
    }

    const onUserAvatarSelected = (event) => {
          if (event.target.files.length) {
              props.saveUserAvatar(event.target.files[0])
          }
    };

    return (
        <div>
            <div className={classes.descriptionBlock}>
                <img src={props.profile.photos.large || avatar} className={classes.profileAvatar}/>
                <div>{props.isOwner && <input type={'file'} onChange={onUserAvatarSelected} />}</div>
                <div><h2>{props.profile.fullName}</h2></div>
                <ProfileStatusWithHooks status={props.status} updateUserStatus={props.updateUserStatus}/>
                <div>{props.profile.aboutMe}</div>
            </div>
            <div className={classes.jobBlock}>
                <div>Ищу работу:  <img className={classes.jobImg} src={props.profile.lookingForAJob ? V : X}/></div>
                <div>{props.profile.lookingForAJobDescription}</div>
            </div>
        </div>
    );
};

export default ProfileInfo;