import express from 'express';
const router = express.Router();
import { check } from 'express-validator';

import * as passwordControllers from '../controllers/passwordControllers';
import { validateJWT } from '../middlewares/validateJWT';

router.get('/', validateJWT, passwordControllers.getPasswordsFromUser);

router.get('/:serviceName', validateJWT, passwordControllers.getPassword);

router.post('/',[
    check('serviceName', 'The service name is required').isString().notEmpty(),
    check('password', 'The password is required').isString().notEmpty().isLength({ min: 8 }),
    validateJWT
] ,passwordControllers.createPassword);

router.patch('/:id', [
    check('serviceName', 'The service name is required').isString().notEmpty(),
    check('password', 'The password is required').isString().notEmpty().isLength({ min: 8 }),
    validateJWT
], passwordControllers.updatePassword);

router.delete('/:id', validateJWT, passwordControllers.deletePassword);

export default router;