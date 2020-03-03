import React from 'react';
import classes from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import {Redirect} from 'react-router-dom';


const Dialogs = (props) => {

    let onSendMessageClick = () => { // получаем значение <textarea> и передаём его в state там основная логика
        props.onSendMessageClick();
    };

    let updateMessageText = (event) => {
        let text = event.target.value;
        props.updateMessageText(text)
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
                    <div>
                        <textarea onChange={updateMessageText}
                                  value={newMessageText}
                                  placeholder='Enter your Message!'/>
                    </div>
                    <div>
                        <button onClick={onSendMessageClick}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    )
};


export default Dialogs;