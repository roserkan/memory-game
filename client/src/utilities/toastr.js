import { notification } from 'antd'

export const toastr = (type, message, description, duration = 2) => {

    notification.config({
        duration: duration
    });

    notification[type]({
        message,
        description
    });
};