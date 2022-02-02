const MongooseRepository = require('../core/dataAccess/repository/MongooseRepository');
const User = require('../entities/user');

class UserDal extends MongooseRepository{
    constructor(){
        super(User);
    }

   
}

module.exports = UserDal;