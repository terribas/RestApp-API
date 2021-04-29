import jwt from 'jsonwebtoken';
import config from '../config';
import User from '../models/User';


export const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers['x-access-token'];

        if (!token) return res.status(403).json({message: 'No token provided'});

        const decoded = jwt.verify(token, config.SECRET);
    
        const user = await User.findById(decoded.id, {password: 0});
        if (!user) return res.status(403).json({message: 'User not found'});

        next();
    } catch (error) {
        return res.status(401).json({message: 'Authentication failed'});
    }
}



export const verifyWaiterToken = async (req, res, next) => {
    try {
        const token = req.headers['x-access-token'];

        if (!token) return res.status(403).json({message: 'No token provided'});

        const decoded = jwt.verify(token, config.SECRET);
    
        const user = await User.findById(decoded.id, {password: 0});
        if (!user) return res.status(403).json({message: 'User not found'});

        if (!user.isWaiter) return res.status(401).json({message: 'Unauthorized: You are not a waiter'}); 

        next();
    } catch (error) {
        return res.status(401).json({message: 'Authentication failed'});
    }
}