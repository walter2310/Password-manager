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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPassword = exports.deletePassword = exports.updatePassword = exports.createPassword = exports.getPasswordsFromUser = void 0;
const passwordModel_1 = __importDefault(require("../models/passwordModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const getPasswordsFromUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            return res.status(401).json({
                msg: 'Token not valid - user not authenticated'
            });
        }
        passwordModel_1.default.find({ user: req.user.id }).then(function (passwords) {
            res.status(200).json({ status: 'OK', data: passwords });
        });
    }
    catch (error) {
        res.status(400).json({
            status: 'Failed',
            error: 'Could not get all passwords from user'
        });
    }
    ;
});
exports.getPasswordsFromUser = getPasswordsFromUser;
const createPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { serviceName, password } = req.body;
        let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 'abcdefghijklmnopqrstuvwxyz0123456789@#$';
        for (let i = 0; i <= 8; i++) {
            let char = Math.floor(Math.random() * str.length + 1);
            password += str.charAt(char);
        }
        const newPassword = new passwordModel_1.default({ serviceName, password });
        if (!req.user) {
            return res.status(401).json({
                msg: 'Token not valid - user not authenticated'
            });
        }
        newPassword.user = req.user.id;
        yield newPassword.save();
        res.status(200).json({ status: 'Ok', data: newPassword });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            status: 'Failed',
            error: 'Could not create the password'
        });
    }
    ;
});
exports.createPassword = createPassword;
const updatePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const rest = __rest(req.body, []);
        const salt = bcryptjs_1.default.genSaltSync();
        rest.password = bcryptjs_1.default.hashSync(rest.password, salt);
        const passwordToUpdate = yield passwordModel_1.default.findByIdAndUpdate(id, rest, {
            returnOriginal: false
        });
        res.status(200).json({ status: 'Ok', data: passwordToUpdate });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            status: 'Failed',
            error: 'Could not update the password'
        });
    }
    ;
});
exports.updatePassword = updatePassword;
const deletePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield passwordModel_1.default.findByIdAndDelete(id);
        res.status(200).json({ status: 'Password removed' });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            status: 'Failed',
            error: 'Could not delete the password'
        });
    }
    ;
});
exports.deletePassword = deletePassword;
const getPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { serviceName } = req.params;
        const { secretKey } = req.body;
        if (!req.user) {
            return res.status(401).json({
                msg: 'Token not valid - user not authenticated'
            });
        }
        const isMatch = yield bcryptjs_1.default.compare(secretKey, req.user.secretKey);
        if (!isMatch) {
            return res.status(401).json({
                msg: 'Invalid secret key'
            });
        }
        const password = yield passwordModel_1.default.findOne({ serviceName, user: req.user.id });
        if (!password) {
            return res.status(404).json({
                msg: 'Password not found'
            });
        }
        res.status(200).json({ status: 'OK', data: password.password });
    }
    catch (error) {
        res.status(400).json({
            status: 'Failed',
            error: 'Could not get password'
        });
    }
});
exports.getPassword = getPassword;
//# sourceMappingURL=passwordControllers.js.map