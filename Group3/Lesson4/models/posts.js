import mongoose from 'mongoose';

// định nghĩa schema -> định nghĩa khuôn giữ liệu
// đơn giản nhất là định nghĩa dữ liệu và kiểu dữ liệu
const postSchema = new mongoose.Schema({
    content: String,
    authorId: String
});

// định nghĩa model

const PostModel = mongoose.model('comments', postSchema);

export default PostModel;