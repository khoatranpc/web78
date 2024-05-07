import { Router } from 'express';
import userController from '../controllers/user.js';
import { token } from '../utils/index.js';

const UserRouter = Router();
UserRouter.get('/users', userController.getAllUser);
UserRouter.get('/users/:id', (req, res, next) => {
    try {
        // lấy token được gửi lên ra
        const accessToken = req.headers.authorization.split(" ")[1];
        if (!accessToken) throw new Error();
        // kiểm tra token
        const data = token.verifyToken(accessToken);
        // kiểm tra xem người dùng có được phép xem thông tin của user id trên param hay k?
        if (data._id !== req.params.id) throw new Error();
        req.dataToken = data;
        next();
    } catch (error) {
        res.status(401).send({
            message: error.message ?? 'Bạn không thể thực hiện hành động!',
            data: null
        });
    }
}, userController.getOneUser);
UserRouter.post('/register', userController.register);
UserRouter.post('/login', userController.login);
UserRouter.post('/reset-password', userController.resetPassword);
UserRouter.get('/forgot-password', userController.forgotPassword);

export default UserRouter;