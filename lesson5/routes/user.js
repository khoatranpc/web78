import { Router } from 'express';
import userController from '../controllers/user.js';

const UserRouter = Router();
UserRouter.get('/users', (req, res, next) => {
    console.log('pre-controller');
    next();
}, userController.getAllUser);

export default UserRouter;