/* create user in auth.controller */

import User from '../models/User';


export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(400).json({message: "An error occured"});
    }
}


export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({message: "An error occured"});
    }
}

export const updateUserById = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, {
            new: true //edit and return objet
        });

        res.status(204).json(updatedUser);
    } catch (error) {
        res.status(400).json({message: "An error occured"});
    }

}

export const deleteUserById = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.userId);
        console.log(deletedUser);
        res.status(204).json();
    } catch (error) {
        res.status(400).json({message: "An error occured"});
    }
    
}