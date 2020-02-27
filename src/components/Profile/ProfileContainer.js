import React from 'react';
import * as axios from 'axios';
import Profile from './Profile';
import {connect} from 'react-redux';
import {setUserProfile} from '../../redux/profile_reducer';
import {withRouter} from 'react-router-dom';



// отправляет запросы на сервер и оборачивает <Profile/>
class ProfileContainer extends React.Component  {

    componentDidMount() {
        let userId = this.props.match.params.userId;
        // если userId нет, то мы загрузим второго пользователя
        if (!userId) {
            userId = 2;
        }

        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
            .then(response => {
                this.props.setUserProfile(response.data)
            });
    }

    render() {
        return (
            <div>
                <Profile {...this.props} profile={this.props.profile}/> {/* props который пришёл мы раскукоживаем и как атрибуты прокидываем дальше в компоненту */}
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile
    }
};

// возвращает компоненту и закидует в нее данные из url оборачивает ProfileContainer
let WithUrlDataContainerComponent = withRouter(ProfileContainer);

// возвращает компоненту и закидует в нее данные из store и оборачивает WithUrlDataContainerComponent (кружочки в кружочках)
export default connect(mapStateToProps, {setUserProfile})(WithUrlDataContainerComponent);

