import React from 'react';
import {sendMessageCreator, updateMessageCreator} from '../../redux/messages_reducer';
import Dialogs from './Dialogs';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';
import {compose} from 'redux';


let mapStateToProps = (state) => {
    return {
        messagesPage: state.messagesPage,
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        onSendMessageClick: () => {
            dispatch(sendMessageCreator())
        },
        updateMessageText: (text) => {
            dispatch(updateMessageCreator(text))
        }
    }
};


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs);