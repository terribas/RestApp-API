import User from '../models/User';
import jwt from 'jsonwebtoken';
import config from '../config';

export const signUp = async (req, res) => {

    const {username, email, password, isWaiter} = req.body;

    const newUser = new User({
        username,
        email,
        password: await User.encryptPassword(password),
        isWaiter
    });

    await newUser.save(); 

    console.log(newUser);

    res.status(201).json('Signed up successfully');
}

export const signIn = async (req, res) => {
    const user = await User.findOne({email: req.body.email});

    if (!user) return res.status(400).json({message: "User not found"});

    const rightPassword = await User.comparePassword(req.body.password, user.password);

    if (!rightPassword) return res.status(401).json({message: "Password doesn't match"});


    
    const token = jwt.sign({id: user._id}, config.SECRET, {
        expiresIn: 86400
    });


    res.json({token, isWaiter: user.isWaiter});
}