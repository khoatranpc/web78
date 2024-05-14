import express from 'express';
import AuthorModel from './authors.js';
import mongoose from 'mongoose';
import BookModel from './books.js';

mongoose.connect('mongodb+srv://khoatranpc603:khoapc@web78-fullstack.rmaaizp.mongodb.net/learnmg?retryWrites=true&w=majority&appName=Web78-Fullstack');
const app = express();
app.use(express.json());

app.post('/authors', async (req, res) => {
    const createdAuthor = await AuthorModel.create(req.body);
    res.status(201).send({
        data: createdAuthor
    });
});

app.post('/books', async (req, res) => {
    const createdBook = await BookModel.create(req.body);
    res.status(201).send({
        data: createdBook
    });
})
app.get('/books', async (req, res) => {
    const books = await BookModel.find({}).populate("author");
    res.status(200).send({
        data: books
    });
})
app.listen(8000, () => {
    console.log('Server chạy thành công!');
})