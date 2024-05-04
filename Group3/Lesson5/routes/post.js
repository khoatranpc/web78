import { Router } from "express";
import postController from "../controllers/post.js";
import { authMiddleware } from '../middlewares/auth.js';

const PostRouter = Router();

const middlewareUpdatePost = (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) throw {
            message: 'Chưa cung cấp id bài post!'
        }
        const { content } = req.body;
        if (!content) throw {
            message: 'Chưa cung cấp content!'
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
PostRouter.get('', postController.getAllPost);
PostRouter.post('', postController.createPost);
PostRouter.put('/:id', authMiddleware.authentication, middlewareUpdatePost, postController.updatePost);

export default PostRouter;