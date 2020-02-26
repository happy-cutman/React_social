import React from 'react';
import classes from '../Navbar.module.css'

const Friend = (props) => {
    return (
        <div className={classes.friend}>
            <div><img src={props.img} alt=''/></div>
            <div><span>{props.name}</span></div>
        </div>
    );
};

export default Friend;