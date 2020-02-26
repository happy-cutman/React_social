import React from 'react';
import classes from './MyPosts.module.css';
import Post from './Post/Post';


const MyPosts = (props) => {

    let postsElements = props.posts.map(el => <Post message={el.message} key={el.id} like={el.like}/>);


    let onAddPost = () => { // получаем значение из <textarea> и передаём в фую addPost
        props.addPost();
    };


    let onPostChange = (event) => { // срабатывает при измеении содержимого <textarea>
        let text = event.target.value;
        props.onPostChange(text);
    };

    return (
        <div className={classes.postsBlock}>
            <h3>My Posts</h3>
            <div>
                <div>
                    <textarea onChange={onPostChange} value={props.newPostText}/>
                </div>
                <div>
                    <button onClick={onAddPost}>Add new Post</button>
                    {/* вызывает addPost по клику на кнопку */}
                </div>
            </div>
            <div className={classes.posts}>
                {postsElements}
            </div>
        </div>
    );
};

export default MyPosts;

