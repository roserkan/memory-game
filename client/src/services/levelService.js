import { endpoints } from "../endpoints";
import axios from "axios";

export const getAll = () =>  axios.get(endpoints.getLevels)
export const getById = id => axios.get(endpoints.getLevelById + id)
export const getByUserId = id => axios.get(endpoints.getLevelByUserId + id)
export const add = data => axios.post(endpoints.addLevel, data)
export const remove = id => axios.post(endpoints.deleteLevel + id)
export const update = (id, data) => axios.post(endpoints.updateLevel + id, data)
export const updateLevelByUserId = (id, data) => axios.post(endpoints.updateLevelByUserId + id, data)

