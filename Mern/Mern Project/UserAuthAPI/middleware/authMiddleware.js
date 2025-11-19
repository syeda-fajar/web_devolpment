import user from "../models/user.js";
import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
            token = req.headers.authorization.split(' ')[1];
        }
        if (!token) {
            res.status(401).json({
                message: 'No token'
            })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await user.findById(decoded.id).select('-password')
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'User no longer exists'
            });
        }

        next()

    }
    catch (error) {
        console.error('Auth middleware error:', error.message);

        // Handle expired token
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Token expired, please login again'
            });
        }

        // Handle invalid token
        return res.status(401).json({
            success: false,
            message: 'Not authorized, invalid token'
        });
    }
};




