const GameModDal = require('../../dataAccess/gameModDal');
const { successResult, errorResult } = require('../../core/results/results');
const ValidationTool = require('../../core/corssCuttingCorcerns/validation/ValidationTool');
const schema = require('../../business/validationRules/gameModValidation');
const BusinessRules = require('../../core/business/businessRules')

class GameModService {
    constructor() {
        this.gameModDal = new GameModDal();
    }

    async getAll() {
        const result = await this.gameModDal.getAll();
        return successResult(result);
    }

    async getById(id) {
        const result = await this.gameModDal.getById(id);
        return successResult(result);
    }

    async add(object) {
        const err = BusinessRules(this.isValidated(object, schema), await this.isGameModUnique(object))
        if (err != null) return err

        const result = await this.gameModDal.add(object);
        return successResult(result);
    }

    async delete(id) {
        const result = await this.gameModDal.delete(id);
        return successResult(result);
    }

    async update(id, object) {
        delete object.createdAt;
        delete object.updatedAt;

        const err = BusinessRules(this.isValidated(object, schema), await this.isGameModUnique(object, id))
        if (err != null) return err

        const result = await this.gameModDal.update(id, object);
        return successResult(result);
    }


    isValidated(entity, schema) {
        const result = ValidationTool(entity, schema)
        if (result) return errorResult("VALIDATION ERROR")
        return true
    }

    async isGameModUnique(entity, id=0) {
        const items = await this.gameModDal.getAll();
        const result = items.filter(item => item.gameMod === entity.gameMod && item._id != id);
        
        if (result.length != 0) return errorResult("UNIQUE ERROR")
        return true
    }


}

module.exports = GameModService;