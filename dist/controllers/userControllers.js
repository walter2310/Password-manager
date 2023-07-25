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
exports.removeUser = exports.uploadUser = exports.loginUser = exports.getDataUser = exports.createUser = exports.getAllUsers = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const generateJWT_1 = __importDefault(require("../helpers/generateJWT"));
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        userModel_1.default.find({}).then(function (users) {
            res.status(200).json({ status: 'OK', data: users });
        });
    }
    catch (error) {
        res.status(400).json({
            status: 'Failed',
            error: 'Could not get all users'
        });
    }
    ;
});
exports.getAllUsers = getAllUsers;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, secretKey } = req.body;
        const user = new userModel_1.default({ name, email, password, secretKey });
        const salt = bcryptjs_1.default.genSaltSync();
        user.password = bcryptjs_1.default.hashSync(password, salt);
        user.secretKey = bcryptjs_1.default.hashSync(secretKey, salt);
        yield user.save();
        res.status(200).json({ status: 'Ok', data: user });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            status: 'Failed',
            error: 'Could not create the user'
        });
    }
    ;
});
exports.createUser = createUser;
const getDataUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const getUser = yield userModel_1.default.findById(id);
        res.status(200).json({ status: 'Ok', data: getUser });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            status: 'Failed',
            error: 'Could not get the user'
        });
    }
});
exports.getDataUser = getDataUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, secretKey } = req.body;
        const user = yield userModel_1.default.findOne({ email });
        if (!user) {
            return res.status(403).json({ msg: 'The email do not exists in DB' });
        }
        const validPassword = bcryptjs_1.default.compareSync(password, user.password);
        const validKey = bcryptjs_1.default.compareSync(secretKey, user.secretKey);
        if (!validPassword) {
            return res.status(403).json({ msg: 'The email or the password is not correct' });
        }
        ;
        if (!validKey) {
            return res.status(403).json({ msg: 'The email or the password is not correct' });
        }
        ;
        const salt = bcryptjs_1.default.genSaltSync();
        user.password = bcryptjs_1.default.hashSync(password, salt);
        user.secretKey = bcryptjs_1.default.hashSync(secretKey, salt);
        return res.status(200).json({ status: 'OK', token: (0, generateJWT_1.default)(user._id) });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            status: 'FAILED',
            data: { error: 'Could not login' }
        });
    }
    ;
});
exports.loginUser = loginUser;
const uploadUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
    }
    ;
});
exports.uploadUser = uploadUser;
const removeUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
    }
    ;
});
exports.removeUser = removeUser;
//# sourceMappingURL=userControllers.js.map