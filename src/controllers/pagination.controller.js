import config from '../config';

export const pagination = async (params) => {
    const {page, res, model, filter, promise} = params;
    let perPage = config.ITEMS_PER_PAGE;
    let count = await model.countDocuments(filter ?? {})
    console.log("count: ", count)
    const obj = await promise
        .skip((perPage * page) - perPage) // in the first page the value of the skip is 0
        .limit(perPage) // output just 9 items

    console.log("obj: ", obj)
    // const objectCounted = await model.countDocuments() // count to calculate the number of pages
    res.status(201).json({
        object: obj,
        current: page,
        pages: Math.ceil(count / perPage)
    })
}