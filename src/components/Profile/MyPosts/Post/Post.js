import React from 'react';
import classes from './Post.module.css';


const Post = (props) => {
    return (
        <div className={classes.item}>
            <img src='https://papermilkdesign.com/images/circle-clipart-instagram-profile-10.png' alt=''/>
            {props.message}
            <div>
                <span>like {props.like}</span>
            </div>
        </div>
    );
};



export default Post;

