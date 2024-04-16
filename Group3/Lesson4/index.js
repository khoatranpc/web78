import express from 'express';
import mongooose from 'mongoose';

await mongooose.connect('mongodb+srv://khoatranpc603:khoapc@web78-fullstack.rmaaizp.mongodb.net/learnmg?retryWrites=true&w=majority&appName=Web78-Fullstack')
const app = express();

app.listen(8080, () => {
    console.log('Server chạy thành công!');
});
