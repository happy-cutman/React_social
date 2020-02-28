import React from 'react';
import * as axios from 'axios';
import Header from './Header';
import {connect} from 'react-redux';
import {setAuthUserData} from '../../redux/auth_reducer';



class HeaderContainer extends React.Component{
    componentDidMount() {
        axios.get('https://social-network.samuraijs.com/api/1.0/auth/me', {withCredentials:true}) // withCredentials там лежат настьройки запроса логин пароль, авторизованность и тд
            .then(response => {
                if (response.data.resultCode === 0) { // если залогинен
                    let {id, login, email} = response.data.data; // из ответа сервера достали данные
                    this.props.setAuthUserData(id, login, email) // отправили данные в диспатч
                }
        })
    }

    render() {
        return <Header {...this.props}/>
    }
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login
    }
};

export default connect(mapStateToProps, {setAuthUserData})(HeaderContainer);