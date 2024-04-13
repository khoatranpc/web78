import express from 'express';
import crypto from 'crypto';
import axios from 'axios';

const app = express();
app.use(express.json());
const API_JSON_SERVER = 'http://localhost:3000';

app.get('', (req, res) => {
    res.send({
        message: 'Kết nối thành công!'
    });
});

/**
 * 
 * Viết API việc đăng ký user với userName, 
 * id sẽ được là một string ngẫu nhiên, không được phép trùng, 
 * bắt đầu từ ký tự US (ví dụ: US8823).
 * 
 * 
 * Đăng ký: là thay đổi dữ liệu (theo trường phái thêm) -> dùng phương thức: POST
 */

app.post('/users', async (req, res) => {
    try {
        const { userName } = req.body;
        if (!userName) throw {
            message: 'Bạn chưa cung cấp tên người dùng!',
            statusCode: 403
        }
        const newId = `US${crypto.randomUUID()}`;
        // khởi tạo thông tin user mới
        const newUser = {
            "id": newId,
            "userName": userName
        }
        // gọi API của json-server thực hiện việc thêm dữ liệu newUser vào trong file db.json với resource là users
        const createdUser = await axios.post(`${API_JSON_SERVER}/users`, newUser);

        res.status(201).send({
            message: 'Đăng ký thông tin người dùng thành công!',
            data: createdUser.data
        });

    } catch (error) {
        res.status(error.statusCode ?? 500).send({
            ...error,
            data: null
        });
    }
});

app.post('/posts', async (req, res) => {
    try {
        const { content, authorId } = req.body;
        if (!content || !authorId)
            throw {
                message: (!content ? 'Chưa có nội dung của bài đăng!' :
                    (!authorId ? 'Không xác định được người dùng' : 'Bài đăng chưa có nội dung, không xác định được người dùng!')
                ),
                statusCode: !content ? 403 : 401
            }
        // thiếu 1 bước kiểm tra author id có xác thực hay không?
        const crrUser = await axios.get(`${API_JSON_SERVER}/users/${authorId}`).then((rs) => {
            return rs.data;
        }).catch((err) => {
            return undefined;
        });

        if (!crrUser) throw {
            message: 'Không xác thực được người dùng!',
            statusCode: 401
        }
        // thêm
        const newId = `PS${crypto.randomUUID()}`;

        const newPost = {
            "id": newId,
            "content": content,
            "authorId": authorId
        }
        // gọi API của json-server thực hiện việc thêm dữ liệu newUser vào trong file db.json với resource là users
        const creatednewPost = await axios.post(`${API_JSON_SERVER}/posts`, newPost);

        res.status(201).send({
            message: 'Tạo bài thành công!',
            data: creatednewPost.data
        });
    } catch (error) {
        res.status(error.statusCode ?? 500).send({
            ...error,
            data: null
        });
    }
});


// YC3:
/**
 * Chỉnh sửa bài post
 * bài post phải tồn tại
 * 
 * Kiểm tra tồn tại user
 * 
 * tiến hành cập nhật
 * 
 */


app.put('/posts/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { content, authorId } = req.body;

        if (!content) throw {
            message: 'Nội dung không được trống!',
            statusCode: 403
        }
        // kiểm tra tồn tại bài post
        const crrPost = await axios.get(`${API_JSON_SERVER}/posts/${id}`).then((rs) => {
            return rs.data;
        }).catch((err) => {
            return undefined;
        });

        if (!crrPost) throw {
            message: 'Không tồn tại bài đăng!',
            statusCode: 404
        }

        // kiểm tra tồn tại user
        const crrUser = await axios.get(`${API_JSON_SERVER}/users/${authorId}`).then((rs) => {
            return rs.data;
        }).catch((err) => {
            return undefined;
        });

        if (!crrUser) throw {
            message: 'Không xác thực được người dùng!',
            statusCode: 401
        }

        // cập nhật thông tin bài đăng
        const updatedPost = await axios.put(`${API_JSON_SERVER}/posts/${id}`, {
            ...crrPost,
            content
        });
        res.status(201).send({
            data: updatedPost.data,
            message: 'Cập nhật thành công!'
        });


    } catch (error) {
        res.status(error.statusCode ?? 500).send({
            ...error,
            data: null
        });
    }
});

app.listen(8080, () => {
    console.log('Server đã chạy thành công!');
});