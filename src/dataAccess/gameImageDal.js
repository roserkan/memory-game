const MongooseRepository = require('../core/dataAccess/repository/MongooseRepository');
const GameImage = require('../entities/gameImage');

class GameImageDal extends MongooseRepository{
    constructor(){
        super(GameImage);
    }

   
    async getByTypeId(id) {
        try {
            const result = await GameImage.find({gameTypeId: id});
            return result;
        } catch (error) {
            return error;
        }
    }

}

module.exports = GameImageDal;