import express from 'express';
import mongoose from 'mongoose';
import UserRouter from './routes/user.js';

mongoose.connect('mongodb://127.0.0.1:27017/web78', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('Connect DB Success!');
});
const app = express();

app.use(express.json());
app.use('/api/v1', UserRouter);

app.listen(8080, async () => {
    console.log('Server is running!');
});