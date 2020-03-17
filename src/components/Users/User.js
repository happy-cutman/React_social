import React from 'react';
import classes from './Users.module.css';
import userAvatar from '../../assets/images/avatar.png';
import {NavLink} from 'react-router-dom';



let User = (props) => {
    let user = props.user;

    return (
        <div>
                <span>
                    <div>
                        <NavLink to={'/profile/' + user.id}><img src={user.photos.small != null ? user.photos.small : userAvatar}
                                                                 className={classes.user_photo} alt='avatar'/></NavLink>
                    </div>
                    <div>
                        {user.followed
                            ? <button disabled={props.followingInProgress.some(id => id === user.id)} onClick={ () => {props.unfollow(user.id)} }>UNFOLLOW</button> // если кто-то в этом массиве равен id пользователя, то будет true
                            : <button disabled={props.followingInProgress.some(id => id === user.id)} onClick={ () => {props.follow(user.id)} }>FOLLOW</button>}
                    </div>
                </span>
        <span>
                    <span>
                        <div>{user.name}</div>
                        <div>{user.status}</div>
                    </span>
                    <span>
                        <div>{'user.location.country'}</div>
                        <div>{'user.location.city'}</div>
                    </span>
                </span>
    </div>)

};

export default User;