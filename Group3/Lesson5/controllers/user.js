const userController = {
    createUser: async (req, res) => {
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
    }
}

export default userController;