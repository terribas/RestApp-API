import User from '../models/User';

export const checkDuplicateUser = async (req, res, next) => {
    try {
        const user = await User.findOne({username: req.body.username});
        if (user) return res.status(400).json({message: 'User already exists'});

        const email = await User.findOne({email: req.body.email});
        if (email) return res.status(400).json({message: 'User already exists'});

        next();    
    } catch (error) {
        return res.status(400).json({message: 'Could not sign up'});
    }
}