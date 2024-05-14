import mongoose from 'mongoose';
import { CollectionDatabase } from '../config.js';

// định nghĩa schema -> định nghĩa khuôn giữ liệu
// đơn giản nhất là định nghĩa dữ liệu và kiểu dữ liệu
const commentSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Types.ObjectId,
        ref: CollectionDatabase.POSTS
    },
    content: String,
    authorId: {
        type: mongoose.Types.ObjectId,
        ref: CollectionDatabase.USERS
    }
});

// định nghĩa model

const CommentModel = mongoose.model(CollectionDatabase.COMMENTS, commentSchema);

export default CommentModel;