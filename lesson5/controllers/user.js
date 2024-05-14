import { verifyCodes } from '../global.js';
import UserModel from '../models/user.js';
import bcrypt from 'bcrypt';
import { token } from '../utils/index.js';

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
            const dataResponse = {
                ...crrUser.toObject()
            }
            delete dataResponse.password;
            delete dataResponse.salt;

            const tkAt = token.generateToken({
                email: crrUser.email,
                _id: crrUser._id,
                tokenType: 'AT'
            });
            const tkRf = token.generateToken({
                email: crrUser.email,
                _id: crrUser._id,
                tokenType: 'RT'
            }, 1000 * 60 * 60 * 2);

            res.status(200).send({
                data: {
                    accessToken: tkAt,
                    refreshToken: tkRf
                }
            });
        } catch (error) {
            res.status(401).send({
                message: error.message
            });
        }
    },
    resetPassword: async (req, res) => {
        try {
            const { email, password, confirmNewPassword, newPassword, verifyCode } = req.body;
            // kiểm tra tồn tại tài khoản
            const crrUser = await UserModel.findOne({ email, _id: req.dataToken._id });
            if (!crrUser) throw {
                message: 'Không tồn tại người dùng!'
            }
            if (verifyCode) {
                // kiểm tra verify code
                const checked = verifyCodes.findIndex((item) => {
                    return item.email === email && verifyCode === item.code;
                });
                if (checked < 0) throw {
                    message: 'Mã xác thực không hợp lệ!'
                }
                // thực hiện kiểm tra code còn thời gian sử dụng không

                // giả sử là thời hạn là 3 phút

                // kiểm tra ngày, giờ, phút của createdAt với ngày, giờ, phút hiện tại

                // thực hiện xoá mã xác thực
                verifyCodes.splice(checked, 1);
            } else if (bcrypt.hashSync(password, crrUser.salt) !== crrUser.password) {
                throw {
                    message: 'Mật khẩu cũ không khớp!'
                }
            }
            // thực hiện kiểm tra mật khẩu mới
            if (confirmNewPassword !== newPassword) throw {
                message: 'Mật khẩu mới chưa khớp!'
            }
            // cập nhật mật khẩu mới
            // tạo chuỗi ngẫu nhiên
            const salt = bcrypt.genSaltSync();
            // thực hiện mã hoá với chuỗi salt
            const hash = bcrypt.hashSync(newPassword, salt);
            crrUser.salt = salt;
            crrUser.password = hash;

            await crrUser.save();
            res.status(201).send({
                message: 'Cập nhật mật khẩu thành công!',
            });
        } catch (error) {
            res.status(401).send({
                message: error.message
            });
        }
    },
    forgotPassword: async (req, res) => {
        try {
            const { email } = req.query;
            if (!email) throw {
                message: 'Chưa có thông tin email!'
            }
            const existedUser = await UserModel.findOne({ email });
            if (!existedUser) throw {
                message: 'Không tồn tại thông tin người dùng!'
            }
            /**
             * một mã thì sẽ có hạn là khoảng 3-5p
             * dùng rồi, thì không được dùng nữa
             */
            // là có thông tin
            /**
             * thực tế, sẽ xử lý logic gửi mã code về email, sđt, zalo, tele....
             */
            // gửi về response
            // code phải là 6 chữ số
            // logic tạo mã
            // so sánh thời gian tạo với thời gian hiện tại là được bao nhiêu thời gian rồi
            const newCode = {
                email: email,
                code: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
                createdAt: new Date()
            }
            verifyCodes.push(newCode);
            res.status(200).send({
                data: newCode.code,
                message: 'Thời gian sử dụng mã là 3 phút!'
            });
        } catch (error) {
            res.status(401).send({
                message: error.message
            });
        }
    },
    getOneUser: async (req, res) => {
        try {
            const { id } = req.params;
            console.log(req.dataToken);
            const crrUser = await UserModel.findById(id);
            if (!crrUser) throw new Error('Không tồn tại thông tin người dùng!');
            res.status(200).send({
                data: crrUser,
                message: 'Thành công'
            });
        } catch (error) {
            res.status(401).send({
                message: error.message
            });
        }
    }
}

export default userController;
