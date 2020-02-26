import React from 'react';
import {sendMessageCreator, updateMessageCreator} from '../../redux/messages_reducer';
import Dialogs from './Dialogs';
import {connect} from 'react-redux';


let mapStateToProps = (state) => {
    return {
        messagesPage: state.messagesPage
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


const DialogsContainer = connect(mapStateToProps, mapDispatchToProps) (Dialogs);

export default DialogsContainer;