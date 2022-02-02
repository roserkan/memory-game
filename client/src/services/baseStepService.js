import { endpoints } from "../endpoints";
import axios from "axios";

export const getAll = () =>  axios.get(endpoints.getBaseSteps)
export const getById = id => axios.get(endpoints.getBaseStepById + id)
export const add = data => axios.post(endpoints.addBaseStep, data)
export const remove = id => axios.post(endpoints.deleteBaseStep + id)
export const update = (id, data) => axios.post(endpoints.updateBaseStep + id, data)