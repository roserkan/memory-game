const { errorResult } = require("../results/results");


function BusinessRules() {

    for (const logic of arguments) {
        if(logic.status === 400){
            return  logic
        }     
    }

    return null

}

module.exports = BusinessRules