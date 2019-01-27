import {createStore, applyMiddleware, combineReducers} from "redux";
import thunk from "redux-thunk";
import userReducer from "./userReducer"

const allReducers = combineReducers({
    user: userReducer
});

const middleware = applyMiddleware(thunk);
const store = createStore(allReducers, middleware);

export default store;