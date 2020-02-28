import {connect} from 'react-redux';
import {
    follow,
    setCurrentPage,
    setUsers,
    setTotalUsersCount,
    toggleIsFetching,
    unfollow
} from '../../redux/users_reducer';
import React from 'react';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';
import {followAPI, requestFollow, requestUnFollow, usersAPI} from '../../api/api';


class UsersContainer extends React.Component {

    componentDidMount() { // это метод из родительского класса, компонент монтируется в страничку один раз
        this.props.toggleIsFetching(true);

        usersAPI.getUsers(this.props.currentPage, this.props.pageSize).then(data => { // берём из props нужные параметры и они передаются в DAL в котором написана эта функция
            this.props.toggleIsFetching(false);
            this.props.setUsers(data.items);
            this.props.setTotalUsersCount(data.totalCount);
        });

    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        this.props.toggleIsFetching(true);

        usersAPI.getUsers(pageNumber, this.props.pageSize)
            .then(data => {  // dat'y возвращает ф-уя из DAL и мы её используем вместо response, не весь response целиком, а data из response
                this.props.toggleIsFetching(false);
                this.props.setUsers(data.items);
            });
    };

    onFollow = (userId) => {
        followAPI.requestFollow(userId)
            .then(data => {
                if (data.resultCode == 0) {
                    this.props.follow(userId)
                }
            })
    };

    unFollow = (userId) => {
        followAPI.requestUnFollow(userId)
            .then(data => {
                if (data.resultCode == 0) {
                    this.props.unfollow(userId)
                }
            })
    };

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
                <Users totalUsersCount={this.props.totalUsersCount}
                                     pageSize={this.props.pageSize}
                                     currentPage={this.props.currentPage}
                                     onPageChanged={this.onPageChanged}
                                     users={this.props.users}
                                     onFollow={this.onFollow} unFollow={this.unFollow} />
                </>
        };
}

let mapStateToProps = (state) => { // прокидывает props в компоненты
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching
    }
};

//старый диспатч
// let mapDispatchToProps = (dispatch) => {
//     return {
//         follow: (userId) => {
//             dispatch(followAC(userId)) // диспатчим не AC, а результат работы AC
//         },
//         unfollow: (userId) => {
//             dispatch(unfollowAC(userId))
//         },
//         setUser: (users) => {
//             dispatch(setUsersAC(users))
//         },
//         setCurrentPage: (pageNumber) => {
//             dispatch(setCurrentPageAC(pageNumber))
//         },
//         setTotalUsersCount: (totalCount) => {
//             dispatch(setUsersTotalCountAC(totalCount))
//         },
//         toggleIsFetching: (isFetching) => { // callback который попадает в props
//             dispatch(toggleIsFetchingAC(isFetching)) // когда компонента его вызовет он задиспатчит action
//         }
//     }
// };

export default connect(mapStateToProps, {
        follow, unfollow, setUsers,
        setCurrentPage, setTotalUsersCount, toggleIsFetching
    },
)(UsersContainer);
