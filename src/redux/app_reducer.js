import {getAuthUserData} from './auth_reducer'; // это AC

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

let inintialState = {
    initialized: false
};

const appReducer = (state = inintialState, action) => {

    switch (action.type) {

        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            };

        default:
            return state;
    }
};

export const initializedSuccess = () => ( {type: INITIALIZED_SUCCESS} );

// диспатчи пройдут параллельно и после их завершения произойдёт диспатч инициализации
export const initializeApp = () => (dispatch) => {
    let promise = dispatch(getAuthUserData());
    // dispatch(somethingelse)
    // dispatch(somethingelse)
    // dispatch(somethingelse)
    Promise.all([promise])
        .then(() => {
            dispatch(initializedSuccess())
    })
};

export default appReducer;