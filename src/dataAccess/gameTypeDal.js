const MongooseRepository = require('../core/dataAccess/repository/MongooseRepository');
const GameType = require('../entities/gameType');

class GameTypeDal extends MongooseRepository{
    constructor(){
        super(GameType);
    }

   
}

module.exports = GameTypeDal;