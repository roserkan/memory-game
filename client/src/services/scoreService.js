import { endpoints } from "../endpoints";
import axios from "axios";

export const getAll = () =>  axios.get(endpoints.getScores)
export const getById = id => axios.get(endpoints.getScoreById + id)
export const add = data => axios.post(endpoints.addScore, data)
export const remove = id => axios.post(endpoints.deleteScore + id)
export const update = (id, data) => axios.post(endpoints.updateScore + id, data)
export const updateScoreByUserId = (id, data) => axios.post(endpoints.updateScoreByUserId + id, data)
