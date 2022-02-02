import { endpoints } from "../endpoints";
import axios from "axios";

export const getAll = () => axios.get(endpoints.getGameImages)
export const getById = id => axios.get(endpoints.getGameImageById + id)
export const getByTypeId = id => axios.get(endpoints.getGameImageByTypeId + id)

export const add = data => {
    const formData = new FormData();
    data.image.forEach(item => {
        formData.append('image', item.originFileObj);
    });
    formData.append('gameTypeId', data.gameTypeId);

    return axios.post(endpoints.addGameImage, formData, {
        headers: { 'content-type': 'multipart/form-data' }
    })

}
export const remove = id => axios.delete(endpoints.deleteGameImage + id)
export const update = (id, data) => {
    const formData = new FormData();
    data.image.forEach(item => {
        formData.append('image', item.originFileObj);
    });
    return axios.post(endpoints.updateGameImage + id, formData, {
        headers: { 'content-type': 'multipart/form-data' }
    })
}