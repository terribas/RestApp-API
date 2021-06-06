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

        const {lastMonthsOrders, ordersFromLastMonth} = await getLastMonthsOrders();

        const {lastMonthsIncomes, incomesFromLastMonth} = await getLastMonthsIncomes();

        const usersFromLastMonth = await getUsersFromLastMonth();

        res.status(200).json({
            referrals,
            totalUsers,
            usersFromLastMonth,
            totalStaff,
            topProducts,
            totalOrders,
            ordersFromLastMonth,
            totalIncomes,
            incomesFromLastMonth,
            lastMonthsOrders,
            lastMonthsIncomes,
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({message: "An error occured"})
    }
}




async function getLastMonthsOrders() {
    try {
        var result = await Order.aggregate([
            {
                $group : {
                    _id : { $dateToString: { format: "%m/%Y", date: "$date" } },
                    count: { $sum: 1 }
                }
            },
        ]);

        result = result.filter((item) => (item._id !== null));
        console.log(result);
        const sorted = result.sort((a, b) => {
            console.log('a id ' + a._id);
            var piecesA = a._id.split('/');
            var piecesB = b._id.split('/');
            var monthA = parseInt(piecesA[0]); var yearA = parseInt(piecesA[1]);
            var monthB = parseInt(piecesB[0]); var yearB = parseInt(piecesB[1]);

            if (yearA !== yearB) return yearB - yearA;
            else return monthB - monthA;
        });


        var percentageFromLastMonth = 0;

        if (sorted.length > 1) {
            const ordersLastMonth = sorted[1].count;
            const ordersThisMonth = sorted[0].count;

            percentageFromLastMonth = ((ordersLastMonth - ordersThisMonth) / ordersLastMonth) * -100;
        }

        return {
            lastMonthsOrders: sorted.slice(0, 5).reverse(),
            ordersFromLastMonth: percentageFromLastMonth
        }
        return sorted.slice(0, 5).reverse();
    } catch (error) {
        console.log(error);
        return null;
    }
}

async function getLastMonthsIncomes() {
    try {
        var monthlyIncomes = await Order.aggregate([{
            $group : {
                _id : { $dateToString: { format: "%m/%Y", date: "$date" } },
                total: { $sum: '$total' }
            }
        }]);

        monthlyIncomes = monthlyIncomes.filter((item) => (item._id !== null));

        monthlyIncomes.forEach((month) => {month.total = parseFloat(month.total)});


        console.log(monthlyIncomes)
        const sorted = monthlyIncomes.sort((a, b) => {
            var piecesA = a._id.split('/');
            var piecesB = b._id.split('/');
            var monthA = parseInt(piecesA[0]); var yearA = parseInt(piecesA[1]);
            var monthB = parseInt(piecesB[0]); var yearB = parseInt(piecesB[1]);

            if (yearA !== yearB) return yearB - yearA;
            else return monthB - monthA;
        });


        var percentageFromLastMonth = 0;


        if (sorted.length > 1) {
            const incomesLastMonth = sorted[1].total;
            const incomesThisMonth = sorted[0].total;

            percentageFromLastMonth = ((incomesLastMonth - incomesThisMonth) / incomesLastMonth) * -100;
        }

        return {
            lastMonthsIncomes: sorted.slice(0, 5).reverse(),
            incomesFromLastMonth: percentageFromLastMonth
        }


    } catch (error) {
        console.log(error);
        return null;
    }
}


async function getUsersFromLastMonth() {
    try {
        var userResult = await User.aggregate([
            {
                $group : {
                    _id : { $dateToString: { format: "%m/%Y", date: "$createdAt" } },
                    count: { $sum: 1 }
                }
            }
        ]);

        userResult = userResult.filter((item) => (item._id !== null));
        const userResultSorted = userResult.sort((a, b) => {
            var piecesA = a._id.split('/');
            var piecesB = b._id.split('/');
            var monthA = parseInt(piecesA[0]); var yearA = parseInt(piecesA[1]);
            var monthB = parseInt(piecesB[0]); var yearB = parseInt(piecesB[1]);

            if (yearA !== yearB) return yearB - yearA;
            else return monthB - monthA;
        });

        var userPercentageFromLastMonth = 0;

        if (userResultSorted.length > 1) {
            const usersLastMonth = userResultSorted[1].count;
            const usersThisMonth = userResultSorted[0].count;

            userPercentageFromLastMonth = ((usersLastMonth - usersThisMonth) / usersLastMonth) * -100;
        }

        return userPercentageFromLastMonth;

    } catch (error) {
        console.log(error);
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

