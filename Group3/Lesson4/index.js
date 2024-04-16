import express from 'express';
import mongooose from 'mongoose';
import UserModel from './models/users.js';
import PostModel from './models/posts.js';
import CommentModel from './models/comments.js';

await mongooose.connect('mongodb+srv://khoatranpc603:khoapc@web78-fullstack.rmaaizp.mongodb.net/learnmg?retryWrites=true&w=majority&appName=Web78-Fullstack')
const app = express();
app.use(express.json());

app.post('/api/v1/users', async (req, res) => {
    try {
        const { userName, email } = req.body;
        if (!userName) throw {
            message: 'userName is required!',
            status: 403
        }
        if (!email) throw {
            message: 'email is required!',
            status: 403
        }
        // kiểm tra tồn tại email
        const existedEmail = await UserModel.findOne({ email });
        if (existedEmail) throw new Error("Email has been existed!");
        const createdUser = await UserModel.create(req.body);
        res.status(201).send({
            data: createdUser,
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
});

app.post('/api/v1/posts', async (req, res) => {
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
});



app.post('/api/v1/comments', async (req, res) => {
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
});

// LOGIC í 5:

/**
 * 
 * Kiểm tra tồn tại comment
 * Kiểm tra xác thực user
 * 
 * -> tiến hành cập nhật findByIdAndUpdate
 */


app.put('/api/v1/comments/:id', async (req, res) => {
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
});
app.listen(8080, () => {
    console.log('Server chạy thành công!');
});
