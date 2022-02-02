function successResult(data, message = null){
    return {
        data: data,
        message: message ? message : 'Success',
        status: 200
    }
}

function errorResult(message = null){
    return {
        data: [],
        message: message ? message : 'Error',
        status: 400
    }
}

module.exports = {successResult, errorResult};