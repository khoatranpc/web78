import UserModel from '../models/users.js';
import PostModel from '../models/posts.js';

const postController = {
    createPost: async (req, res) => {
        try {
            const { content, authorId } = req.body;
            if (!content) throw {
                message: 'content is required!',
                status: 403
            }
            if (!authorId) throw {
                message: 'authorId is required!',
                status: 403
            }
            // kiểm tra tồn tại user
            const crrUser = await UserModel.findById(authorId);
            if (!crrUser) throw {
                message: 'Không tồn tại user!'
            }
            const createdPost = await PostModel.create(req.body);

            res.status(201).send({
                data: createdPost,
                message: 'Tạo bài viết thành công!',
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
    updatePost: async (req, res) => {
        try {
            const { id } = req.params;
            const { authorId, content } = req.body;
            const crrPost = await PostModel.findById(id);
            if (!crrPost) throw {
                message: 'Không tìm thấy bài Post!'
            }
            const crrUser = await UserModel.findById(authorId);
            if (!crrUser) throw {
                message: 'Không tìm thấy thông tin người tạo bài!'
            }
            // so sánh authorId và authorId từ bài post -> xem xem có trùng khớp k?
            if (authorId !== crrPost.authorId) throw {
                message: 'Bạn không có quyền chỉnh sửa!'
            }
            crrPost.content = content;
            await crrPost.save();
            res.status(201).send({
                data: crrPost,
                message: 'Thành công',
                success: true
            })
        } catch (error) {
            res.status(error.status ?? 403).send({
                data: null,
                message: error.message,
                success: false
            });
        }
    }
}

export default postController;