const LevelDal = require('../../dataAccess/levelDal');
const { successResult, errorResult } = require('../../core/results/results');


class LevelService {
    constructor() {
        this.levelDal = new LevelDal();
    }

    async getAll() {
        const result = await this.levelDal.getAll();
        return successResult(result);
    }

    async getById(id) {
        const result = await this.levelDal.getById(id);
        return successResult(result);
    }

    async getByUserId(id) {
        const result = await this.levelDal.getLevelByUserId(id);
        return successResult(result);
    }

    async add(object) {
        const result = await this.levelDal.add(object);
        return successResult(result);
    }

    async delete(id) {
        const result = await this.levelDal.delete(id);
        return successResult(result);
    }

    async update(id, object) {
        delete object.createdAt;
        delete object.updatedAt;

        const result = await this.levelDal.update(id, object);
        return successResult(result);
    }

    async updateByUserId(id, object) {
        delete object.createdAt;
        delete object.updatedAt;



        const result = await this.levelDal.updateScoreByUserId(id, object);
        return successResult(result);
    }

   
}

module.exports = LevelService;