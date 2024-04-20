import { Router } from "express";
import commentController from "../controllers/comment.js";

const CommentRouter = Router();

CommentRouter.post('', commentController.createComment);
CommentRouter.put('/:id', commentController.updateComment);
export default CommentRouter;