import jwt from 'jsonwebtoken';
import config from '../config';
import User from '../models/User';


export const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers['x-access-token'];
        if (!token) return res.status(403).json({message: 'No token provided'});

        const decoded = jwt.verify(token, config.SECRET);
        const user = await User.findById(decoded.id, {password: 0});

        if (!user) return res.status(403).json({message: 'Authentiation failed'});

        //console.log('user middleware ' + user);
        req.body.user = user;
        next();
    } catch (error) {
        return res.status(401).json({message: 'Authentication failed'});
    }
}



export const verifyStaffToken = async (req, res, next) => {
    try {
        const token = req.headers['x-access-token'];
        if (!token) return res.status(403).json({message: 'No token provided'});

        const decoded = jwt.verify(token, config.SECRET);
        const user = await User.findById(decoded.id, {password: 0});

        if (!user) return res.status(403).json({message: 'Authentication failed'});

        if (user.role !== 'waiter' && 
            user.role !== 'bar' &&
            user.role !== 'kitchen' &&
            user.role !== 'admin'
            )
                return res.status(401).json({message: 'Unauthorized'}); 

        req.body.user = user;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({message: 'Authentication failed'});
    }
}


export const verifyAdminToken = async (req, res, next) => {
    try {
        const token = req.headers['x-access-token'];
        if (!token) return res.status(403).json({message: 'No token provided'});

        const decoded = jwt.verify(token, config.SECRET);
        const user = await User.findById(decoded.id, {password: 0});

        if (!user) return res.status(403).json({message: 'Authentication failed'});
        if (user.role !== 'admin') return res.status(401).json({message: 'Unauthorized'}); 

        req.body.user = user;
        next();
    } catch (error) {
        return res.status(401).json({message: 'Authentication failed'});
    }
}

