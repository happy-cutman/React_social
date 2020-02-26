import Navbar from './Navbar';
import {connect} from 'react-redux';


let stateToProps = (state) => {
    return {
        avatars: state.sideBar.avatars,
    }
};


const NavBarContainer = connect(stateToProps)(Navbar);

export default NavBarContainer;