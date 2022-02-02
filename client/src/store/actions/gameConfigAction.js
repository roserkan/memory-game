export const SET_GAME_CONFIG = "SET_GAME_CONFIG";


export function setGameConfig(gameConfig) {
    return {
        type: SET_GAME_CONFIG,
        payload: gameConfig
    }
}
