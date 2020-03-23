import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {login} from '../../redux/auth_reducer';
import {createField, Input} from '../common/FormsControls/FormsControls';
import {maxLengthCreator, required} from '../../utils/validators/validators';
import {Redirect} from 'react-router-dom';
import classes from '../common/FormsControls/FormsControls.module.css'


let maxLength20 = maxLengthCreator(20);

// для props используем деструктуризацию достаём нужные свойства
const LoginForm = ({handleSubmit, error, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field component={Input} name={'email'} type='email' placeholder={'email'} validate={[required, maxLength20]}/>
                {/*{createField('email', 'email', [required], Input, {type: 'email'})}*/}
            </div>
            <div>
                <Field component={Input} name={'password'} type='password' placeholder={'password'} validate={[required, maxLength20]}/>
            </div>
            <div>
                <Field component={Input} name={'rememberMe'} type='checkbox'/> remember me
            </div>

            {captchaUrl && <img src={captchaUrl} alt='captcha'/>}
            {captchaUrl && createField('Введите симвоы с картинки', 'captcha', [required], Input, {}) }

            { error && <div className={classes.formSummaryError}> {/* если props.error есть тогда показывает дивку с ошибкой */}
                {error}
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
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha) // тут login это не thunk creator, а функция connect под тем же именем даёт нам колбэк и туда передаются параметры, что потом попадают в thunk creator
    };

    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
        </div>
};

const mapStateToProps = (state) => { // принимает state и возвращает объект из state
    return {
        isAuth: state.auth.isAuth,
        captchaUrl: state.auth.captchaUrl
    }


};

export default connect(mapStateToProps, {login})(Login); // mapStatetoprops = null, {login} - тут thunk creator