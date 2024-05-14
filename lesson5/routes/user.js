import { Router } from 'express';
import userController from '../controllers/user.js';
import middlewares from '../middlewares/index.js';

const UserRouter = Router();
UserRouter.get('/users', userController.getAllUser);
UserRouter.get('/users/:id', middlewares.verifyJwt(), userController.getOneUser);
UserRouter.post('/register', userController.register);
UserRouter.post('/login', userController.login);
UserRouter.post('/reset-password', middlewares.verifyJwt(), userController.resetPassword);
UserRouter.get('/forgot-password', userController.forgotPassword);

export default UserRouter;