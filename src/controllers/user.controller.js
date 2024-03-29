/* create user in auth.controller */

import User from '../models/User';
import * as paginationController from '../controllers/pagination.controller';
import config from '../config';
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



export const getStaff = async (req, res) => {
    try {
        const page = req.body.page;
        if (page) {
            const {where, contains, sort} = req.body;

            const filter = {
                $or: [
                    {name: {$regex: new RegExp(contains, 'i')}},
                    {lastName: {$regex: new RegExp(contains, 'i')}},
                    {email: {$regex: new RegExp(contains, 'i')}},
                ],
                role: {$ne: 'client'}
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
        const newParams = req.body;
        if (req.body.password?.length > 0) {
            newParams.password = await User.encryptPassword(req.body.password)
        } else {
            delete newParams.password;
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.userId, newParams, {
            new: true //edit and return objet
        });
        res.status(204).json(updatedUser);
    } catch (error) {
        res.status(400).json({message: "An error occured"});
    }

}

export const deleteUserById = async (req, res) => {
    try {
        const {where, contains} = req.body;

        
        const filter = {
            $or: [
                {name: {$regex: new RegExp(contains, 'i')}},
                {lastName: {$regex: new RegExp(contains, 'i')}},
                {email: {$regex: new RegExp(contains, 'i')}},
            ],
            role: 'client'
        }

        if (where?.field && where?.value) {filter[where.field] = where.value}

 
        const deletedUser = await User.findByIdAndDelete(req.params.userId);

        const count = await User.countDocuments(filter);
        const pages = Math.ceil(count / config.ITEMS_PER_PAGE);

        console.log(pages);

        res.status(200).json({pages});
    } catch (error) {
        res.status(400).json({message: "An error occured"});
    } 
}


export const deleteStaffById = async (req, res) => {
    try {
        const {where, contains} = req.body;

        const filter = {
            $or: [
                {name: {$regex: new RegExp(contains, 'i')}},
                {lastName: {$regex: new RegExp(contains, 'i')}},
                {email: {$regex: new RegExp(contains, 'i')}},
            ],
            role: {$ne: 'client'}
        }

        if (where?.field && where?.value) {filter[where.field] = where.value}

 
        const deletedUser = await User.findByIdAndDelete(req.params.userId);

        const count = await User.countDocuments(filter);
        const pages = Math.ceil(count / config.ITEMS_PER_PAGE);

        console.log(pages);

        res.status(200).json({pages});
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