import Order from '../models/Order';
import Statistics from '../models/Statistics';


export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find();

        res.status(201).json(orders);
    } catch (error) {
        console.log(error);
        res.status(400).json({message: "An error occured"});
    }
}


export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId);
        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({message: "An error occured"});
    }
}


export const createOrder = async (req, res) => {
    try {
        const newOrder = new Order(req.body);

        console.log('new order: ' + newOrder);

        //insert order in statistic model 
        const statistics = await Statistics.insertMany(req.body.products)

        const orderSaved = await newOrder.save();

        res.status(201).json(orderSaved);
    } catch (error) {
        console.log(error);
        res.status(400).json({message: "An error occured"});
    }
}

export const updateOrderById = async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.orderId, req.body, {
            new: true
        });

        res.status(204).json(updatedOrder);
    } catch (error) {
        res.status(400).json({message: "An error occured"});
    }
}


export const deleteOrderById = async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.orderId);
        console.log(deletedOrder);
        res.status(204).json();
    } catch (error) {
        res.status(400).json({message: "An error occured"});
    }
}