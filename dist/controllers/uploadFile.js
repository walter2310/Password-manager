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
exports.uploadFileToDB = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const uploadFileToDB = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { id } = req.params;
        const userData = yield userModel_1.default.findByIdAndUpdate(id, {
            img: (_a = req.file) === null || _a === void 0 ? void 0 : _a.path
        }, { returnOriginal: false });
        res.status(200).json({ status: 'ok', data: userData });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            status: 'Failed',
            error: 'Could not upload the img'
        });
    }
    ;
});
exports.uploadFileToDB = uploadFileToDB;
//# sourceMappingURL=uploadFile.js.map