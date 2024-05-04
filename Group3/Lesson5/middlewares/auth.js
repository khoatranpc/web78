import UserModel from '../models/users.js';

const authMiddleware = {
    // sau khi xác thực -> uỷ quyền
    authentication: async (req, res, next) => {
        try {
            const { email } = req.query;
            const findCrrUser = await UserModel.findOne({ email });
            if (!findCrrUser) throw {
                message: 'Bạn chưa xác thực!'
            }
            req.role = findCrrUser.role;
            req.userId = findCrrUser._id.toString();
            next();
        } catch (error) {
            res.status(401).send({
                message: error.message,
                data: null,
                success: false
            });
        }
    },
    authorizationAdmin: (req, res, next) => {
        try {
            // how to check role ???
            const { role } = req;
            if (role !== 'ADMIN') throw {
                messsage: 'Bạn không thể truy cập!'
            }
            next();
        } catch (error) {
            res.status(403).send({
                message: error.message,
                data: null,
                success: false
            });
        }
    }
}

export {
    authMiddleware
}