import React from 'react';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import Header from './components/Header/Header';
import Profile from './components/Profile/Profile';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import NavBarContainer from './components/NavBar/NavBarContainer';
import UsersContainer from './components/Users/UsersContainer';



const App = (props) => {
    return (
        <BrowserRouter> {/* нужен для работы <Route/>  оборачивает весь код в компоненте APP*/}
            <div className='app-wrapper'>
                <Header/>
                <NavBarContainer/>
                <div className='app-wrapper-content'>
                    <Route path='/dialogs' render={ () => <DialogsContainer/> }/> {/* Отрисовует компонент <Dialogs/> при обарщении по пути  */}
                    <Route path='/profile' render={ () => <Profile/> }/>
                    <Route path='/users' render={ () => <UsersContainer/> }/>
                    <Route path='/news' render={ () => <News/> }/>
                    <Route path='/music' render={ () => <Music/> }/>
                    <Route path='/settings' render={ () => <Settings/> }/>

                    {/*/!*<Route path='/dialogs'>*!/ аналогичная запись*/}
                    {/*    <Dialogs/>*/}
                    {/*</Route>*/}

                </div>
            </div>
        </BrowserRouter>
    );
};



export default App;
