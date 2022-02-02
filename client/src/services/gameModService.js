import { endpoints } from "../endpoints";
import axios from "axios";

export const getAll = () =>  axios.get(endpoints.getGameModes)
export const getById = id => axios.get(endpoints.getGameModById + id)
export const add = data => axios.post(endpoints.addGameMod, data)
export const remove = id => axios.delete(endpoints.deleteGameMod + id)
export const update = (id, data) => axios.post(endpoints.updateGameMod + id, data)




