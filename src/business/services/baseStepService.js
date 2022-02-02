const BaseStepDal = require('../../dataAccess/baseStepDal');
const { successResult, errorResult } = require('../../core/results/results');


class BaseStepService {
    constructor() {
        this.baseStepDal = new BaseStepDal();
    }

    async getAll() {
        const result = await this.baseStepDal.getAll();
        return successResult(result);
    }

    async getById(id) {
        const result = await this.baseStepDal.getById(id);
        return successResult(result);
    }

    async add(object) {
        const result = await this.baseStepDal.add(object);
        return successResult(result);
    }

    async delete(id) {
        const result = await this.baseStepDal.delete(id);
        return successResult(result);
    }

    async update(id, object) {
        delete object.createdAt;
        delete object.updatedAt;

        const result = await this.baseStepDal.update(id, object);
        return successResult(result);
    }

}

module.exports = BaseStepService;