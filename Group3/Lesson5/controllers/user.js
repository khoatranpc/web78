import UserModel from '../models/users.js';

const userController = {
    createUser: async (req, res) => {
        try {
            const { email } = req.body;
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
    },
    getUser: async (req, res) => {
        try {
            const allUser = await UserModel.find({});
            res.status(200).send({
                data: allUser,
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
    },
    getUserById: async (req, res) => {
        try {
            const { id } = req.params;
            const { role, userId } = req;
            const crrUserInfo = await UserModel.findById(id);
            if (!crrUserInfo) throw {
                message: 'Không tồn tại người dùng!'
            }
            if (role === 'USER') {
                if (crrUserInfo._id.toString() !== userId) {
                    throw {
                        message: 'Bạn không thể thực hiện hành động!'
                    }
                }
            }
            res.status(200).send({
                data: crrUserInfo,
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
    }
}



// user chỉ xem được thông tin của chính họ
// admin có thể xem được hết

/**
 * -> phải có bước xác thực người dùng (authentication)
 * -> kiểm tra role -> user đã đăng nhập,
 * 
 * TH: 
 * USER: id của user đã đăng nhập đó === id hiện tại đang xem chi tiết
 * ADMIN: -> xem được luôn
 */

export default userController;