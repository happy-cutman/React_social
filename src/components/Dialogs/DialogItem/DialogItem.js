import classes from '../Dialogs.module.css';
import {NavLink} from 'react-router-dom';
import React from 'react';


const DialogItem = (props) => {
    let path = '/dialogs/' + props.id; // переменная для пути

    return(
        <div className={classes.dialog}>
            <img src={props.ava} alt=''/>
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    )
};

export default DialogItem;