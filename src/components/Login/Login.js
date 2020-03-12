import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {login} from '../../redux/auth_reducer';
import {Input} from '../common/FormsControls/FormsControls';
import {maxLengthCreator, required} from '../../utils/validators/validators';
import {Redirect} from 'react-router-dom';
import classes from '../common/FormsControls/FormsControls.module.css'

// 78 урок не работает логин и логаут
let maxLength20 = maxLengthCreator(20);

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Input} name={'email'} type='email' placeholder={'email'} validate={[required, maxLength20]}/>
            </div>
            <div>
                <Field component={Input} name={'password'} type='password' placeholder={'password'} validate={[required, maxLength20]}/>
            </div>
            <div>
                <Field component={Input} name={'rememberMe'} type='checkbox'/> remember me
            </div>
            { props.error && <div className={classes.formSummaryError}> {/* если props.error есть тогда показывает дивку с ошибкой */}
                {props.error}
            </div> }
            <div>
                <button type={'submit'}>Submit</button>
            </div>
        </form>
    )
};

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm);

const Login = (props) => {

    let onSubmit = (formData) => { // formData все данные из формы
        props.login(formData.email, formData.password, formData.rememberMe) // тут login это не thunk creator, а функция connect под тем же именем даёт нам колбэк и туда передаются параметры, что потом попадают в thunk creator
    };

    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
};

const mapStateToProps = (state) => { // принимает state и возвращает объект из state
    return {
        isAuth: state.auth.isAuth
    }


};

export default connect(mapStateToProps, {login})(Login); // mapStatetoprops = null, {login} - тут thunk creator