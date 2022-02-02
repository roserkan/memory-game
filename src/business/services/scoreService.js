const ScoreDal = require('../../dataAccess/scoreDal');
const { successResult, errorResult } = require('../../core/results/results');


class ScoreService {
    constructor() {
        this.scoreDal = new ScoreDal();
    }

    async getAll() {
        const result = await this.scoreDal.getAll();
        return successResult(result);
    }

    async getById(id) {
        const result = await this.scoreDal.getById(id);
        return successResult(result);
    }

    async add(object) {
        const result = await this.scoreDal.add(object);
        return successResult(result);
    }

    async delete(id) {
        const result = await this.scoreDal.delete(id);
        return successResult(result);
    }

    async update(id, object) {
        delete object.createdAt;
        delete object.updatedAt;

        const result = await this.scoreDal.update(id, object);
        return successResult(result);
    }

    async updateByUserId(id, object) {
        delete object.createdAt;
        delete object.updatedAt;



        const result = await this.scoreDal.updateScoreByUserId(id, object);
        return successResult(result);
    }


}

module.exports = ScoreService;