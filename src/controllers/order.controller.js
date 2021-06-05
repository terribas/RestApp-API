import Order from '../models/Order';
import Statistics from '../models/Statistics';
import config from '../config';

import * as paginationController from '../controllers/pagination.controller';

export const getOrders = async (req, res) => {
    try {
        const page = req.body.page;
        if (page) {
            const {sort} = req.body;
            const sortQuery = {}

            if (sort?.field && sort?.order) {sortQuery[sort.field] = sort.order}

            paginationController.pagination({
                page,
                res,
                model: Order,
                promise: Order.find().sort(sortQuery).populate('user').populate('table')
            });

        } else {
            const products = await Order.find().sort('date')
            res.status(201).json(products);
        }

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "An error occured" });
    }
}


export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId);
        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ message: "An error occured" });
    }
}


//Creates a new order. Requires checkJwt.verifyToken middleware to work (get user)
export const createOrder = async (req, res) => {
    try {
        const user = req.body.user._id;

        if(!user) {return res.status(400).json({ message: 'You must be authenticated to perform this action'} )};

        const newOrder = new Order(req.body);

        console.log('new order: ' + newOrder);

        //insert order in statistic model 
        const products = req.body.products.map(product => {
            if (product._id) delete product._id;
            return product;
        });
        
        const statistics = await Statistics.insertMany(req.body.products);

        const orderSaved = await newOrder.save();

        res.status(201).json(orderSaved);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "An error occured" });
    }
}

export const updateOrderById = async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.orderId, req.body, {
            new: true
        });

        res.status(204).json(updatedOrder);
    } catch (error) {
        res.status(400).json({ message: "An error occured" });
    }
}


export const deleteOrderById = async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.orderId);
        console.log(deletedOrder);
        res.status(204).json();
    } catch (error) {
        res.status(400).json({ message: "An error occured" });
    }
}

/* get kitchen pending orders */
export const getBarPendingOrders = async (req, res) => {
    try {
        const barPendingOrders = await Order.find({
            bar_delivered: false,
            date: {$gt: Date.now() - 86400000}
        }).sort({date: "asc"})
        for (let i = 0; i < barPendingOrders.length; i++) {
            let products = barPendingOrders[i].products
            let productsAux = []
            for (let j = 0; j < products.length; j++) {
                if(products[j].zone == 1) {
                    productsAux.push(products[j])
                }
            } 
            barPendingOrders[i].products = productsAux;
        }
        console.log(barPendingOrders)
        res.status(201).json(barPendingOrders);
    } catch (error) {
        res.status(400).json({ message: "An error occured" });
    }
}

/* get kitchen pending orders */
export const getKitchenPendingOrders = async (req, res) => {
    try {
        const kitchenPendingOrders = await Order.find({
            kitchen_delivered: false,
            date: {$gt: Date.now() - 86400000}
        }).sort({date: "asc"})
        for (let i = 0; i < barPendingOrders.length; i++) {
            let products = barPendingOrders[i].products
            let productsAux = []
            for (let j = 0; j < products.length; j++) {
                if(products[j].zone == 2) {
                    productsAux.push(products[j])
                }
            } 
            barPendingOrders[i].products = productsAux;
        }
        console.log(kitchenPendingOrders)
        res.status(201).json(kitchenPendingOrders);
        return
    } catch (error) {
        res.status(400).json({ message: "An error occured" });
    }
}

/* get kitchen delivered orders */
export const getBarDeliveredOrders = async (req, res) => {
    try {
        const barDeliveredOrders = await Order.find({
            bar_delivered: true,
            date: {$gt: Date.now() - 86400000}
        }).sort({date: "asc"})
        for (let i = 0; i < barPendingOrders.length; i++) {
            let products = barPendingOrders[i].products
            let productsAux = []
            for (let j = 0; j < products.length; j++) {
                if(products[j].zone == 1) {
                    productsAux.push(products[j])
                }
            } 
            barPendingOrders[i].products = productsAux;
        }
        console.log(barDeliveredOrders)
        res.status(201).json(barDeliveredOrders);
    } catch (error) {
        res.status(400).json({ message: "An error occured" });
    }
}

/* get kitchen delivered orders */
export const getKitchenDeliveredOrders = async (req, res) => {
    try {
        const kitchenDeliveredOrders = await Order.find({
            kitchen_delivered: true,
            date: {$gt: Date.now() - 86400000}
        }).sort({date: "asc"})
        for (let i = 0; i < barPendingOrders.length; i++) {
            let products = barPendingOrders[i].products
            let productsAux = []
            for (let j = 0; j < products.length; j++) {
                if(products[j].zone == 2) {
                    productsAux.push(products[j])
                }
            } 
            barPendingOrders[i].products = productsAux;
        }
        console.log(kitchenDeliveredOrders)
        res.status(201).json(kitchenDeliveredOrders);
    } catch (error) {
        res.status(400).json({ message: "An error occured" });
    }
}

/* toogle status pending one order */
export const toggleBarOrder = async (req, res) => {
    try {
        const barOrder = await Order.findById(req.params.orderId);

        const updatedOrder = await Order.findByIdAndUpdate(req.params.orderId, {
            bar_delivered: !barOrder.bar_delivered,
            bar_delivered_date: Date.now()
        }, {new: true});

        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(400).json({message: "An error occured"})
    }
}

/* toogle status pending one order */
export const toggleKitchenOrder = async (req, res) => {
    try {
        const kitchenOrder = await Order.findById(req.params.orderId);

        const updatedOrder = await Order.findByIdAndUpdate(req.params.orderId, {
            kitchen_delivered: !kitchenOrder.kitchen_delivered,
            kitchen_delivered_date: Date.now()
        }, {new: true});

        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(400).json({message: "An error occured"})
    }
}




//Returns the current logged in user details. Requires checkJwt.verifyToken middleware to work
export const getMyOrders = async (req, res) => {
    try {
        if (!req.body.user) {return res.status(400).json({message: 'You must be authenticated to perform this action'})}

        const orders = await Order.find({user: req.body.user._id}).sort({date: 'desc'});

        res.status(200).json(orders);
    } catch (error) {
        res.status(400).json({ message: "An error occured" });
    }
}



export const getMyLastOrder = async (req, res) => {
    try {
        if (!req.body.user) {return res.status(400).json({message: 'You must be authenticated to perform this action'})}
        const order = await Order.findOne({user: req.body.user._id})
            .sort({date: 'desc'})
            .limit(1)
            .populate('user')
            .populate('table');

        res.status(200).json(order);
    } catch (error) {
        res.status(400).json({message: "An error occured"});
    }
}