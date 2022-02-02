import { endpoints } from "../endpoints";
import axios from "axios";

export const getAll = () => axios.get(endpoints.getGameTypes)
export const getById = id => axios.get(endpoints.getGameTypeById + id)
export const add = data => {
    const formData = new FormData();
    formData.append('gameType', data.gameType);
    formData.append('image', data.image[0].originFileObj);
    return axios.post(endpoints.addGameType, formData, {
        headers: { 'content-type': 'multipart/form-data' }
    })
}
export const remove = id => axios.delete(endpoints.deleteGameType + id)
export const update = (id, data) => {
    const formData = new FormData();
    formData.append('gameType', data.gameType);
    if(data.image){
        console.log('image var')
        formData.append('image', data.image[0].originFileObj);
    }
    
    return axios.post(endpoints.updateGameType + id, formData, {
        headers: { 'content-type': 'multipart/form-data' }
    })
}