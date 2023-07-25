"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
const validateJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            status: 'FAILED',
            data: {
                error: 'You do not have any token',
            }
        });
    }
    ;
    try {
        const { id } = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const user = yield userModel_1.default.findById(id);
        if (!user) {
            return res.status(401).json({
                msg: 'Token not valid - user do not exists in DB'
            });
        }
        req.user = user;
        next();
    }
    catch (error) {
        console.log(error);
        res.status(403);
    }
});
exports.validateJWT = validateJWT;
//# sourceMappingURL=validateJWT.js.map