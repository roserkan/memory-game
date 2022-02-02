import { endpoints } from "../endpoints";
import axios from "axios";

export const getAll = () =>  axios.get(endpoints.getUsers)
export const getById = id => axios.get(endpoints.getUserById + id)
export const add = data => axios.post(endpoints.addUser, data)
export const remove = id => axios.post(endpoints.deleteUser + id)
export const update = (id, data) => axios.post(endpoints.updateUser + id, data)