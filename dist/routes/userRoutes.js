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
const userControllers = __importStar(require("../controllers/userControllers"));
const validateJWT_1 = require("../middlewares/validateJWT");
const db_validation_1 = require("../helpers/db-validation");
router.get('/', validateJWT_1.validateJWT, userControllers.getAllUsers);
router.get('/:id', userControllers.getDataUser);
router.post('/', [
    (0, express_validator_1.check)('name', 'The name is required').isString().notEmpty(),
    (0, express_validator_1.check)('email', 'The email is required').isEmail().notEmpty(),
    (0, express_validator_1.check)('password', 'The password is required').isString().notEmpty().isLength({ min: 6 }),
    (0, express_validator_1.check)('secretKey', 'The secret key is required').isString().notEmpty().isLength({ min: 6 }),
    (0, express_validator_1.check)('email').custom(db_validation_1.verifyEmail)
], userControllers.createUser);
router.post('/login', [
    (0, express_validator_1.check)('email', 'The email is required').isEmail().notEmpty(),
    (0, express_validator_1.check)('password', 'The password is required').isString().notEmpty().isLength({ min: 6 }),
    (0, express_validator_1.check)('secretKey', 'The secret key is required').notEmpty().isLength({ min: 6 }),
], userControllers.loginUser);
router.patch('/:id', validateJWT_1.validateJWT, userControllers.uploadUser);
router.delete('/:id', validateJWT_1.validateJWT, userControllers.removeUser);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map