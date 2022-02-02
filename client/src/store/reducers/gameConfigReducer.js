import { SET_GAME_CONFIG } from "../actions/gameConfigAction";



let initialState = {
    gameType: '',
    gameMod: '',
    level: '',
    typeId: '',
}




export default function authReducer(state = initialState, { type, payload }) {
    switch (type) {
        case SET_GAME_CONFIG:
            return {
                ...state,
                gameType: payload.gameType,
                gameMod: payload.gameMod,
                level: payload.level,
                typeId: payload.typeId
            };
        default:
            return state;
    }
}