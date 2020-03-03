import React from 'react';
import classes from './Users.module.css';
import userAvatar from '../../assets/images/avatar.png';
import {NavLink} from 'react-router-dom';


let Users = (props) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize); // определяет сколько должно получиться страниц, делим общее колво пользоателей на размер отображаемых на странице. Math.ceil() окрушляет в большую сторону

    let pages = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return <div>


            <div>
                { pages.map(page => {
                    return <button className={props.currentPage === page && classes.selectedPage}
                                   onClick={ () => {props.onPageChanged(page)} }>{page}</button>
                })}

            </div>

            { props.users.map(user => <div key={user.id}>
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
            }
        </div>
};

export default Users;