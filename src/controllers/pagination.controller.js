
export const pagination = async (page, res, model, filter, promise) => {
    let perPage = 2;
    let count = await model.countDocuments(filter ?? {})
    console.log("count: ", count)
    const obj = await promise
        .skip((perPage * page) - perPage) // in the first page the value of the skip is 0
        .limit(perPage) // output just 9 items
    // const objectCounted = await model.countDocuments() // count to calculate the number of pages
    res.status(201).json({
        object: obj,
        current: page,
        pages: Math.ceil(count / perPage)
    })
}