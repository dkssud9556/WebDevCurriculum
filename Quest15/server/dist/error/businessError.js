"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BusinessError extends Error {
    constructor(typename, statusCode, message) {
        super(message);
        this.typename = typename;
        this.statusCode = statusCode;
        this.message = message;
    }
}
exports.default = BusinessError;
//# sourceMappingURL=businessError.js.map