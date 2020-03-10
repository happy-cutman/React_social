import React from 'react';
import classes from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import {Redirect} from 'react-router-dom';
import handleSubmit from 'redux-form/lib/handleSubmit';
import {Field, reduxForm} from 'redux-form';
import {maxLengthCreator, required} from '../../utils/validators/validators';
import {TextArea} from '../common/FormsControls/FormsControls';


const maxLength50 = maxLengthCreator(50);

const Dialogs = (props) => {

    let addNewMessage = (values) => { // срабатывает при измеении содержимого <textarea>
        props.onSendMessageClick(values.newMessageText);
    };

    // Преобразовываем данные из props в JSX елементы
    let dialogsElements = props.messagesPage.dialogs.map( el => <DialogItem name={el.name} key={el.id} id={el.id} ava={el.ava}/>);
    let messagesElements = props.messagesPage.messages.map( el => <Message message={el.message} key={el.id} id={el.id}/>);
    let newMessageText = props.messagesPage.newMessage;

    // if (!props.isAuth) return <Redirect to='/login'/>; // редирект на страницу логина если не авторизован

    // Отрисовываем данные
    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItems}>
                { dialogsElements }
            </div>
            <div className={classes.messages}>
                <div>{messagesElements}</div>
                <div className={classes.send}>
                    <AddMessageReduxForm onSubmit={addNewMessage}/>
                </div>
            </div>
        </div>
    )
};

const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={TextArea} name={'newMessageText'} placeholder={'Type your message'}
                        validate={[required, maxLength50]}/>
            </div>
            <div>
                <button type={'submit'}>Add message</button>
            </div>
        </form>
    )
};

const AddMessageReduxForm = reduxForm({form: 'DialogAddMessageForm'})(AddMessageForm);

export default Dialogs;