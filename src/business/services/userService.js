const UserDal = require('../../dataAccess/userDal');
const LevelDal = require('../../dataAccess/levelDal');
const ScoreDal = require('../../dataAccess/scoreDal');
const GameModDal = require('../../dataAccess/gameModDal');
const { successResult, errorResult } = require('../../core/results/results');
const ValidationTool = require('../../core/corssCuttingCorcerns/validation/ValidationTool');
const schema = require('../../business/validationRules/userValidation');
const BusinessRules = require('../../core/business/businessRules');
const hashing = require('../../core/security/hashing')

class UserService {
    constructor() {
        this.userDal = new UserDal();
        this.levelDal = new LevelDal();
        this.scoreDal = new ScoreDal();
        this.gameModDal = new GameModDal();
    }

    async getAll() {
        const result = await this.userDal.getAll();
        return successResult(result);
    }

    async getById(id) {
        const result = await this.userDal.getById(id);
        return successResult(result);
    }

    async add(object) {
        const err = BusinessRules(this.isValidated(object, schema), await this.isUserNameUnique(object))
        if (err != null) return err

        object.password = hashing(object.password);



        
        const result = await this.userDal.add(object);

        const modes = await this.gameModDal.getAll();
        const modNames = modes.map(item => item.gameMod)
        let levelData = {}
        modNames.forEach(async item => {
            levelData[item] = 1
        });

        await this.levelDal.add({
            userId: result.id,
            level: levelData
        })

        let scoreData = {}
        modNames.forEach(item => {
            scoreData[item] = {
                level1: 0,
                level2: 0,
                level3: 0,
                level4: 0,
                level5: 0,
                level6: 0,
                level7: 0,
                level8: 0,
                level9: 0,
                level10: 0,
                level11: 0,
                level12: 0
            }

        });

        await this.scoreDal.add({
            userId: result.id,
            scores: scoreData
        })

        return successResult(result);
    }

    async delete(id) {
        const result = await this.userDal.delete(id);
        return successResult(result);
    }

    async update(id, object) {
        delete object.createdAt;
        delete object.updatedAt;

        const err = BusinessRules(this.isValidated(object, schema), await this.isUserNameUnique(object, id))
        if (err != null) return err


        const result = await this.userDal.update(id, object);
        return successResult(result);
    }


    isValidated(entity, schema) {
        const result = ValidationTool(entity, schema)
        if (result) return errorResult("VALIDATION ERROR")
        return true
    }

    async isUserNameUnique(entity, id = 0) {
        const items = await this.userDal.getAll();
        const result = items.filter(item => item.username === entity.username && item._id != id);

        if (result.length != 0) return errorResult("UNIQUE ERROR")
        return true
    }

}

module.exports = UserService;