/* create user in auth.controller */

import User from '../models/User';
import * as paginationController from '../controllers/pagination.controller';

/*
export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(400).json({message: "An error occured"});
    }
}
*/



export const getUsers = async (req, res) => {
    try {
        const page = req.body.page;
        if (page) {
            const {where, contains, sort} = req.body;

            const filter = {
                $or: [
                    {name: {$regex: new RegExp(contains, 'i')}},
                    {lastName: {$regex: new RegExp(contains, 'i')}},
                    {email: {$regex: new RegExp(contains, 'i')}},
                ]
            }
            const sortQuery = {}

            if (where?.field && where?.value) {filter[where.field] = where.value}
            if (sort?.field && sort?.order) {sortQuery[sort.field] = sort.order}

            console.log('El filtro es ' + JSON.stringify(filter));
            paginationController.pagination({page, res, model: User, filter, promise: User.find(filter).sort(sortQuery)})

        } else {
            const products = await User.find().sort('name')
            res.status(201).json(products);
        }

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "An error occured" });
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

//Returns the current logged in user details. Requires checkJwt.verifyToken middleware to work
export const getMyUser = async (req, res) => {
    try {
        console.log('hola')
        if (!req.body.user) return res.status(400).json({ message: 'You need to be authenticated to perform this action '});
        res.status(201).json(req.body.user);
    } catch (error) {
        console.log('hay un error')
        res.status(400).json({message: "An errorr occured"});
    }
}


// Updates the current logged in user. Requires checkJwt.verifyToken middleware to work
export const updateMyUser = async (req, res) => {
    try {        
        const updatedUser = await User.findByIdAndUpdate(req.body.user._id, req.body, {
            new: true
        });

        res.status(201).json(updatedUser);
    } catch (error) {
        res.status(400).json({message: "An error occured"});
    }
}