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
            res.status(500).json({status: httpStatusText.ERROR, msg :"Internt error Server"})
        }
    }

    static async delete(id, model) {
        try {
            const deletedObject = await model.findByIdAndDelete(id);
            console.log(deletedObject)
            if(deletedObject === null){
                res.status(404).json({status: httpStatusText.FAIL, msg :"--wrong Id"})
            }
            return deletedObject;
        } catch (error) {
            res.status(500).json({status: httpStatusText.ERROR, msg :"Internt error Server"})
        }
    }

    static async update(id, params, model) {
        try {
            const updatedObject = await model.findByIdAndUpdate(id, ...params, { new: true });
            if(!updatedObject){
                res.status(404).json({status: httpStatusText.FAIL, msg :"wrong Id"})
            }
            return updatedObject;
        } catch (error) {
            res.status(500).json({status: httpStatusText.ERROR, msg :"Internt error Server"})
        }
    }

    static async getAll(model) {
        try {
            const allObjects = await model.find();
            return allObjects;
        } catch (error) {
            res.status(500).json({status: httpStatusText.ERROR, msg :"Internt error Server"})
        }
    }

    static async getOne(id, model) {
        try {
            const object = await model.findById(id);
            if(!object){
                res.status(404).json({status: httpStatusText.FAIL, msg :"--wrong id"})
            }
            return object;
        } catch (error) {
            res.status(500).json({status: httpStatusText.ERROR, msg :"Internt error Server"})
        }
    }
}


module.exports = CRUD