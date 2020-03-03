import React from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';


let mapStateToPropsForRedirect = (state) => {
    return {
        isAuth: state.auth.isAuth
    }
};

/* withAuthRedirect каждый раз будут вызывать из разных мест и в нее () будут приходить разные компоненты и мы
* каждый раз для каждой новой пришедшей компоненты будем создавать класс обёртку и каждый раз будем возвращать
* котейнерную компоненту для каждой целевой пришедшей компоненты*/

export const withAuthRedirect = (Component) => {
    class RedirectComponent extends React.Component {
        render() {
            if (!this.props.isAuth) return <Redirect to='/login'/>; // логика редиректа

            return <Component {...this.props}/> // перерисовывает компоненту которая попала на вход withAuthRedirect()
        }
    }

    let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent);

    return ConnectedAuthRedirectComponent;
};
// Когда вызывается withAuthRedirect он тут получает компонету в компоненте. Создаётся RedirectComponent и оборачивается в connect.
// И теперь withAuthRedirect конектит к store и забирает значение isAuth

