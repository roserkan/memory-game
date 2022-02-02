const MongooseRepository = require('../core/dataAccess/repository/MongooseRepository');
const BaseStep = require('../entities/baseStep');

class BaseStepDal extends MongooseRepository{
    constructor(){
        super(BaseStep);
    }

   
}

module.exports = BaseStepDal;