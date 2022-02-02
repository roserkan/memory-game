import jwt_decode from "jwt-decode";
import { getCookie } from "../../utilities/cookie";
import { SET_CURRENT_USER } from "../actions/authAction";


let token = getCookie('auth');
let initialState = {};

if(token) {
    const decoded = jwt_decode(token);

    initialState = {isAuthenticated: true, currentUser: decoded}
}
else initialState = {isAuthenticated: false, currentUser: {}}




export default function authReducer(state = initialState, { type, payload }) {
    switch (type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: true,
                currentUser: payload
            };
        default:
            return state;
    }
}