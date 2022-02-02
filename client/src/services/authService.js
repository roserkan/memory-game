import { endpoints } from "../endpoints";
import axios from "axios";

export const login = data =>  axios.post(endpoints.login, data)
