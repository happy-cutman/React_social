import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {setLogin} from '../../redux/auth_reducer';
import {Input} from '../common/FormsControls/FormsControls';
import {maxLengthCreator, required} from '../../utils/validators/validators';

let maxLength20 = maxLengthCreator(20);

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Input} name={'login'} placeholder={'login'} validate={[required, maxLength20]}/>
            </div>
            <div>
                <Field component={Input} name={'password'} type='text' placeholder={'password'} validate={[required, maxLength20]}/>
            </div>
            <div>
                <Field component={Input} name={'rememberMe'} type='checkbox'/> remember me
            </div>
            <div>
                <button type={'submit'}>Submit</button>
            </div>
        </form>
    )
};

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm);

const Login = (props) => {

    let onSubmit = (formData) => { // formData все данные из формы
    };

    return <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
};

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
    }
};

export default connect(mapStateToProps, {setLogin})(Login);