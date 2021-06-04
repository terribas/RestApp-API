import Statistics from '../models/Statistics';
import Order from '../models/Order';
import User from '../models/User';



export const getStatistics = async (req, res) => {
    try {
        // Top ordered products
        const referrals = await getReferrals();
        const totalUsers = await getTotalUsers();
        const totalStaff = await getTotalStaff();
        const topProducts = await getTopProducts();
        const totalOrders = await getTotalOrders();
        const totalIncomes = await getTotalIncomes();
        const lastMonthsOrders = await getLastMonthsOrders();
        const lastMonthsIncomes = await getLastMonthsIncomes();

        res.status(200).json({
            referrals,
            totalUsers,
            totalStaff,
            topProducts,
            totalOrders,
            totalIncomes,
            lastMonthsOrders,
            lastMonthsIncomes
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({message: "An error occured"})
    }
}




async function getLastMonthsOrders() {
    try {
        return await Order.aggregate([{
            $group : {
                _id : { $dateToString: { format: "%m/%Y", date: "$date" } },
                count: { $sum: 1 }
            }
        }]);
    } catch (error) {
        return null;
    }
}

async function getLastMonthsIncomes() {
    try {
        const montlyIncomes = await Order.aggregate([{
            $group : {
                _id : { $dateToString: { format: "%m/%Y", date: "$date" } },
                total: { $sum: '$total' }
            }
        }]);

        montlyIncomes.forEach((month) => {month.total = parseFloat(month.total)});
        return montlyIncomes;
    } catch (error) {
        return null;
    }
}


async function getTopProducts() {
    try {
        return await Statistics.aggregate([{$sortByCount: "$name"}]).limit(5);
    } catch (error) {
        return null;
    }
}

async function getReferrals() {
    try {
        const filter = {$and: [
            {role: "client"},
            {referral: {$ne: null}}
        ]}

        // This only returns an array with referral names and their count
        const result = await User.aggregate([
            {$match: filter},
            {$sortByCount: "$referral"}
        ]);

        // To show a percentage, each array element is inserted the percentage comparing the total users number
        const totalDocuments = await User.countDocuments(filter)
        const resultCompared = result.map((statistic) => ({...statistic, percentage: (statistic.count * 100) / totalDocuments}))

        return resultCompared;
    } catch (error) {
        return null;
    }
}

async function getTotalOrders() {
    try {
        return await Order.countDocuments();
    } catch (error) {
        return null;
    }
}

async function getTotalUsers() {
    try {
        return await User.countDocuments({role: 'client'});
    } catch (error) {
        return null;
    }
}

async function getTotalStaff() {
    try {
        return await User.countDocuments({role: {$ne: 'client'}});
    } catch (error) {
        return null;
    }
}


async function getTotalIncomes() {
    try {
        var totalIncomes = await Order.aggregate([{
            $group: {
                _id: null,
                total: {$sum: '$total'}
            }
        }]);

        // Parse from Decimal128 to float
        totalIncomes = parseFloat(totalIncomes[0].total);
        return totalIncomes;
    } catch (error) {
        return null;
    }
}



/*
export const ordersByMonth = async (req, res) => {
    try {

    } catch (error) {
        
    }
}


export const incomesByMonth = async (req, res) => {
    try {

    } catch (error) {
        
    }
}


export const topProducts = async (req, res) => {
    try {
        const result = await Statistics.aggregate([{$sortByCount: "$name"}]).limit(5);
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(400).json({message: "An error occured"});
    }
}


export const referrals = async (req, res) => {
    try {
        const filter = {$and: [
            {role: "client"},
            {referral: {$ne: null}}
        ]}

        // This only returns an array with referral names and their count
        const result = await User.aggregate([
            {$match: filter},
            {$sortByCount: "$referral"}
        ]);

        // To show a percentage, each array element is inserted the percentage comparing the total users number
        const totalDocuments = await User.countDocuments(filter)
        const resultCompared = result.map((statistic) => ({...statistic, percentage: (statistic.count * 100) / totalDocuments}))

        res.status(200).json(resultCompared)
    } catch (error) {
        console.log(error);
        res.status(400).json({message: "An error occured"});
    }
}


export const totalOrders = async (req, res) => {
    try {
        const total = await Order.countDocuments();
        res.status(201).json({total});
    } catch (error) {
        res.status(400).json({message: "An error occured"});
    }
}


export const totalIncomes = async (req, res) => {
    try {
        var totalIncomes = await Order.aggregate([
            {$group: {
                _id: null,
                total: {
                    $sum: '$total'
                }
            }}
        ]);

        // Parse from Decimal128 to float
        totalIncomes = parseFloat(totalIncomes[0].total);

        res.status(201).json({totalIncomes});
    } catch (error) {
        console.log(error);
        res.status(400).json({message: "An error occured"});
    }
}


export const totalUsers = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments({role: 'client'});

    } catch (error) {
        console.log(error);
        res.status(400).json({message: "An error occured"});
    }
}


export const totalStaff = async (req, res) => {
    try {

    } catch (error) {
        
    }
}

*/