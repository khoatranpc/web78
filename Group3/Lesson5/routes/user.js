import { Router } from "express";
import userController from "../controllers/user.js";
import { authMiddleware } from "../middlewares/auth.js";

const validateCreateUser = (req, res, next) => {
    try {
        const { userName, email } = req.body;
        if (!userName) throw {
            message: 'userName is required!',
            status: 403
        }
        if (!email) throw {
            message: 'email is required!',
            status: 403
        }
        next();
    } catch (error) {
        res.status(error.status ?? 403).send({
            data: null,
            message: error.message,
            success: false
        });
    }
}
const UserRouter = Router();

//   /users
UserRouter.get('', authMiddleware.authentication, authMiddleware.authorizationAdmin, userController.getUser);
UserRouter.get('/:id', authMiddleware.authentication, userController.getUserById);
UserRouter.post('', validateCreateUser, userController.createUser);
export default UserRouter;