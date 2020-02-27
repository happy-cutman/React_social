import React from 'react';
import classes from './ProfileInfo.module.css'
import Preloader from '../../common/Preloader/Preloader';
import V from '../../../assets/images/VVV.png'
import X from '../../../assets/images/x.jpg'

const ProfileInfo = (props) => {
    if (!props.profile) {// ! означает если значение null или undefined
        return <Preloader/>
    }

    return (
        <div>
            <div>
                <img src='' alt='картинка'/>
            </div>
            <div className={classes.descriptionBlock}>
                <div><h2>{props.profile.fullName}</h2></div>
                <img src={props.profile.photos.large}/>
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