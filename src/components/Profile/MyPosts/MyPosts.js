import React from 'react';
import classes from './MyPosts.module.css';
import Post from './Post/Post';
import {Field, reduxForm} from 'redux-form';
import {maxLengthCreator, required} from '../../../utils/validators/validators';
import {TextArea} from '../../common/FormsControls/FormsControls';


let maxLength10 = maxLengthCreator(10);

const MyPosts = React.memo((props) => {

    let postsElements = props.posts.map(el => <Post message={el.message} key={el.id} like={el.like}/>);

    let addNewPost = (values) => { // срабатывает при измеении содержимого <textarea>
        props.addPost(values.newPostText)
    };

    return (
        <div className={classes.postsBlock}>
            <h3>My Posts</h3>
            <div>
                <AddNewPostReduxForm onSubmit={addNewPost}/>
            </div>
            <div className={classes.posts}>
                {postsElements}
            </div>
        </div>
    );
});

const addNewPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={TextArea} name={'newPostText'} placeholder={'Add new post'}
                       validate={[required, maxLength10]}/>
            </div>
            <div>
                <button type={'submit'}>Add Post</button>
            </div>
        </form>
    )
};

const AddNewPostReduxForm = reduxForm({form: 'ProfileAddPostForm'})(addNewPostForm);

export default MyPosts;

