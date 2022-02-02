const MongooseRepository = require('../core/dataAccess/repository/MongooseRepository');
const GameMod = require('../entities/gameMod');


class GameModDal extends MongooseRepository{
    constructor(){
        super(GameMod);
    }

   
}

module.exports = GameModDal;