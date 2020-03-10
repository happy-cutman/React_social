import React from 'react';
import Profile from './Profile';
import {connect} from 'react-redux';
import {getUserProfile, getUserStatus, updateUserStatus} from '../../redux/profile_reducer';
import {withRouter} from 'react-router-dom';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';
import {compose} from 'redux';



// оборачивает <Profile/>
class ProfileContainer extends React.Component  {

    componentDidMount() {
        let userId = this.props.match.params.userId;
        // если userId нет, то мы загрузим второго пользователя
        if (!userId) {
            userId = 2;
        }

        // отправляет запросы на сервер
        this.props.getUserProfile(userId);
        this.props.getUserStatus(userId);
    }

    render() {

        return (
            <div>
                <Profile {...this.props}
                         profile={this.props.profile}
                         status={this.props.status}
                         updateUserStatus={this.props.updateUserStatus}/> {/* props который пришёл мы раскукоживаем и как атрибуты прокидываем дальше в компоненту */}
            </div>
        )
    }
}



let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status
    }
};

export default compose(
    connect(mapStateToProps, {getUserProfile, getUserStatus, updateUserStatus}),
    withRouter,
    // withAuthRedirect
)(ProfileContainer);

// // оборачивает <ProfileContainer>
// let AuthRedirectComponent = withAuthRedirect(ProfileContainer); // HOC создал нужную логику

// // возвращает компоненту и закидует в нее данные из url оборачивает AuthRedirectComponent является HOC'ом
// let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent);
//
// // возвращает компоненту и закидует в нее данные из store и оборачивает WithUrlDataContainerComponent (кружочки в кружочках)
// export default connect(mapStateToProps, {getUserProfile})(WithUrlDataContainerComponent);
