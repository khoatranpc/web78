import { Router } from "express";
import UserRouter from "./user.js";
import PostRouter from "./post.js";
import CommentRouter from "./comment.js";

const rootRouterV1 = Router();

rootRouterV1.use('users', UserRouter);
rootRouterV1.use('posts', PostRouter);
rootRouterV1.use('comments', CommentRouter);

export {
    rootRouterV1
};