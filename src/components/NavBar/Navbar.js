import React from 'react';
import classes from './Navbar.module.css'
import {NavLink} from 'react-router-dom';
import Friend from './Friends/Friend';


const Navbar = (props) => {

    let friendsElements = props.avatars.map( el => <Friend img={el.ava} id={el.id} name={el.name}/> );

    return (
        <div>
            <nav className={classes.nav}>
                <div className={classes.item}>
                    <NavLink to='/profile' activeClassName={classes.active}>Profile</NavLink>
                </div>
                <div className={classes.item}>
                    <NavLink to='/dialogs' activeClassName={classes.active}>Messages</NavLink>
                </div>
                <div className={classes.item}>
                    <NavLink to='/users' activeClassName={classes.active}>Users</NavLink>
                </div>
                <div className={classes.item}>
                    <NavLink to='/news' activeClassName={classes.active}>News</NavLink>
                </div>
                <div className={classes.item}>
                    <NavLink to='/music' activeClassName={classes.active}>Music</NavLink>
                </div>
                <div className={classes.item}>
                    <NavLink to='/settings' activeClassName={classes.active}>Settings</NavLink>
                </div>

                <div className={classes.friends}>
                    <p>Friends</p>
                    { friendsElements }
                </div>
            </nav>

        </div>

    );
};



export default Navbar;
