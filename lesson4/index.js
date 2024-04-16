import express from 'express';
import mongoose from 'mongoose';
import UserModel from './models/users.js';

await mongoose.connect('mongodb+srv://khoatranpc603:khoapc@web78-fullstack.rmaaizp.mongodb.net/learnmg?retryWrites=true&w=majority&appName=Web78-Fullstack');
const app = express();

app.use(express.json());

app.post('/api/v1/users', async (req, res) => {
    try {
        const { userName, email } = req.body;
        if (!userName) throw new Error('userName is required!');
        if (!email) throw new Error('email is required!');

        // phương thức tìm kiếm 1 dữ liệu, đầu tiên, phù hợp với giá trị truyền trong object của phương thức
        const existedEmail = await UserModel.findOne({
            email
        });
        if (existedEmail) throw new Error('Email already exists!');
        // thêm: 1
        const createdUser = await UserModel.create({
            userName,
            email
        });
        res.status(201).send({
            data: createdUser,
            message: 'Register successful!',
            success: true
        });
    } catch (error) {
        res.status(403).send({
            message: error.message,
            data: null,
            success: false
        });
    }
});

app.get('/api/v1/users', async (req, res) => {
    // phương thức lấy ra tất cả các phần tử hiện tại có trong collection của model
    const listUser = await UserModel.find({});
    res.status(200).send({
        data: listUser,
        message: 'Successful!',
        success: true
    });
});

app.get('/api/v1/users/:id', async (req, res) => {
    const { id } = req.params;
    const crrUser = await UserModel.findById(id);
    res.status(200).send({
        data: crrUser,
        message: 'Successful!',
        success: true
    });
});

app.listen(8080, () => {
    console.log('Server đã được chạy rùi nè!');
});