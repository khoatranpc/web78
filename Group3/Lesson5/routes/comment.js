import { Router } from "express";
import commentController from "../controllers/comment.js";
import { authMiddleware } from "../middlewares/auth.js";

const CommentRouter = Router();

CommentRouter.post('', authMiddleware.authentication, commentController.createComment);
CommentRouter.put('/:id', authMiddleware.authentication, commentController.updateComment);
export default CommentRouter;