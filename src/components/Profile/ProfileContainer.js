import React from 'react';
import Profile from './Profile';
import {connect} from 'react-redux';
import {getUserProfile, getUserStatus, saveUserAvatar, updateUserStatus} from '../../redux/profile_reducer';
import {withRouter} from 'react-router-dom';
import {compose} from 'redux';



// оборачивает <Profile/>
class ProfileContainer extends React.Component  {

    refreshProfile() {
        let userId = this.props.match.params.userId;

        if (!userId) {
            userId = this.props.authorizedUserId;
            if (!userId) {
                this.props.history.push('/login')
            }
        }

        // отправляет запросы на сервер
        this.props.getUserProfile(userId);
        this.props.getUserStatus(userId);
    }

    componentDidMount() {
        this.refreshProfile()
    }

    // если id из текущих props, которая пришла из url не равна id из предидущих props тогда запрашиваются новые данные
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.userId != prevProps.match.params.userId) {
            this.refreshProfile()
        }

    }

    render() {

        return (
            <div>
                <Profile {...this.props}
                        saveUserAvatar={this.props.saveUserAvatar}
                         isOwner={!this.props.match.params.userId}
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
        status: state.profilePage.status,
        authorizedUserId: state.auth.userId,
        isAuth: state.auth.isAuth
    }
};

export default compose(
    connect(mapStateToProps, {getUserProfile, getUserStatus, updateUserStatus, saveUserAvatar}),
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

