import http from 'http';
import { users } from './data.js';

const app = http.createServer((req, res) => {
    const endpoint = req.url;
    const method = req.method;
    if (endpoint === '/') {
        res.end("Chào mừng đến với server!");
    } else if (endpoint === '/users') {
        // yc1
        if (method === 'GET') {
            // khi biết là GET -> trả về dữ liệu users
            res.end(JSON.stringify(users));
        }
    } else if (endpoint === '/users/old') {
        // yc2
        if (method === 'GET') {
            // khi biết là GET -> trả về dữ liệu users
            res.end(JSON.stringify(users.filter((item) => item.age >= 50)));
        }
    } else if (endpoint === '/users/add-random') {
        // yc3
        if (method === 'GET') {
            // khi biết là GET -> trả về dữ liệu users
            // tạo ra 1 dữ liệu mới (tự khai báo)
            // thêm dữ liệu đó vào users -> push
            // sau khi thêm xong cần phải trả về cho client là mảng mới

            const newUser = {
                "id": 4,
                "userName": "Suneo",
                "email": "suneo@gmail.com",
                "address": "Japanese",
                "age": 50,
            }
            users.push(newUser);
            res.end(JSON.stringify(users));
        }
    } else if (endpoint.startsWith('/users/add/')) {
        //logic
        if (method === 'GET') {
            // xử lý cắt chuỗi
            // split -> tách chuỗi tại một hoặc nhiều chỗ nào đó -> trả ra kết quả là 1 mảng ở 2 phía từ chỗ được cắt
            const crrData = endpoint.split("/users/add/");
            // xử lý chuỗi để lấy giá trị từ các key được truyền trên endpoint
            // userName=MindX%20School&email=mindx@edu.vn&address=HaNoi&age=8
            // mỗi key cách nhau bởi dấu & -> chỉ cần cắt dấu & -> sẽ lấy được key và value
            // regex, rule trên api
            const properties = crrData[1].split('&');

            const newUser = {};
            properties.forEach((item) => {
                const [key, value] = item.split('=');
                newUser[key] = value;
            });

            users.push(newUser);
            res.end(JSON.stringify(users));
        }
    }
    // yc4
    // 1, 2, 3, 4, 5
    /**
     * liên quan về endpoint
     * dữ liệu được truyền trên endpoint
     * => xử lý endpoint để lấy dữ liệu => xử lý string để lấy ra dữ liệu
     * kiểm tra endpoint bắt đầu từ /users/add
     * -> string.startWith
     */
});

app.listen(8080, () => {
    console.log('Server chạy thành công!');
});