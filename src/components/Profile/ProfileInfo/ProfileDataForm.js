import React from 'react';
import classes from './ProfileInfo.module.css';
import style from '../../common/FormsControls/FormsControls.module.css'
import V from '../../../assets/images/VVV.png';
import X from '../../../assets/images/x.jpg';
import {Contact} from './ProfileInfo';
import {createField, Input, TextArea} from '../../common/FormsControls/FormsControls';
import {reduxForm} from 'redux-form';

const ProfileDataForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div><button>save</button></div>
            { props.error && <div className={style.formSummaryError}> {/* если props.error есть тогда показывает дивку с ошибкой */}
                {props.error}
            </div> }
            <div>
                <b>Полное имя</b>: {createField('Полное имя', 'fullName', [], Input)}
            </div>
            <div>
                <b>Обо мне</b>: {createField('Обо мне', 'aboutMe', [], TextArea)}
            </div>
            <div>
                <b>Ищу работу</b>: {createField('', 'lookingForAJob', [], Input, {type: 'checkbox'})}
            </div>
            <div>
                <b>Мои профессиональные навыки</b>: {createField('Навыки', 'lookingForAJobDescription', [], TextArea)}
            </div>
            <div>
                <b>Контакты</b>: {Object.keys(props.profile.contacts).map(key => {
                return <div key={key} className={classes.contact}>
                    <b>{key}</b>: {createField(key, 'contacts.' + key, [], Input)}
                </div>
            })}
            </div>
        </form>
    );
};

const ProfileDataReduxForm = reduxForm({form: 'edit_profile'})(ProfileDataForm);

export default ProfileDataReduxForm;