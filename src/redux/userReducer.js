import {AsyncStorage} from 'react-native';

const userReducer = function(state = {token: null}, action) {
    if (action.type == "SET_USER") {
        let user = {...state, ...action.payload};
        AsyncStorage.setItem("user", JSON.stringify(user));
        return user;
    }
    if (action.type == "REMOVE_USER") {
        return {token: null};
    }

    return state;
};

export default userReducer;