import User from '../models/User';
import jwt from 'jsonwebtoken';
import config from '../config';

/* Register user */
//Route (post): api/auth/singup
export const signUp = async (req, res) => {
    try {
        console.log("Body: " + req.body)
        const { name, lastName, email, password, role } = req.body;

        const newUser = new User({
            name,
            lastName,
            email,
            password: await User.encryptPassword(password),
            role
        });

        await newUser.save();

        console.log(newUser);

        res.status(201).json('Signed up successfully');

    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}

/* Login user */
//Route (post): api/auth/login
export const login = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) return res.status(400).json({ message: "Invalid login or password" });
    
    const rightPassword = await User.comparePassword(req.body.password, user.password);
    
    if (!rightPassword) return res.status(400).json({ message: "Invalid login or password" });

    const token = jwt.sign({ id: user._id }, config.SECRET, {
        expiresIn: 86400
    });

    res.json({ token, role: user.role });
}