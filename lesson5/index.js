import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import UserRouter from './routes/user.js';
import middlewares from './middlewares/index.js';
import { token } from './utils/index.js';

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('Connect DB Success!');
});
const app = express();

app.use(express.json());
app.use('/api/v1', UserRouter);
// api sử dụng refresh token để tạo ra một token mới
app.get('/api/v1/verify', middlewares.verifyJwt(true), (req, res) => {
    // kiểm tra xem token giải mã xong có phải là RT
    try {
        const newAT = token.generateToken({
            _id: req.dataToken._id,
            email: req.dataToken.email,
            tokenType: 'AT'
        });
        res.status(200).send({
            data: {
                accessToken: newAT,
                refreshToken: req.token
            }
        })
    } catch (error) {
        res.status(401).send({
            message: error.message ?? 'Bạn cần phải đăng nhập!'
        });
    }
});

app.listen(process.env.PORT, async () => {
    console.log('Server is running!');
});