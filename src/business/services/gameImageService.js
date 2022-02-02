const GameImageDal = require('../../dataAccess/gameImageDal');
const { successResult, errorResult } = require('../../core/results/results');


class GameImageService {
    constructor() {
        this.gameImageDal = new GameImageDal();
    }

    async getAll() {
        const result = await this.gameImageDal.getAll();
        return successResult(result);
    }

    async getById(id) {
        const result = await this.gameImageDal.getById(id);
        return successResult(result);
    }

    async add(object) {
        const result = await this.gameImageDal.add(object);
        return successResult(result);
    }

    async delete(id) {
        const result = await this.gameImageDal.delete(id);
        return successResult(result);
    }

    async getByTypeId(id) {
        const result = await this.gameImageDal.getByTypeId(id);
        return successResult(result);
    }

    async update(id, object) {
        delete object.createdAt;
        delete object.updatedAt;

        const result = await this.gameImageDal.update(id, object);
        return successResult(result);
    }

}

module.exports = GameImageService;