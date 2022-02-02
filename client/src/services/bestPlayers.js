import { endpoints } from "../endpoints";
import axios from "axios";

export const getAll = () =>  axios.get(endpoints.bestPlayers)


