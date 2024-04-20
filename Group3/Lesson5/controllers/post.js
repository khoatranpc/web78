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
    }
}

export default postController;