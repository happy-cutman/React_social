import React from 'react';
import './App.css';
import {BrowserRouter, Route, withRouter} from 'react-router-dom';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import NavBarContainer from './components/NavBar/NavBarContainer';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import LoginPage from './components/Login/Login';
import {connect, Provider} from 'react-redux';
import {initializeApp} from './redux/app_reducer';
import Preloader from './components/common/Preloader/Preloader';
import {compose} from 'redux';
import store from './redux/redux_store';


class App extends React.Component {

    componentDidMount() {
        this.props.initializeApp(); // запрос на сервер авторизован ли пользователь
    }
    // если не проинициализоровались, то возвращаем прелоадер
    render() {
        if (!this.props.initialized) {
            return <Preloader/>;
        }

        return (
            <BrowserRouter>  {/* нужен для работы <Route/>  оборачивает весь код в компоненте APP*/}
                    <div className='app-wrapper'>
                        <HeaderContainer/>
                        <NavBarContainer/>
                        <div className='app-wrapper-content'>
                            <Route path='/dialogs' render={() => <DialogsContainer/>}/> {/* Отрисовует компонент <Dialogs/> при обарщении по пути  */}
                            <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/> {/* ? означает что параметр не обязательный */}
                            <Route path='/users' render={() => <UsersContainer/>}/>
                            <Route path='/news' render={() => <News/>}/>
                            <Route path='/music' render={() => <Music/>}/>
                            <Route path='/settings' render={() => <Settings/>}/>
                            <Route path='/login' render={() => <LoginPage/>}/>
                        </div>
                    </div>
            </BrowserRouter>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        initialized: state.app.initialized
    }
};

export default connect(mapStateToProps, {initializeApp})(App)

// export default compose (
//     // withRouter,
//     connect(mapStateToProps, {initializeApp}))(App)
