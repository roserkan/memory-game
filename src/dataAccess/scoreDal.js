const MongooseRepository = require('../core/dataAccess/repository/MongooseRepository');
const Score = require('../entities/score');

class ScoreDal extends MongooseRepository{
    constructor(){
        super(Score);
    }


    async updateScoreByUserId(id, object) {
        try {
            const currentLevel = await Score.findOne({userId: id});
            currentLevel.scores[object.mod][object.level] = object.point
            const result = await Score.findByIdAndUpdate(currentLevel._id, currentLevel, { new: true });
            return result;
        } catch (error) {
            return error;
        }
    }
   
}

module.exports = ScoreDal;