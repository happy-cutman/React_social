import React from 'react';
import './App.css';
import {BrowserRouter, Redirect, Route, Switch, withRouter} from 'react-router-dom';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
// import DialogsContainer from './components/Dialogs/DialogsContainer';
import NavBarContainer from './components/NavBar/NavBarContainer';
import UsersContainer from './components/Users/UsersContainer';
// import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import LoginPage from './components/Login/Login';
import {connect} from 'react-redux';
import {initializeApp} from './redux/app_reducer';
import Preloader from './components/common/Preloader/Preloader';
import withSuspense from './hoc/withSuspense'

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));


class App extends React.Component {

    catchAllUnhandledErrors = (reason, promise) => {
        alert('Some error occured');
    };

    componentDidMount() {
        this.props.initializeApp();
        window.addEventListener('unhandlerejection', this.catchAllUnhandledErrors)
    }

    componentWillUnmount() {
        window.removeEventListener('unhandlerejection', this.catchAllUnhandledErrors)
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
                            <Switch>
                                <Route exact path='/' render={() => <Redirect to={'/profile'}/>}/>
                                <Route path='/dialogs' render={() => withSuspense(<DialogsContainer/>)}/>
                                <Route path='/profile/:userId?' render={() => withSuspense(<ProfileContainer/>)}/>
                                <Route path='/users' render={() => <UsersContainer/>}/>
                                <Route path='/news' render={() => <News/>}/> {/* Отрисовует компонент <News/> при обарщении по пути  */}
                                <Route path='/music' render={() => <Music/>}/>
                                <Route path='/settings' render={() => <Settings/>}/>
                                <Route path='/login' render={() => <LoginPage/>}/>
                                <Route path='*' render={() => <div>404 NOT FOUND</div>}/>
                                <Redirect from="/" to="/profile" />
                            </Switch>
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
