import jwt from 'jsonwebtoken';

// secretKey nên được lưu từ biến môi trường ENV
const secretKey = 'mysecretkey';
// token gửi lên: Bearer token.....
const token = {
    generateToken: (userData, timeExpiresIn) => {
        return jwt.sign(userData, secretKey, {
            // thời gian hết hạn (tính theo milisecond) 1s=1000ml
            expiresIn: timeExpiresIn ?? 1000 * 60 * 5
        });
    },
    verifyToken: (token) => {
        return jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                console.error('JWT verification failed:', err.message);
                // sẽ cso thêm logic kiểm tra với RF để cấp lại token
                throw new Error(err.message);
            } else {
                return decoded;
            }
        });
    }
}

export {
    token
}