class MongooseRepository {
    constructor(model) {
        this.model = model;
    }

    async getAll() {
        try {
            const result = await this.model.find({});
            return result;
        } catch (error) {
            return error;
        }
    }

    async getById(id) {
        try {
            const result = await this.model.findById(id);
            return result;
        } catch (error) {
            return error;
        }
    }

    async add(object) {
        try {
            const result = await new this.model(object);
            await result.save();

            return result;
        } catch (error) {
            return error;
        }
    }

    async delete(id) {
        try {
            const result = await this.model.findByIdAndDelete(id);
            return result;
        } catch (error) {
            return error;
        }
    }

    async update(id, object) {
        try {
            const result = await this.model.findByIdAndUpdate(id, object, { new: true });
            return result;
        } catch (error) {
            return error;
        }
    }

}

module.exports = MongooseRepository;

