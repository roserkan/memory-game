const BASE_URL = 'http://localhost:5000/api/';
const baseSteps = BASE_URL + 'baseSteps/';
const gameImages = BASE_URL + 'gameImages/';
const gameModes = BASE_URL + 'gameModes/';
const gameTypes = BASE_URL + 'gameTypes/';
const levels = BASE_URL + 'levels/';
const scores = BASE_URL + 'scores/';
const users = BASE_URL + 'users/';

export const endpoints = {
    getBaseSteps: baseSteps + 'getall',
    getBaseStepById: baseSteps + 'getbyid/',
    addBaseStep: baseSteps + 'add',
    deleteBaseStep: baseSteps + 'delete/',
    updateBaseStep: baseSteps + 'update/',

    getGameImages: gameImages + 'getall',
    getGameImageById: gameImages + 'getbyid/',
    getGameImageByTypeId: gameImages + 'getbytypeid/',
    addGameImage: gameImages + 'add',
    deleteGameImage: gameImages + 'delete/',
    updateGameImage: gameImages + 'update/',

    getGameModes: gameModes + 'getall',
    getGameModById: gameModes + 'getbyid/',
    addGameMod: gameModes + 'add',
    deleteGameMod: gameModes + 'delete/',
    updateGameMod: gameModes + 'update/',

    getGameTypes: gameTypes + 'getall',
    getGameTypeById: gameTypes + 'getbyid/',
    addGameType: gameTypes + 'add',
    deleteGameType: gameTypes + 'delete/',
    updateGameType: gameTypes + 'update/',

    getLevels: levels + 'getall',
    getLevelById: levels + 'getbyid/',
    getLevelByUserId: levels + 'getbyuserid/',
    addLevel: levels + 'add',
    deleteLevel: levels + 'delete/',
    updateLevel: levels + 'update/',
    updateLevelByUserId: levels + 'updatebyuserid/',


    getScores: scores + 'getall',
    getScoreById: scores + 'getbyid/',
    addScore: scores + 'add',
    deleteScore: scores + 'delete/',
    updateScore: scores + 'update/',
    updateScoreByUserId: scores + 'updatebyuserid/',

    getUsers: users + 'getall',
    getUserById: users + 'getbyid/',
    addUser: users + 'add',
    deleteUser: users + 'delete/',
    updateUser: users + 'update/',

    login: BASE_URL + 'auth/login',

    bestPlayers: BASE_URL + 'bestPlayers/getall'
}