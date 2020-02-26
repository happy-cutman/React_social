import classes from '../Dialogs.module.css';
import React from 'react';

const Message = (props) => {
    return (
            <div className={classes.message__bubble}>
                <p className={classes.message}>{props.message}</p>
            </div>
    )
};

export default Message;