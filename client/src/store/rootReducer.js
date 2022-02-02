import { combineReducers } from 'redux';
import authReducer from "./reducers/authReducer"
import gameConfigReducer from "./reducers/gameConfigReducer"


const rootReducer = combineReducers({
    authReducer,
    gameConfigReducer
})


export default rootReducer;