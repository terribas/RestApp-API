import Order from '../models/Order';
import Statistics from '../models/Statistics';


export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find();

        res.status(201).json(orders);
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
        const barPendingOrders = await Order.find({ bar_delivered: false }).sort({date: "asc"})
        console.log(barPendingOrders)
        res.status(201).json(barPendingOrders);
    } catch (error) {
        res.status(400).json({ message: "An error occured" });
    }
}

/* get kitchen pending orders */
export const getKitchenPendingOrders = async (req, res) => {
    try {
        const kitchenPendingOrders = await Order.find({ kitchen_delivered: false }).sort({date: "asc"})
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
        const barDeliveredOrders = await Order.find({ bar_delivered: true }).sort({date: "asc"})
        console.log(barDeliveredOrders)
        res.status(201).json(barDeliveredOrders);
    } catch (error) {
        res.status(400).json({ message: "An error occured" });
    }
}

/* get kitchen delivered orders */
export const getKitchenDeliveredOrders = async (req, res) => {
    try {
        const kitchenDeliveredOrders = await Order.find({ kitchen_delivered: true }).sort({date: "asc"})
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