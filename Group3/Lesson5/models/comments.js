import mongoose from 'mongoose';

// định nghĩa schema -> định nghĩa khuôn giữ liệu
// đơn giản nhất là định nghĩa dữ liệu và kiểu dữ liệu
const commentSchema = new mongoose.Schema({
    postId: String,
    content: String,
    authorId: String
});

// định nghĩa model

const CommentModel = mongoose.model('comments', commentSchema);

export default CommentModel;