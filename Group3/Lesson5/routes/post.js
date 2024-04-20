import { Router } from "express";
import postController from "../controllers/post.js";

const PostRouter = Router();

PostRouter.post('', postController.createPost);
export default PostRouter;