var jwt = require('jsonwebtoken');
const KEY_jwt = "iamZackKnight"; // Secret key used for signing the JWT

export const validateToken = (req) => {
    const authHeader = req.headers.get('authorization');

    if (!authHeader) {
        return { success: false, message: 'No token provided', status: 401 };
    }

    const token = authHeader.split(' ')[1]; // Token format: Bearer <token>

    if (!token) {
        return { success: false, message: 'Token not found', status: 401 };
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, KEY_jwt);
        return { success: true, decoded, status: 200 };
    } catch (error) {
        return { success: false, message: 'Invalid or expired token', status: 403 };
    }
};
