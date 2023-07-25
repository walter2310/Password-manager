import express from 'express'
const router = express.Router()
import { check } from 'express-validator';

import * as userControllers from '../controllers/userControllers';
import { validateJWT } from '../middlewares/validateJWT';
import { verifyEmail } from '../helpers/db-validation';

router.get('/', validateJWT, userControllers.getAllUsers);

router.get('/:id', userControllers.getDataUser);

router.post('/', [
    check('name', 'The name is required').isString().notEmpty(),
    check('email', 'The email is required').isEmail().notEmpty(),
    check('password', 'The password is required').isString().notEmpty().isLength({ min: 6 }),
    check('secretKey', 'The secret key is required').isString().notEmpty().isLength({ min: 6 }),
    check('email').custom(verifyEmail)
],userControllers.createUser);

router.post('/login', [
    check('email', 'The email is required').isEmail().notEmpty(),
    check('password', 'The password is required').isString().notEmpty().isLength({ min: 6 }),
    check('secretKey', 'The secret key is required').notEmpty().isLength({ min: 6 }),
],userControllers.loginUser);

router.patch('/:id', validateJWT, userControllers.uploadUser);

router.delete('/:id', validateJWT, userControllers.removeUser);

export default router;