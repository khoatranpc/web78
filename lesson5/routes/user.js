import { Router } from 'express';
import userController from '../controllers/user.js';

const UserRouter = Router();
UserRouter.get('/users', userController.getAllUser);
UserRouter.post('/register', userController.register);
UserRouter.post('/login', userController.login);

export default UserRouter;