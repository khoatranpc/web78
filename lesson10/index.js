import express from 'express';
import multer from 'multer';
import mongoose from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';
import PostModel from './models/posts.js';
await mongoose.connect('mongodb+srv://khoatranpc603:khoapc@web78-fullstack.rmaaizp.mongodb.net/learnmg?retryWrites=true&w=majority&appName=Web78-Fullstack');


cloudinary.config({
    cloud_name: 'dxo374ch8',
    api_key: '399236672491454',
    api_secret: 'qYDv0H5pDyR81eueVbGgSsKGOHQ'
});

const app = express();

// khởi tạo multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Xử lý yêu cầu tải lên tệp
app.post('/upload', upload.single('khoa'), (req, res) => {
    // Truy cập dữ liệu tệp từ req.file
    const file = req.file;
    if (!file) {
        return res.status(400).json({ error: 'Không có tệp được tải lên.' });
    }
    const dataUrl = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
    const fileName = file.originalname.split('.')[0];

    cloudinary.uploader.upload(dataUrl, {
        public_id: fileName + (new Date()).getTime(),
        resource_type: 'auto',
        // có thể thêm field folder nếu như muốn tổ chức
    }, (err, result) => {
        if (result) {
            res.json({
                message: 'Tệp được tải lên thành công.', data: {
                    url: result.secure_url
                }
            });
            return;
            // lấy secure_url từ đây để lưu vào database.
        } else {
            res.json({
                message: err,
                data: null
            });
        }
    });
});

app.post('/api/v1/posts', upload.array('images'), async (req, res) => {
    try {
        const { content, authorId } = req.body;
        const images = req.files;
        // nếu thông tin bài đăng mà có file thì mới xử lý logic upload file, còn không thì chỉ tạo bài viết bình thường
        if (images) {
            const newPost = new PostModel({
                content, authorId, images: []
            });
            const queueUpload = images.map((image) => {
                const dataUrl = `data:${image.mimetype};base64,${image.buffer.toString('base64')}`;
                const fileName = image.originalname.split('.')[0];
                return cloudinary.uploader.upload(dataUrl, {
                    public_id: fileName + (new Date()).getTime(),
                    resource_type: 'auto',
                    // có thể thêm field folder nếu như muốn tổ chức
                });
            });
            const listDataUploaded = await Promise.all(queueUpload);
            newPost.images = listDataUploaded.map((item) => item.secure_url);
            await newPost.save();
            res.status(201).send({
                data: newPost,
                message: 'Tạo bài đăng thành công!'
            });
        } else {
            const createdPost = await PostModel.create({ content, authorId });
            res.status(201).send({
                data: createdPost,
                message: 'Tạo bài đăng thành công!'
            });
        }
    } catch (error) {
        res.status(500).send({
            data: null,
            message: error.message
        });
    }
});

app.get('/api/v1/posts/:id', async (req, res) => {
    const crrPost = await PostModel.findById(req.params.id);
    res.status(200).send({
        data: crrPost,
        message: 'Thành công!'
    });
})

app.listen(8000, () => {
    console.log(`Server chạy thành công!`);
});

/**
 * Yêu cầu bài tập
 * 1. Thực hiện tạo bài post như bình thường, nhưng lúc này, có thêm đính kèm hình ảnh (1 hình ảnh)
 *  Lúc trả kết quả về khi lấy thông tin bài post, thì phải lấy được cả đường link hình ảnh
 * 
 * 2. Cho phép khi cập nhật bài viết, thì sẽ cho cả cập nhật hình ảnh (1 hình ảnh), sẽ tải lên file mới và thực hiện upload như ban đầu
 * 3. Cho phép khi tạo bài post, thì có thể thêm được nhiều hình ảnh
 */