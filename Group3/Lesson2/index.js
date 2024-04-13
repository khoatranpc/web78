import express from 'express';
import crypto from 'crypto';
import { posts, users } from './data.js';

const app = express();

// phải có dòng này mới đọc được dữ liệu từ body
app.use(express.json());

// YC1:
/**
 * Khởi tạo api /users, với phương thức get và nhận đầu vào params là id
 * Thực hiện logic tìm kiếm user với id tương ứng
 * -> nếu tìm thấy, thì trả thông tin user
 * -> không tìm thấy, thì trả ra thông báo: không tìm thấy thông tin người dùng
 */

app.get('/users/:id', (req, res) => {
    const { id } = req.params;

    const crrUser = users.find((user) => user.id === id);
    res.send(crrUser ?? "Không tìm thấy thông tin người dùng!");
});

/**
 * YC2:
 * Khởi tạo api /users, với phương thức post
 * Nhận dữ liệu từ body -> thông tin: email (email phải là duy nhất), userName, age
 * id là tạo random (duy nhất) tạo từ code
 * 
 * -> tiến hành thêm dữ liệu vào users
 */

app.post('/users', (req, res) => {
    const dataUser = req.body;
    const existedEmail = users.find((user) => user.email === dataUser.email);

    if (existedEmail) {
        res.send("Email đã tồn tại!");
    } else {
        const randomId = crypto.randomUUID();
        users.push({
            id: randomId,
            ...dataUser
        });
        res.send(users);
    }
});


/**
 * YC3:
 * Lấy ra tất cả các bài post của user, với id của user được truyền trên params
 * Đối với API này, REST api quy định như thế nào
 * 
 * 
 * - Các bước
 *  b1: tìm kiếm user với user id được truyền trên params
 *  b2: nếu tồn tại user -> lọc các bài post có userId tương ứng
 */

app.get('/users/:id/posts', (req, res) => {
    const { id } = req.params;
    const existedUser = users.find(user => user.id === id);
    if (!existedUser) {
        res.send("Không tồn tại người dùng!");
    } else {
        const listPost = posts.filter(post => post.userId === id);
        res.send(listPost);
    }
});

/**
 * 
 * YC4
 * Thể hiện API y như bài 3, thay phương thức get -> post; logic sẽ là logic thêm bài post
 *  b1: tìm kiếm user với user id được truyền trên params
 *  b2: nếu tồn tại user -> thực hiện thêm dữ liệu bài post
 */

app.post('/users/:id/posts', (req, res) => {
    const { id } = req.params;
    const dataPost = req.body;
    const existedUser = users.find(user => user.id === id);
    if (!existedUser) {
        res.send("Không tồn tại người dùng!");
    } else {
        const randomId = crypto.randomUUID();
        posts.push({
            postId: randomId,
            userId: id,
            ...dataPost
        });
        res.send(posts);
    }
});


/**
 * 
 * YC5:
 * 
 * Viết api theo post
 */

app.put('/posts/:id', (req, res) => {
    const { id } = req.params;
    const dataPostUpdate = req.body;
    const {userId} = req.query;
    const crrPost = posts.find(post => post.postId === id);

    if (!crrPost) {
        res.send("Không tồn tại bài post!");
    } else {
        // how to check user have permission , làm thế nào để kiểm tra người dùng có quyền
        // đối với các API get -> có 1 cách thực hiện cung cấp, kiểm tra key trên query params
        // coi như mặc định, sẽ truyền userId lên trên api với query params
        const existedUser = users.find(user => user.id === id);
        if (!existedUser) {
            res.send("Không tồn tại người dùng!");
        } else {
            const compareUserId = crrPost.userId === userId;
            if (compareUserId) {
                // thực hiện logic cập nhật nội dung bài post với dataPostUpdate (Không cập nhật userId, postId)
            } else {
                res.send("Người dùng không có quyền chỉnh sửa!");
            }
        }
    }
});

app.listen(8080, () => {
    console.log('Server chạy thành công!');
});
