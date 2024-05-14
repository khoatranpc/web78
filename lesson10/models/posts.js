import mongoose from 'mongoose';
import { CollectionDatabase } from '../config.js';

// định nghĩa schema -> định nghĩa khuôn giữ liệu
// đơn giản nhất là định nghĩa dữ liệu và kiểu dữ liệu
const postSchema = new mongoose.Schema({
    content: String,
    authorId: {
        type: mongoose.Types.ObjectId,
        ref: CollectionDatabase.USERS
    },
    images: [String]
});

// định nghĩa model

const PostModel = mongoose.model(CollectionDatabase.POSTS, postSchema);

export default PostModel;