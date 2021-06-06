import User from '../models/User';
import jwt from 'jsonwebtoken';
import config from '../config';

/* Register user */
//Route (post): api/auth/singup

const emailRegex = /\S+@\S+\.\S+/

export const signUp = async (req, res) => {
    try {
        console.log("Body: " + req.body)
        const { name, lastName, email, password, role, referral } = req.body;

        if (!email || !password) return res.status(400).json({ message: 'You must provide an email and a password'});

        if (!emailRegex.test(email)) return res.status(400).json({ message: 'You must provide a valid email'})
        
        var lowRole;
        if (role) {lowRole = role.toLowerCase();}

        const newUser = new User({
            name,
            lastName,
            email: email.toLowerCase(),
            password: await User.encryptPassword(password),
            role: lowRole,
            referral
        });

        await newUser.save();

        console.log(newUser);

        res.status(201).json({message: 'Signed up successfully'});

    } catch (error) {
        console.log(error)
        res.status(400).json({message: "An error occured"})
    }
}

/* Login user */
//Route (post): api/auth/login
export const login = async (req, res) => {
    const user = await User.findOne({ email: req.body.email.toLowerCase() });

    if (!user) return res.status(400).json({ message: "Invalid login or password" });
    
    const rightPassword = await User.comparePassword(req.body.password, user.password);
    
    if (!rightPassword) return res.status(400).json({ message: "Invalid login or password" });

    const token = jwt.sign({ id: user._id }, config.SECRET, {
        expiresIn: 864000
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