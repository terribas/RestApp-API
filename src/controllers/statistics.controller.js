import Statistics from '../models/Statistics';
import Order from '../models/Order';
import User from '../models/User';


export const getOrdersByMonth = async (req, res) => {
    try {

    } catch (error) {
        
    }
}


export const getIncomesByMonth = async (req, res) => {
    try {

    } catch (error) {
        
    }
}


export const getTopProducts = async (req, res) => {
    try {
        const result = await Statistics.aggregate([{$sortByCount: "$name"}]);
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(400).json({message: "An error occured"});
    }
}


export const getTopReferrals = async (req, res) => {
    try {

    } catch (error) {
        
    }
}


export const getTotalOrders = async (req, res) => {
    try {
        const total = await Order.countDocuments();
        res.status(201).json({total});
    } catch (error) {
        res.status(400).json({message: "An error occured"});
    }
}


export const getTotalIncomes = async (req, res) => {
    try {

    } catch (error) {
        
    }
}


export const getTotalUsers = async (req, res) => {
    try {

    } catch (error) {
        
    }
}


export const getTotalStaff = async (req, res) => {
    try {

    } catch (error) {
        
    }
}