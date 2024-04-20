import UserModel from '../models/users.js';
import PostModel from '../models/posts.js';
import CommentModel from '../models/comments.js';

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
    },
    getAllPost: async (req, res) => {
        try {
            const listPost = await PostModel.find();
            // thực hiện lấy tất cả các comment với các id của listPost
            // thực hiện duyệt danh sách listPost và trả về 1 mảng id
            const listId = listPost.map((post) => post._id.toString());

            // thực hiện đồng thời lấy tất cả comment cho từng postId
            const listComment = [];
            listId.forEach((postId) => {
                const cmts = CommentModel.find({
                    postId: postId
                }).limit(3);
                listComment.push(cmts);
            });
            const result = await Promise.all(listComment).then((value) => {
                return {
                    posts: listPost.map((post, idx) => {
                        return {
                            ...post.toObject(),
                            comments: value[idx]
                        }
                    })
                }
            });
            res.status(200).send({
                data: result,
            });
        } catch (error) {
            res.status(error.status ?? 500).send({
                data: null,
                message: error.message,
                success: false
            });
        }
    }
}

export default postController;