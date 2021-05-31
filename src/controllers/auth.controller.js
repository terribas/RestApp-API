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


// Change password of current authenticated user. Requires checkAuth middleware
export const changeMyPassword = async (req, res) => {
    try {
        const {oldPassword, newPassword} = req.body;

        if (!req.body.user) return res.status(400).json({ message: 'You must be authenticated'});
        if (!oldPassword || !newPassword) return res.status(400).json({ message: 'You must provide the old and new password'});
        if (newPassword.length < 5) return res.status(400).json({ message: 'Password must be at least 5 characters long' })

        const loggedUser = await User.findById(req.body.user._id);

        const rightPassword = await User.comparePassword(oldPassword, loggedUser.password);
        if (!rightPassword) return res.status(400).json({ message: "The old password is wrong" });

        await User.findByIdAndUpdate(req.body.user._id, {
            password: await User.encryptPassword(newPassword)
        })

        res.status(201).json({ message: 'Password changed successfully'});

    } catch (error) {
        console.log(error);
        res.status(400).json({message: "An error occured"});
    }
}