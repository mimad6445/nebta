const AppError = require("../utils/AppError");
const httpStatusText = require("../utils/httpStatusText")


class CRUD {
    constructor() {}

    static async create(params, model) {
        try {
            const newObject = new model(...params);
            const savedObject = await newObject.save();
            return savedObject;
        } catch (error) {
            const errorObj = AppError.create("Internt error Server",500,httpStatusText.ERROR);
            return next(errorObj);
        }
    }

    static async delete(id, model) {
        try {
            const deletedObject = await model.findByIdAndDelete(id);
            console.log(deletedObject)
            if(deletedObject === null){
                const errorObj = AppError.create("--wrong id",404,httpStatusText.ERROR);
                next(errorObj);
            }
            return deletedObject;
        } catch (error) {
            const errorObj = AppError.create("Internt error Server",500,httpStatusText.ERROR);
            return next(errorObj);
        }
    }

    static async update(id, params, model) {
        try {
            const updatedObject = await model.findByIdAndUpdate(id, ...params, { new: true });
            if(!updatedObject){
                const errorObj = AppError.create("--wrong id",404,httpStatusText.ERROR);
                return next(errorObj);
            }
            return updatedObject;
        } catch (error) {
            const errorObj = AppError.create("Internt error Server",500,httpStatusText.ERROR);
            return next(errorObj);
        }
    }

    static async getAll(model) {
        try {
            const allObjects = await model.find();
            return allObjects;
        } catch (error) {
            const errorObj = AppError.create("Internt error Server",500,httpStatusText.ERROR);
            return next(errorObj);
        }
    }

    static async getOne(id, model) {
        try {
            const object = await model.findById(id);
            if(!object){
                const errorObj = AppError.create("--wrong id",404,httpStatusText.ERROR);
                return next(errorObj);
            }
            return object;
        } catch (error) {
            const errorObj = AppError.create("Internt error Server",500,httpStatusText.ERROR);
            return next(errorObj);
        }
    }
}


module.exports = CRUD