import express from 'express';
import mongooose from 'mongoose';
import { rootRouterV1 } from './routes/index.js';

await mongooose.connect('mongodb+srv://khoatranpc603:khoapc@web78-fullstack.rmaaizp.mongodb.net/learnmg?retryWrites=true&w=majority&appName=Web78-Fullstack')
const app = express();
app.use(express.json());

app.get('/users', (req, res) => {
    res.send({
        data: {}
    })
});
app.use('/api/v1', rootRouterV1);


app.listen(8080, () => {
    console.log('Server chạy thành công!');
});
