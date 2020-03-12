import {connect} from 'react-redux';
import {
    follow,
    setCurrentPage,
    unfollow, toggleFollowingProgress, requestUsers
} from '../../redux/users_reducer';
import React from 'react';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';
import {compose} from 'redux';
import {
    getCurrentPage,
    getFollowingProgress,
    getIsFetching,
    getPageSize, getUsers,
    getTotalUsersCount,
} from '../../redux/users_selectors';


class UsersContainer extends React.Component {

    componentDidMount() { // это метод из родительского класса, компонент монтируется в страничку один раз
        this.props.requestUsers(this.props.currentPage, this.props.pageSize); // requestUsers это колбэк передаёт параметры в thunkcreator
    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);

        this.props.requestUsers(pageNumber, this.props.pageSize);
    };

    render() {
        console.log('REDNER USERS');
        return <>
            {this.props.isFetching ? <Preloader/> : null}
                <Users totalUsersCount={this.props.totalUsersCount}
                       pageSize={this.props.pageSize}
                       currentPage={this.props.currentPage}
                       onPageChanged={this.onPageChanged}
                       users={this.props.users}
                       follow={this.props.follow}
                       unfollow={this.props.unfollow}
                       followingInProgress={this.props.followingInProgress}/>
                </>
        };
}

// let mapStateToProps = (state) => { // прокидывает props в компоненты
//     return {
//         users: state.usersPage.users,
//         pageSize: state.usersPage.pageSize,
//         totalUsersCount: state.usersPage.totalUsersCount,
//         currentPage: state.usersPage.currentPage,
//         isFetching: state.usersPage.isFetching,
//         followingInProgress: state.usersPage.followingInProgress
//     }
// };

let mapStateToProps = (state) => { // прокидывает props в компоненты
    console.log('mapStateToPropsUsers');
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingProgress(state)
    }
};



export default compose(
    // withAuthRedirect,
    connect(mapStateToProps, {follow, unfollow, setCurrentPage, toggleFollowingProgress, requestUsers }) // getUsers: getUsersThunkCreator
)(UsersContainer);

