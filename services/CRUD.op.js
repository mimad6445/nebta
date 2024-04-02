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
            res.status(500).json({status: httpStatusText.ERROR, msg :`Internt error Server ${error}`})
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
            res.status(500).json({status: httpStatusText.ERROR, msg :`Internt error Server ${error}`})
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
            res.status(500).json({status: httpStatusText.ERROR, msg :`Internt error Server ${error}`})
        }
    }

    static async getAll(model) {
        try {
            const allObjects = await model.find();
            return allObjects;
        } catch (error) {
            res.status(500).json({status: httpStatusText.ERROR, msg :`Internt error Server ${error} `})
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
            res.status(500).json({status: httpStatusText.ERROR, msg :`Internt error Server ${error}`})
        }
    }
}


module.exports = CRUD