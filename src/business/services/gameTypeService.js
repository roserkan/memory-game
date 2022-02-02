const GameTypeDal = require('../../dataAccess/gameTypeDal');
const { successResult, errorResult } = require('../../core/results/results');
const ValidationTool = require('../../core/corssCuttingCorcerns/validation/ValidationTool');
const schema = require('../../business/validationRules/gameTypeValidation');
const BusinessRules = require('../../core/business/businessRules')

class GameTypeService {
    constructor() {
        this.gameTypeDal = new GameTypeDal();
    }

    async getAll() {
        const result = await this.gameTypeDal.getAll();
        return successResult(result);
    }

    async getById(id) {
        const result = await this.gameTypeDal.getById(id);
        return successResult(result);
    }

    async add(object) {
        const err = BusinessRules(this.isValidated(object, schema), await this.isGameTypeUnique(object))
        if (err != null) return err

        const result = await this.gameTypeDal.add(object);
        return successResult(result);
    }

    async delete(id) {
        const result = await this.gameTypeDal.delete(id);
        return successResult(result);
    }

    async update(id, object) {
        delete object.createdAt;
        delete object.updatedAt;

        const err = BusinessRules(this.isValidated(object, schema), await this.isGameTypeUnique(object, id))
        if (err != null) return err

        const result = await this.gameTypeDal.update(id, object);
        return successResult(result);
    }

    isValidated(entity, schema) {
        const result = ValidationTool(entity, schema)
        if (result) return errorResult("VALIDATION ERROR")
        return true
    }

    async isGameTypeUnique(entity, id=0) {
        const items = await this.gameTypeDal.getAll();
        const result = items.filter(item => item.gameType === entity.gameType && item._id != id);
        
        if (result.length != 0) return errorResult("UNIQUE ERROR")
        return true
    }

}

module.exports = GameTypeService;