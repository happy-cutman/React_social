import profileReducer, {addPostActionCreator, deletePost} from './profile_reducer';
import {render} from '@testing-library/react';
import App from '../App';
import React from 'react';

let state = {  // не имеем права изменять этот объект поэтому делаем копию в reducer и меняем копию
    posts: [
        {id: '1', message: 'Hello. It is me', like: '31'},
        {id: '2', message: 'Hi, darling', like: '5'},
        {id: '3', message: 'Wonderful life', like: '12'},
        {id: '4', message: 'Arom dom dom', like: '1'},
    ],
};


test('length of the posts should be incremented', () => {
    // 1. start data
    let action = addPostActionCreator('Hello Nika');

    // 2. action
    let newState = profileReducer(state, action);

    // 3. expectation
    expect(newState.posts.length).toBe(5);
    expect(newState.posts[4].message).toBe('Hello Nika');
});

test('message of New post must be correct', () => {
    // 1. start data
    let action = addPostActionCreator('Hello Nika');

    // 2. action
    let newState = profileReducer(state, action);

    // 3. expectation
    expect(newState.posts[4].message).toBe('Hello Nika');
});

test('length messages after deleting should be decrement', () => {
    // 1. start data
    let action = deletePost(1);

    // 2. action
    let newState = profileReducer(state, action);

    // 3. expectation
    // expect(newState.posts.length).toBe(3);
});