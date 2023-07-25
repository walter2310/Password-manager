"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const express_validator_1 = require("express-validator");
const passwordControllers = __importStar(require("../controllers/passwordControllers"));
const validateJWT_1 = require("../middlewares/validateJWT");
router.get('/', validateJWT_1.validateJWT, passwordControllers.getPasswordsFromUser);
router.get('/:serviceName', validateJWT_1.validateJWT, passwordControllers.getPassword);
router.post('/', [
    (0, express_validator_1.check)('serviceName', 'The service name is required').isString().notEmpty(),
    (0, express_validator_1.check)('password', 'The password is required').isString().notEmpty().isLength({ min: 8 }),
    validateJWT_1.validateJWT
], passwordControllers.createPassword);
router.patch('/:id', [
    (0, express_validator_1.check)('serviceName', 'The service name is required').isString().notEmpty(),
    (0, express_validator_1.check)('password', 'The password is required').isString().notEmpty().isLength({ min: 8 }),
    validateJWT_1.validateJWT
], passwordControllers.updatePassword);
router.delete('/:id', validateJWT_1.validateJWT, passwordControllers.deletePassword);
exports.default = router;
//# sourceMappingURL=passwordRoutes.js.map