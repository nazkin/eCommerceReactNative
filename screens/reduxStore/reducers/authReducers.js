import {LOG_IN, SIGN_UP} from '../actions/authActions'

const initialState = {
    token: null,
    userID: null
}

export default (state = initialState, action)=> {
    switch(action.type){
        case LOG_IN:

            return {
                ...state,
                token: action.token,
                userID: action.userID
            };
        case SIGN_UP:
            
            return {
                ...state,
                token: action.token,
                userID: action.userID
            };
        default:
            return state
    }
}