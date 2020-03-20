import React from 'react';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';


const Profile = (props) => {

    return (
        <div>
            <ProfileInfo isOwner={props.isOwner}
                         saveUserAvatar={props.saveUserAvatar}
                         profile={props.profile} status={props.status}
                         updateUserStatus={props.updateUserStatus}/>
            <MyPostsContainer />
        </div>
    );
};


export default Profile;

