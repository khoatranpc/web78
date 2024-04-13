import express from 'express';
const app = express();
app.use(express.json());

app.get('', (req, res) => {
    res.send({
        message: 'Hello MindX-er'
    });
});

// API users

// lấy ra danh sách users
app.get('/users', async (req, res) => {
    try {
        const { testThrow } = req.query;
        const response = await fetch('http://localhost:3000/users');
        if (testThrow) {
            throw {
                statusCode: 500,
                message: 'Bạn đã gặp lỗi, hehe!'
            };
        }
        const data = await response.json();
        res.status(201).send({
            message: 'Thành công!',
            data
        });
    } catch (error) {
        res.status(error.statusCode ?? 403).send({
            message: error.message,
            data: null
        });
    }
});

app.listen(8080, () => {
    console.log('Server is running!');
});