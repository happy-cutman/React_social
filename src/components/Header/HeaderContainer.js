import React from 'react';
import Header from './Header';
import {connect} from 'react-redux';
import {setAuthUserData} from '../../redux/auth_reducer';
import {authAPI} from '../../api/api';



class HeaderContainer extends React.Component{
    componentDidMount() {
        authAPI.authMe(this.props.isAuth)
            .then(data => {
                if (data.resultCode === 0) { // если залогинен
                    let {id, login, email} = data.data; // из ответа сервера достали данные
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