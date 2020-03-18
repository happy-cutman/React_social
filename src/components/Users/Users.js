import React from 'react';
import User from './User';
import Pagination from 'react-js-pagination';
import Paginator from '../common/Paginator/Paginator';


let Users = (props) => {

    return <div>

        <div>
            <Pagination
                activePage={props.currentPage}
                itemsCountPerPage={props.pageSize}
                totalItemsCount={props.totalItemsCount}
                pageRangeDisplayed={10}
                onChange={props.onPageChanged}
            />
            {/*<Paginator totalItemsCount={props.totalItemsCount}*/}
            {/*           pageSize={props.pageSize}*/}
            {/*           currentPage={props.currentPage}*/}
            {/*           onPageChanged={props.onPageChanged}/>*/}
        </div>

        <div>
            {props.users.map(user => <User key={user.id}
                                           user={user}
                                           followingInProgress={props.followingInProgress}
                                           unfollow={props.unfollow}
                                           follow={props.follow}/>)}
        </div>
    </div>
};

export default Users;