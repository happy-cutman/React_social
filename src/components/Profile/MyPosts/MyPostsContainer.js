import React from 'react';
import {addPostActionCreator, updatePostActionCreator} from '../../../redux/profile_reducer';
import MyPosts from './MyPosts';
import {connect} from 'react-redux';


const mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts, // тут даём команду MyPosts перерисуйся, если изменится объект Profilepage
        newPostText: state.profilePage.newPostText
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addPost: () => {
            dispatch(addPostActionCreator());
        },
        onPostChange: (text) => {
            let action = updatePostActionCreator(text);
            dispatch(action); // показано, что диспатчим объект action
        }
    }
};


const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;

