const httpStatusText = require("./httpStatusText");

class AppError extends Error {
    constructor(message, statusCode = 500, statusText = httpStatusText.ERROR) {
        super(message);
        this.statusCode = statusCode;
        this.statusText = statusText;
    }

    static create(message, statusCode, statusText) {
        return new AppError(message, statusCode, statusText);
    }
}

module.exports = AppError;
