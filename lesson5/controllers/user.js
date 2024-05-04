import UserModel from '../models/user.js';
import bcrypt from 'bcrypt';

const userController = {
    getAllUser: async (req, res) => {
        const listUser = await UserModel.find({});
        res.status(200).send({
            data: listUser,
            message: 'Thành công!',
            success: true
        });
    },
    register: async (req, res) => {
        try {
            const data = req.body;
            // tạo chuỗi ngẫu nhiên
            const salt = bcrypt.genSaltSync();
            // thực hiện mã hoá với chuỗi salt
            const hash = bcrypt.hashSync(data.password, salt);
            const createdUser = await UserModel.create({
                ...data,
                password: hash,
                salt: salt
            });
            res.status(201).send({
                data: createdUser
            });
        } catch (error) {
            res.status(403).send({
                message: error.message
            });
        }
    },
    login: async (req, res) => {
        try {
            const data = req.body;
            const crrUser = await UserModel.findOne({
                email: data.email,
            });
            // so sánh mật khẩu
            if (!crrUser) {
                throw new Error("Sai tài khoản hoặc mật khẩu!");
            }
            if (bcrypt.hashSync(data.password, crrUser.salt) !== crrUser.password) {
                throw new Error("Sai tài khoản hoặc mật khẩu!");
            }
            res.status(200).send({
                data: crrUser
            });
        } catch (error) {
            res.status(401).send({
                message: error.message
            });
        }
    }
}

export default userController;
