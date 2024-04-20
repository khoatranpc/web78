import mongoose from 'mongoose';

// định nghĩa schema -> định nghĩa khuôn giữ liệu
// đơn giản nhất là định nghĩa dữ liệu và kiểu dữ liệu

// 4 thao tác cơ bản: CRUD -> dữ liệu chính gốc -> xử lý logic bên controller
const userSchema = new mongoose.Schema({
    userName: String,
    email: String,
});

// định nghĩa model

const UserModel = mongoose.model('users', userSchema);

export default UserModel;