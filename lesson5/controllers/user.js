import UserModel from '../models/user.js';

const userController = {
    getAllUser: async (req, res) => {
        const listUser = await UserModel.find({});
        res.status(200).send({
            data: listUser,
            message: 'Thành công!',
            success: true
        });
    }
}

export default userController;
