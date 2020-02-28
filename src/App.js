import React from 'react';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import Header from './components/Header/Header';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import NavBarContainer from './components/NavBar/NavBarContainer';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';



const App = (props) => {
    return (
        <BrowserRouter> {/* нужен для работы <Route/>  оборачивает весь код в компоненте APP*/}
            <div className='app-wrapper'>
                <HeaderContainer/>
                <NavBarContainer/>
                <div className='app-wrapper-content'>
                    <Route path='/dialogs' render={ () => <DialogsContainer/> }/> {/* Отрисовует компонент <Dialogs/> при обарщении по пути  */}
                    <Route path='/profile/:userId?' render={ () => <ProfileContainer/> }/> {/* ? означает что параметр не обязательный */}
                    <Route path='/users' render={ () => <UsersContainer/> }/>
                    <Route path='/news' render={ () => <News/> }/>
                    <Route path='/music' render={ () => <Music/> }/>
                    <Route path='/settings' render={ () => <Settings/> }/>
                </div>
            </div>
        </BrowserRouter>
    );
};



export default App;
