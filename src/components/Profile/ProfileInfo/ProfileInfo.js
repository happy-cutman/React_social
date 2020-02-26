import React from 'react';
import classes from './ProfileInfo.module.css'

const ProfileInfo = () => {
    return (
        <div>
            <div>
                <img src='https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
                     alt=''/>
            </div>
            <div className={classes.descriptionBlock}>
                avatar + description
                {/*<img src='https://highsales.digital/images/blog/significado-das-cores.png' alt=''/>*/}
            </div>
        </div>
    );
};

export default ProfileInfo;