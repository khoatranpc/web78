import express from 'express';

const students = [
    {
        id: 1,
        fullName: "Jackie",
        age: 5,
        class: "5A"
    },
    {
        id: 2,
        fullName: "Juli MTP",
        age: 5,
        class: "5A"
    },
    {
        id: 3,
        fullName: "Denis",
        age: 5,
        class: "5B"
    },
]
const app = express();
// CRUD: Post, Get, Put, Delete
// tham số đầu tiên của các phương thức trong expressjs đều là api endpoint

// dòng này giúp cho server express có thể đọc được dữ liệu gửi từ body
app.use(express.json());

app.get('/students', (req, res) => {
    const { id } = req.query;
    const result = students.find((item) => {
        return item.id === Number(id);
    });
    if (result) {
        res.send(result)
    } else {
        res.send(students);
    }
});

app.get('/students/:id', (req, res) => {
    const { id } = req.params;
    const result = students.find((item) => item.id === Number(id));
    res.send(result ?? 'Không tìm thấy dữ liệu học sinh!');
});

app.post('/students', (req, res) => {
    const dataBody = req.body;
    students.push(dataBody);
    res.send(students);
});

app.put('/students/:id', (req, res) => {
    // code logic ...
});

app.listen(8080, () => {
    console.log('Server đã được chạy!');
});