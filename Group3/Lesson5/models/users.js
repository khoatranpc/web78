import mongoose from 'mongoose';

// định nghĩa schema -> định nghĩa khuôn giữ liệu
// đơn giản nhất là định nghĩa dữ liệu và kiểu dữ liệu
// nếu như chưa có, thì tự động thêm, còn có rồi, thì tự động cập nhật
const userSchema = new mongoose.Schema({
    userName: String,
    email: String,
    role: {
        type: String,
        enum: ['ADMIN', 'USER'],
        default: 'USER'
    }
});

// định nghĩa model

const UserModel = mongoose.model('users', userSchema);

export default UserModel;