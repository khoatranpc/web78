import UserModel from '../models/users.js';
import CommentModel from '../models/comments.js';
import PostModel from '../models/posts.js';

const commentController = {
    createComment: async (req, res) => {
        try {
            const { content, authorId, postId } = req.body;
            if (!content) throw {
                message: 'content is required!',
                status: 403
            }
            if (!authorId) throw {
                message: 'authorId is required!',
                status: 403
            }
            if (!postId) throw {
                message: 'postId is required!',
                status: 403
            }
            // kiểm tra tồn tại user
            const crrUser = await UserModel.findById(authorId);
            if (!crrUser) throw {
                message: 'Không tồn tại user!'
            }
            const crrPost = await PostModel.findById(postId);
            if (!crrPost) throw {
                message: 'Không tồn tại bài post!'
            }

            const createdPost = await CommentModel.create(req.body);

            res.status(201).send({
                data: createdPost,
                message: 'Tạo bình luận thành công!',
                success: true
            });

        } catch (error) {
            res.status(error.status ?? 403).send({
                data: null,
                message: error.message,
                success: false
            });
        }
    },
    updateComment: async (req, res) => {
        try {
            const { id } = req.params;
            const { content, authorId } = req.body;
            if (!content) throw {
                message: 'content is required!',
                status: 403
            }
            if (!authorId) throw {
                message: 'authorId is required!',
                status: 403
            }
            const crrUser = await UserModel.findById(authorId);
            if (!crrUser) throw {
                message: 'Không tồn tại user!'
            }
            await CommentModel.findByIdAndUpdate(id, {
                content
            });
            res.status(201).send({
                data: { content, authorId, commentId: id },
                message: 'Successful',
                success: true
            });
        } catch (error) {
            res.status(error.status ?? 403).send({
                data: null,
                message: error.message,
                success: false
            });
        }
    }
}

export default commentController;