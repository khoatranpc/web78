import { Router } from "express";
import userController from "../controllers/user.js";

const UserRouter = Router();

//   /users
UserRouter.post('', userController.createUser);
export default UserRouter;