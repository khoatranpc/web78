import { Router } from "express";
import postController from "../controllers/post.js";

const PostRouter = Router();

const middlewareUpdatePost = (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) throw {
            message: 'Chưa cung cấp id bài post!'
        }
        const { authorId, content } = req.body;
        if (!authorId) throw {
            message: 'Chưa cung cấp authorId!'
        }
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
PostRouter.put('/:id', middlewareUpdatePost, postController.updatePost);

export default PostRouter;