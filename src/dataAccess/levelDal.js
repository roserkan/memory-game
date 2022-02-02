const MongooseRepository = require('../core/dataAccess/repository/MongooseRepository');
const Level = require('../entities/level');

class LevelDal extends MongooseRepository{
    constructor(){
        super(Level);
    }


    async getLevelByUserId(id) {
        try {
            const result = await this.model.findOne({userId: id});
            return result;
        } catch (error) {
            return error;
        }
    }

    async updateScoreByUserId(id, object) {
        try {
            const currentLevel = await Level.findOne({userId: id});
            currentLevel.level[object.mod] = object.level
            const result = await Level.findByIdAndUpdate(currentLevel._id, currentLevel, { new: true });
            return result;
        } catch (error) {
            return error;
        }
    }

   
}

module.exports = LevelDal;